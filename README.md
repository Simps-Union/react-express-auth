# A React+Express with Auth Template

This repo can be used to start a React+Express project fully equipped with Auth for user creation and login.

# Setup

- Fork this template repo
- Copy the `.env.template` and name it `.env`
- Create a database called `react_auth_example` database (or update your new `.env` to whatever database you are using)
- Double check that the `.env` variables are all correct (username, password, database name)
- `npm run kickstart` (`npm run dev` or `npm start` afterwards). This will do the following commands all together:
  - `npm i` - installs all dependencies
  - `npm run migrate` - runs `knex migrate:latest` which will run the provided migration file (look in the `src/db/migrations` folder)
  - `npm run seed` - runs `knex seed:run` which will run the provided seed file (look in `src/db/seeds` folder)
  - `npm run start` - runs `node src/index.js`, starting your server.

## Running your application

Run the `npm run dev` command from the root directory to start your Express server.

#### Rebuilding the static assets

The Express server is configured to serve static assets from the `public/` folder. Those static assets are the current **build** of the React frontend found in the `frontend/` folder. You can see the built version of the React frontend by going to the server's address: http://127.0.0.1:3000/

In order to update this built version of your React application, you will need to run the `npm run build` command _from the `frontend/` folder_.

#### Working with a dev server

If you would like to work on the frontend without having to constantly rebuild the project, start a Vite dev server by running the `npm run dev` command _from the `frontend/` folder_.

If you look in the `vite.config.js` file, you will see that we've already configured the dev server to proxy any reqeusts made to `/api` to the back-end server.

## Backend API

The provided backend exposes the following API endpoints defined in `src/routes.js`:

| Method | Path       | Description                                        |
| ------ | ---------- | -------------------------------------------------- |
| GET    | /users     | Get the list of all users                          |
| GET    | /me        | Get the current logged in user based on the cookie |
| GET    | /users/:id | Get a specific user by id                          |
| POST   | /users     | Create a new user                                  |
| POST   | /login     | Log in to an existing user                         |
| PATCH  | /users/:id | Update the username of a specific user by id       |
| DELETE | /logout    | Log the current user out                           |

## Creating New Migrations & Seeds Files

For an overview of migrations and seeds, [check out these notes](https://github.com/The-Marcy-Lab-School/Fall-2022-Curriculum-BMC/blob/main/se-unit-7/lesson-8-migrations-and-seeds/notes.md).

The provided migration and seeds file will create a `users` table with `id`, `username`, and `password_hash` columns. If you need to update these columns, consider looking into the [alterTable](https://knexjs.org/guide/schema-builder.html#altertable) Knex documentation.

For creating a new table, look at the [createTable](https://knexjs.org/guide/schema-builder.html#createtable) documentation.

# Authentication vs Authorization

Remember, `authenticated` means "We have confirmed this person is who they say they are" and `authorized` means "This person is who they say they are AND they are allowed to be here." So if we just want a user to be logged into the site to show content, we just check if they're `authenticated`. However, if they wanted to update their profile info, we'd need to make sure they were `authorized` to do that (e.g. the profile they're updating is their own).

What's _super_ annoying is if a user has missing or malformed credentials (they are not authenticated)...the 401 error we throw says "unauthorized." And when a user _is_ authenticated but not authorized, the 403 you throw says "Forbidden." Sometimes the internet is just weird.

### Cookie Session

While more limited in size (4kb is the absolute max amount of info), [cookie sessions](https://expressjs.com/en/resources/middleware/cookie-session.html) are much easier to understand.

1. When a request comes in for signup/login, the server creates a cookie (the `handle-cookie-sessions` middleware does this for us). That cookie is an object called `session` that is added to each request `req`.
2. The model will store the user data in the database (or look it up for `/login`) and return back the user with it's unique `user.id`
3. When we get the `User` back from the model, we store the `user.id` in that cookie (`session.userId = user.id`)
4. Now, that cookie lives with every request made by that user (`req.session`) and the client can check if it is logged in using the `/api/me` endpoint (see below).

## /api/me

In order to keep source of truth simple, we're going to track who is logged in with that `GET /api/me` convention.

- Each time a page is loaded, we quickly hit `GET /api/me`.
- If there is a logged in user, we'll see that in the json.

The reason this route is used instead of `GET /api/users/:id` is two fold.

1. We don't know the user's `id` on load, so how could we know which `id` to provide in the URL?
2. `GET` REST routes are supposed to be **idempotent** (eye-dem-PO-tent) which means "don't change." `GET /api/me` will change depending on the auth cookie. So, this little example app also has a `GET /api/users/:id` route because `GET /api/me` is not a replacement for it. `GET /api/users:id` isn't used in the client yet but your projects might in the future if you ever want to find a particular user by id (or username)!

# Advice

## Do not trust the front end

Remember, **DO NOT TRUST THE FRONTEND**. Validate everything on the server. Just because you block a form in the GUI doesn't mean a nefarious actor couldn't just pop open a console and make a `fetch` request. Also, the frontend can be buggy and mistakes can happen.

## Be wary of errors

Given time constraints, this project is handling barely any errors. The model is very brittle right now, the server and sql errors should be handled like we've done before. We're also only handling the most basic of flows and errors on the client. Things like handling attempted recreations of users who already exist or even wrong passwords can be handled much more delicately.