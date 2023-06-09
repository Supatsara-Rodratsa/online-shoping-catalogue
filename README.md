# Online Shop Catalogue 👩🏼‍💻🛍

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Overview 🎉

### Iteration 1: Creating Online Shop Catalogue

Creating the main page that will feature a simple grid of products, being each product featured by a card.

#### Requirements ✨

- Creating product catalogue item that contains product details
- Each catalogue item will have CTA button to add the product to the product cart
- Creating product catalogue to show all the product card
- Creating product cart item to show details of product and quantity
- Creating product cart to show all cart items
- Showing total amount

### Iteration 2: Adding search functionalities

Providing navigation and search helpers to help users filtering the product item

#### Requirements ✨

- Introducing _Tab_ navigation to dynamically enlist all different product categories in the app
- Implementing a filter by keyword
  - The placeholder should change to reflect the current selected category from Tab
  - The filtering should start with any keyword longer than 3 chars
- Highlight the substring on each product name by referring to the keyword from the search component

### Iteration 3: Adding pagination functionalities

Provide paginated browsing functionalities

#### Requirements ✨

- Creating _Pagination_ component to inject number of items and page size

### Iteration 4: Abstracting data away

Providing Injection Token

#### Requirements ✨

- Creating _Injection Token_ named APP_SETTINGS for using and injecting data to components or services

### Iteration 5: Adding forms and routing

Providing Reactive Form and handling validation logic

#### Requirements ✨

- The submit button will be disabled until the form controls are all valid

- The customer registration form must validate user input

- All input fields are required, with a particular exception

- Once the user submits the validated form, the navigation will lead the user to the success view.

### Iteration 6 - Adding HTTP communication to our site

Providing Reactive Form and handling validation logic

#### Requirements ✨

- Consuming data from a remote API

- Implementing NodeJS to run Backend Server

- Using MailTrap to send email notification to customer

- Show loading when fetching data from HTTP Client

## Development server 🪄

- Run `npm run start` for running both Frontend and Backend concurrently

## Running unit tests 💥

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
