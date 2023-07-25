# TODO web app

Todo list app, built with Aurelia and Laravel. This is a work in progress.
This app is using tailwindcss for styling.

## App structure

The app is split into two parts, the backend and the frontend. The backend is built with Laravel and the frontend is built with Aurelia.

## Installation

## Without Docker

Clone the repository and run `composer install` and `npm install` on the backend and run `npm install` on the frontend.

### Configure .env

Copy the `.env.example` file to `.env` and configure the database connection on the backend.

### Generate JWT secret

Run `php artisan jwt:secret` on the backend.

### Usage

Run `php artisan serve` on the backend and run `au run --watch` on the frontend.

## With Docker

Clone the repository and run `docker-compose up -d` on the root of the project.

### Configure .env

Copy the `.env.example` file to `.env` and configure the database connection on the backend.

### Done

The app should be running on `http://localhost:8080`.

## Testing

Run `php artisan test` on the backend and run `au test` on the frontend.

## TODO

- [x] Add todo
- [x] Edit todo
- [x] Delete todo
- [x] Mark todo as done
- [x] Mark todo as not done
- [x] Filter todos by status
- [x] Add tags to todo
- [x] Login and permissions logic
- [x] Use JWT for authentication
- [x] Use EventAggregator to communicate between components
- [x] Unit tests
- [x] Update example image
- [ ] Filter todos by tags

## The APP

![The app](https://i.imgur.com/314IqnI.png)
