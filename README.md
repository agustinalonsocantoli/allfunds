# Allfunds Backend and Frontend

- The backend is built using Node.js, Express and MongoDB.
- The frontend is built using React, TypeScript and Chakra UI.

## Clone the repository:

- git clone https://github.com/agustinalonsocantoli/allfunds.git

## Deployed Test URLs

- Frontend: https://allfunds.vercel.app
- Backend API: https://allfunds.onrender.com/

## Installation Frontend

1. Install dependencies:

   ```sh
   cd frontend
   npm install
   ```

2. Create a `.env` file in the root directory and add the following environment variables:

   ```env
    VITE_BACKEND_URL=url_api_endpoint
   ```

3. Start the server:

   ```sh
   npm run dev
   The server will start on http://localhost:5173.
   ```

## Frontend Pages

The application has the following pages:

- `/` - Main page displaying all news
- `/archived` - Main page displaying archived news
- `/login` - User authentication page
- `/create` - Form to create news (authenticated users only)
   
## Installation Backend

1. Install dependencies:

   ```sh
   cd backend
   npm install
   ```

2. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=5500
   TOKEN_SECRET_KEY=your_jwt_secret
   DB_URL=your_mongodb_uri
   CLOUDINARY_KEY_SECRET=your_api_key_secret_cloudinary
   CLOUDINARY_KEY_PUBLIC=your_api_key_public_cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudname_cloudinary
   ```

3. Start the server:

   ```sh
   npm run dev
   The server will start on http://localhost:5500.
   ```

## API Endpoints Backend

### Authentication Routes

- `POST /v1/auth/login` - User authentication and login

### User Routes

- `POST /v1/users` - Create new user
- `GET /v1/users` - Get all users
- `GET /v1/users/:id` - Get user by ID

### News Routes

- `GET /v1/news` - Get all news articles (filters: archived=true/false, sortBy=createdAt/archiveDate, order=asc/desc)
- `POST /v1/news` - Create new news article (requires authentication token)
- `PUT /v1/news/:id` - Archive news article with archived=true in body
- `DELETE /v1/news/:id` - Delete news article (restricted to author only)