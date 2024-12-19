# CLI Blog Platform

A **CRUD blog platform** built entirely in the terminal using **Node.js**, **MongoDB**, and **readline**. This project demonstrates core backend development concepts, including user authentication, error handling, and CLI-based interaction.

## Features

* **CRUD Operations**:
  * Create, Read, Update, and Delete blog posts
  * Users can manage posts via terminal commands

* **User Authentication**:
  * Validate emails using regex
  * Username and password verification for added security

* **Error Handling**:
  * Comprehensive error handling for invalid inputs and server issues

* **Data Aggregation**:
  * Explore a few aggregation methods with MongoDB to gain insights

## Requirements

1. **Node.js**: Ensure you have Node.js installed on your system
2. **MongoDB Atlas**:
   * Create an account at MongoDB Atlas
   * Obtain your **connection string** and credentials
3. **Dependencies**:
   * Clone this repo and run `npm install` to set up the environment

## Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies:
```bash
npm install
```


3. Seting up enviroment Variavles

## Create a `.env` file

* In the root directory of the project, create a file named `.env`
* Add your **MongoDB connection string** and credentials to this file:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
```


4. Start the application:
```bash
node app.js
```

## Usage

* Follow the CLI prompts to:
  * Register or log in as a user
  * Create, update, delete, or view blog posts

## Purpose

This project is purely **educational and practical**. It was designed to:
1. Teach fundamental backend concepts
2. Explore error handling, data validation, and CLI interactions

## Acknowledgments

Special thanks to those who provided support and guidance during development.