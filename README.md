# CLI Blog Platform

A **CRUD blog platform** built entirely in the terminal using **Node.js**, **MongoDB(mongoose as the ORM)**. This project demonstrates core backend development concepts, including user authentication, error handling and simple backend development

## Features

* **CRUD Operations**:
  * Create, Read, Update, and Delete blog posts

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
   * Create an account at MongoDB Atlas (or host the databse locally by instaling mongodb compass and mongosh)
   * Obtain your **connection string** and credentials
3. **Dependencies**:
   * Clone this repo and run `npm install` to set up the environment

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Brightdotdev/SimpleBlogPlatformInNodeJs.git
cd SimpleBlogPlatformInNodeJs
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

or with a local mongodb databsae uri

```env
MONGO_URI=mongodb://localhost/<your-database-name>
```


4. Start the application:
```bash
npm run dev
```

##### This is at it's core a simple application and the code is out here for collaboration(it's not in any way a complete application or can be used...it is for learning purposes)


## Purpose

This project is purely **educational and practical**. It was designed to:
1. Teach fundamental backend concepts
2. Explore error handling, data validation, and CLI interactions

## Acknowledgments

Special thanks to those who provided support and guidance during development.
