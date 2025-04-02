# Booklify

This Angular application is using the latest version, Angular 19. The app has a table with books, that can be sorted and searched. It also has a books page where the user can create update and delete the state of books. The creation of books also has the possibility to search for books in the OpenLibrary database. Lastly on the about page there is a app wide theming, that lets the user change the Material themes. On the navigation bar there is a toggle icon to switch DarkMode on and off.

## Features

- Routing
- Color Theming
- Search functionality
- Reusable components
- State Handling
- Dark Mode
- Angular animations
- Cypress Tests

## Technologies

List of Framework and libraries used

- Angular 19
- Typescript
- SCSS for styling with the BEM syntax
- NgRx
- Angular Animations
- Angular Material

## Prerequisites

It is recommended to first update npm to atleast version 18.19.1 or higher. Check your version by running:\
`node -v`\
`npm -v`\
If you need to update go to https://nodejs.org/en

## Installation

**Clone the repository**:\
`git clone https://github.com/tewzdk/booklify.git`\
-- or copy the link into your favorite git client\
**Navigate to the project directory**:\
`cd project-name`

**Install dependencies**:\
`npm install`

**Start the development server**:\
`ng serve`

## Usage

**Open the app in a browser**
http://localhost:4200

## How to run Tests

In order to run the cypress tests, you first have to have the local environment up and running as explains above.\
Now you will have to open another terminal, and type in: \
`npx cypress open`\
Now wait for cypress to open then, select E2E testing in the cypress windows, and after select your preferred browser and Start E2E.\
In the browser you now see the cypress view, On the side navigation, select Specs, and run any of the specs.

## Architecture

- cypress
  - e2e
- src
  - app
    - dialogs
    - pages
    - services
    - shared
      - components
      - models
    - store
      - books
