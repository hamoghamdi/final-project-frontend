[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Mad Hat Chat



## Description 


---
## Prerequisites

npm  
```
$ npm install
```

Run server
```
$npm start
```

---
## User Stories
**Version 1**  

- User must be able to sign up or sign in using email and password
- User must be able to sign out and change password
- User must be able to create a new chat room and have a nickname 
- User must be able to send and recive messages while in a chat room

**Version 2**  
- User must be able to join in a chat room created by them or other users
- User must be able to delete thier chat rooms 


## Wireframes
<!-- Home page -->
![Home Page](./images/mad-hat.png) 
<!-- Sign Up -->
![Sign Up](./images/Sign-Up-page.png) 
<!-- Sign In -->
![Sign Up](./images/Sign-in-page.png) 
<!-- User Home Page -->
![Sign Up](./images/User-Home-Page.png) 
<!-- My Chat Rooms -->
![Sign Up](./images/My-chats.png) 
<!-- Join a Chat room -1 -->
![Sign Up](./images/join-chat-1.png) 
<!-- Join a chat room -2 -->
![Sign Up](./images/join-chat-2.png) 


## Technologies
<!-- **Front-end:** -->
- React
- CSS
- JSX
<!-- 
**Back-end:**
- WebSockets protocol
- Express.js
- Node.js
- Socket.io -->


## Developers
Haneen Alghamdi

<!-- 
# react-auth-template


## Installation

1. [Download](../../archive/master.zip) this template.
1. Unzip and rename the template directory (`unzip ~/Downloads/react-auth-template-master.zip`).
1. Move into the new project and `git init`.
1. Empty [`README.md`](README.md) and fill with your own content.
1. Replace name in `package.json` with your
   projects name.
1. Replace the `"homepage"` field in `package.json` with your (public) Github
   account name and repository name.
1. Install dependencies with `npm install`.
1. `git add` and `git commit` your changes.
1. Run the development server with `npm start`.

## Deployment

Before deploying, you first need to make sure the `homepage` key in your
`package.json` is pointing to the correct value. It should be the url of your
deployed application.

To deploy you should first make sure you are on the `master` branch with a
clean working directory, then you can run `npm run deploy` and wait to see if
it runs successfully.

## About

Most of the development dependencies, such as linters, SCSS compiler, Webpack
config, NPM scripts, etc in this repo come from there.

It includes all the components and routes needed to sign up, sign in, change
passwords, and sign out of an API built with either template linked above, with
no need for modification.

**NOTE**: You should customize the included components to suit you app! They're
provided as a guide and a bare minimum of functionality and style. Consider
changing the provided SCSS styles, modifying the auth code, improving the flash
messages, etc.

## Structure

Currently, the top-level `App` component stores the currently authenticated
user in state, as well as data related to the flash messages. `App` renders the
`Header` component, and a list of routes, each of which render a component from
`src/auth/components`. The `auth` directory has two non-component files, `api`
and `messages`, which contain all the needed `axios` calls, and messages to
display when API calls succeed or fail, respectively.

We recommend following this pattern in your app. For instance, if you are making
an app that keeps track of books, you might want a `books` directory next to
`auth`, which contains its own `api` and `messages` files, as well as a
`components` directory.

## Features

### `<AuthenticatedRoute />`

This template contains a handy component for creating routes that require a
user to be authenticated before visiting. This component lives in
`src/auth/components/AuthenticatedRoute.js` and is already required in `App`.
It's a thin wrapper around React Router's `<Route />` component. The only
difference is that it expects a prop called `user`, and if that prop is falsy,
it will render a `<Redirect />` that takes the user to `/`. **If you want to use
it, you must pass it the currently authenticated as a prop!**

It supports both the `component=` and `render=` attributes, but like `<Route />`
it will not forward props to the component if you use `component=`.

 ### `src/apiConfig.js`

 This file will determine whether you're in a production or development
environment and choose an API URL accordingly. Don't forget to replace the
`production` URL with your deployed API's URL.

## Tasks

Developers should run these often!

- `npm run start`: generates bundles, watches, and livereloads.
- `npm run deploy`: builds and deploys master branch

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co. -->
