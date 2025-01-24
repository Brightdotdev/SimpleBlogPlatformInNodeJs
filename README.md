# Full-Stack Blog Platform

A simple full-stack blog platform built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. This project uses **sessions** for user authentication.

---

## Features
- **User Authentication**:
  - Register a new account.
  - Log in and log out.
  - Session-based authentication.
- **Blog Posts**:
  - Create, read, update, and delete blog posts.
  - View all posts or filter by author.
- **Responsive Design**:
  - Built with **Tailwind CSS** for a modern and responsive UI.

---

## Technologies Used
- **Frontend**:
  - React
  - Vite
  - Tailwind CSS
  - React Router
- **Backend**:
  - Node.js
  - Express
  - MongoDB (with Mongoose)
  - Express Session (for session-based authentication)
- **Development Tools**:
  - ESLint (for linting)
  - Nodemon (for backend hot-reloading)
  - concurrently (for running server and client server side by side)

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (local or MongoDB Atlas)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Brightdotdev/SimpleBlogPlatformInNodeJs.git
cd SimpleBlogPlatformInNodeJs
```

### 2. Install Dependencies
Frontend
Navigate to the client folder and install dependencies:

```bash
cd client
npm install
```

Backend
Navigate to the server folder and install dependencies:

```bash
cd ../server
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the server folder and add the following:

```env
MONGO_URI=mongodb://localhost:27017/my-blog-platform
SESSION_SECRET=your-secret-key
```

Replace `your-secret-key` with a strong secret for session encryption.

Replace `mongodb://localhost:27017/my-blog-platform` with your MongoDB connection string (use MongoDB Atlas for a cloud database).

### 4. Start the Development Servers
#####  Option 1: Run Frontend and Backend Separately
Start the backend server:

```bash
cd server
npm run dev
```

The backend will run on `http://localhost:5000`.

Start the frontend development server:

```bash
cd ../client
npm run dev
```

The frontend will run on `http://localhost:5173`.

##### Option 2: Run Both Servers Concurrently
From the root folder, run:

```bash
npm run dev
```

This will start both the frontend and backend servers simultaneously.

### 5. Access the Application
Open your browser and navigate to `http://localhost:5173`.

You should see the blog platform homepage.

## Project Structure
```
my-blog-platform/
├── client/               # Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.jsx       # Main React component
│   │   ├── main.jsx      # React entry point
│   │   └── index.css     # Tailwind CSS file
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/               # Backend (Node.js + Express + MongoDB)
│   ├── DatabaseControllers/    # Controllers for CRUD operations
│   ├── Models/           # Mongoose models
│   ├── Routes/           # Express routes
│   ├── utils/           # utility functions and helper functions
│   ├── Strategies/      # Passport js strategies
│   ├── app.js            # Express app
│   ├── package.json
│   └── .env              # Environment variables
├── package.json          # Root scripts (optional)
└── README.md             # Project documentation
```

## API Endpoints
### User Authentication
- `POST /register`: Register a new user.

```json
{
  "username": "example",
  "password": "password123"
}
```

- `POST /login`: Log in a user and create a session.

```json
{
  "username": "example",
  "password": "password123"
}
```

- `POST /logout`: Log out a user and destroy the session.

### Blog Posts
- `GET /posts`: Get all blog posts.
- `GET /posts/:id`: Get a single blog post by ID.
- `POST /posts`: Create a new blog post (protected route).

```json
{
  "title": "My First Post",
  "content": "This is the content of my first post."
}
```

- `PUT /posts/:id`: Update a blog post by ID (protected route).
- `DELETE /posts/:id`: Delete a blog post by ID (protected route).

## Screenshots
(Add screenshots of your application here, if available.)

## Contributing
1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m "Add your message here"
```

4. Push to the branch:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request.

## License
This project is licensed under the MIT License.

## Acknowledgments
- Vite for the fast development setup.
- Tailwind CSS for the utility-first CSS framework.
- Express for the backend framework.
- MongoDB for the database.

## Contact
If you have any questions or feedback, feel free to reach out:

[Bright On Gmail](mailto:iamtherealbright@gmail.com)

[Bright Github](https://github.com/Brightdotdev)

[Bright On LinkedIn](https://linkedin.com/in/brightdotdev)

Project Repository: [GitHub Repo](https://github.com/Brightdotdev/SimpleBlogPlatformInNodeJs.git)

## Purpose

This project is purely **educational and practical**. It was designed to:
1. Teach fundamental backend concepts
2. Explore error handling, data validation, and CLI interactions

## Acknowledgments

Special thanks to those who provided support and guidance during development.