# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



## Project Dependencies

This project uses the following dependencies:

- **Axios**: Used for making HTTP requests from the frontend to the backend.  
  Install it with:
  ```bash
  npm install axios
  ```

- **Tailwind CSS**: A utility-first CSS framework for designing and styling UI components quickly and responsively.  
  Install it with:
  ```bash
  npm install -D tailwindcss
  ```

- **CORS (Cross-Origin Resource Sharing)**: Middleware that enables cross-origin requests in the backend. Useful for allowing the frontend to interact with the backend across different origins.  
  Install it with:
  ```bash
  npm install cors
  ```

- **Heroicons**: A set of beautiful and customizable icons for React, used in the navigation and UI components.  
  Install it with:
  ```bash
  npm install @heroicons/react
  ```

- **npm (Node Package Manager)**: The tool used to manage and install project dependencies. It comes with Node.js. Make sure to have it installed to use the above packages.


## Database Schema

This project uses a MySQL database with the following tables:

### `users` Table

This table stores information about the users of the application.

| Field     | Type           | Null | Key | Default           | Extra          |
|-----------|----------------|------|-----|-------------------|----------------|
| id        | int            | NO   | PRI | NULL              | auto_increment |
| username  | varchar(255)   | NO   | UNI | NULL              |                |
| password  | varchar(255)   | NO   |     | NULL              |                |

- **id**: Unique identifier for each user.
- **username**: The user's unique username.
- **password**: The user's password, stored in an encrypted format.

### `tasks` Table

This table stores the to-do tasks associated with each user.

| Field       | Type           | Null | Key | Default | Extra          |
|-------------|----------------|------|-----|---------|----------------|
| id          | int            | NO   | PRI | NULL    | auto_increment |
| user_id     | int            | NO   | MUL | NULL    |                |
| description | varchar(255)   | NO   |     | NULL    |                |
| is_done     | tinyint(1)     | YES  |     | 0       |                |

- **id**: Unique identifier for each task.
- **user_id**: Foreign key linking the task to a specific user. It references the `id` field in the `users` table.
- **description**: The description or content of the task.
- **is_done**: A boolean flag (0 or 1) indicating whether the task is completed.

> **Note:** The `tasks` table has a foreign key relationship with the `users` table, meaning that each task belongs to a specific user. When a user is deleted, all associated tasks will be deleted automatically (`ON DELETE CASCADE`).
