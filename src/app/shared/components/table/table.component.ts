import {
  AfterViewInit,
  Component,
  input,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../../models/book';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'books-table',
  imports: [MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  private sort = viewChild(MatSort);
  data$ = input.required<Observable<Book[]>>();
  subscriptions = new Subscription();

  displayedColumns: string[] = [
    'title',
    'author',
    'firstPublishYear',
    'summary',
  ];
  dataSource = new MatTableDataSource<Book>();

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort()!;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.data$().subscribe((data) => {
        this.dataSource.data = data;
      })
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
