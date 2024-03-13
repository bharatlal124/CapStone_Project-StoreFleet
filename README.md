# Project Title

Capstone StoreFleet Backend Project

## Description

StoreFleet is a RESTful API build using Node.js, Express.js, Nodemailer and MongoDB, with smooth operations. Welcome users with emails to securing admin routes and enabling password reset functionalities. Simplify product search and ordering for hassle-free delivery. And built With robust features like product filtering, search capabilities, authentication and order placement mechanisms.

## Features

- **User Authentication:** Secure user authentication with password hashing using bcrypt and JWT token generation.
- **User Management:** CRUD operations for user profiles, roles, and admin capabilities.
- **Product Management:** CRUD operations on all Products, with reviews functionalities associated to each product.
- **Order Management:** In this we place new Order with shippingInfo, orderedItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice.
- **Password Reset:** Implementation of a secure password reset mechanism with token-based authentication.
- **Email Notifications:** Sending welcome emails and password reset emails using utility functions.
- **Database Connectivity:** MongoDB connection established using Mongoose for data storage.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bharatlal124/CapStone_Project-StoreFleet
   cd CapStone_Project-StoreFleet
   ```

2. Install dependencies:
   **npm install**

3. Set up environment variables:

   - Create a `.env` file in the root directory with the following variables (e.g., `uat.env` for UAT environment):
     - `PORT`: Port for the server to run.
     - `mongoURI`: MongoDB connection string.
     - `JWT_Secret`: Secret key for JWT token generation.
     - `JWT_Expire`: Token expiration time.
     - `COOKIE_EXPIRES_IN`: Cookie expiration time.
     - `STORFLEET_SMPT_MAIL`: SMTP email for StoreFleet notifications.
     - `STORFLEET_SMPT_MAIL_PASSWORD`: SMTP email password.
     - `SMPT_SERVICE`: SMTP service (e.g., Gmail).

4. Start the server:
   **node index.js**

## API Endpoints

### User Routes

- **POST /api/storefleet/user/signup**: SignUp a new user account.
- **POST /api/storefleet/user/login**: Log in as a user.
- **GET /api/storefleet/user/logout**: Logout the user.
- **POST /api/storefleet/user/password/forget**: Forget the password.
- **PUT /api/storefleet/user/password/reset/:token**: Reset the password.
- **GET /api/storefleet/user/details**: Get all user details.
- **PUT /api/storefleet/user/password/update**: Update password.
- **PUT /api/storefleet/user/profile/update**: Update user profile.

### Product Routes

- **GET /api/storefleet/product/products?page=1**: Get all product.
- **POST /api/storefleet/product/add**: Add new product.
- **PUT /api/storefleet/product/update/id**: Update product by ID.
- **DELETE /api/storefleet/product/delete/id**: Delete product by ID.
- **GET /api/storefleet/product/details/id**: Get product details by ID.
- **GET /api/storefleet/product/products?keyword=oneplus&page=1**: Search products by keyword.
- **GET /api/storefleet/product/products?keyword=oneplus&page=1&category=Mobile**: Filter product by category.
- **GET /api/storefleet/product/products?keyword=iphone&price[gte]=10000&price[lte]=200000**: Filter product by price.
- **GET /api/storefleet/product/products?rating[gte]=0&rating[lte]=4**: Filter product by rating.
- **PUT /api/storefleet/product/rate/id**: Rate product by ID.
- **GET /api/storefleet/product/reviews/id**: Get all reviews of a specific product by ID.
- **DELETE /api/storefleet/product/review/delete?productId=id&reviewId=id**: Delete a specific review from product by ID.

### admin Routes

- **GET /api/storefleet/user/admin/allusers**: Get all user details.
- **GET /api/storefleet/user/admin/details/id**: Get a specific user details by ID.
- **DELETE /api/storefleet/user/admin/delete/id**: Delete a specific user by ID.
- **PUT /api/storefleet/user/admin/update/id**: Update user role and Profile by ID.

### Order Routes

- **POST api/storefleet/order/new**: Place new Order.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose (for MongoDB object modeling)
- JWT (JSON Web Tokens) for authentication
- Multer (for handling file uploads)
- Bcrypt (for password hashing)
- Body-parser (for parsing request bodies)
- ESLint (for code linting)
- Winston (for logging)
- Dotenv (for environment variables)
- Nodemailer (For sending emails)
- Node.js Crypto Module (For generating secure token for password reset)
