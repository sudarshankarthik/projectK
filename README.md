
---

# Project K - Social Media App

Project K is a social media app built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to create accounts, post text and images, like posts, and view profiles.

## Installation

To run the app, you'll need to install dependencies for both the client and server.

### Client

1. Navigate to the `client` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the client. The client will run on `http://localhost:3000`.

### Server

1. Navigate to the `server` directory.
2. Create a folder named `storage` with a subfolder named `images` to store uploaded images.
3. Create a `.env` file in the `server` directory with the following content:

```
MONGO_URI = "mongodb://localhost:27017/projectK"
PORT = 3001
JWT_SECRET = "SomeRandomTextDontChangeAfterServerCreatedUsers"
```

4. Run `npm install` to install dependencies.
5. Run `npm start` to start the server. The server will run on `http://localhost:3001`.

## Features

- **Authentication:** Users can create accounts and log in using JWT authentication.
- **Posting:** Users can create posts with text and images.
- **Likes:** Users can like posts.
- **Profiles:** Users can view profiles of other users.
- **Dark Mode/Light Mode:** The client supports both dark and light modes using React Redux Toolkit and Material UI.

## Technologies Used

- **Frontend:** React, Redux Toolkit, Material UI
- **Backend:** Node.js, Express.js, MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Tokens)

---
