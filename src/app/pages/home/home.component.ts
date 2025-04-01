import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';

interface Item {
  name: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
