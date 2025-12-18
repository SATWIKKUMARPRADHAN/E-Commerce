# Quick Setup Guide

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ../client
npm install
```

## Running the Application

### Terminal 1 - Backend Server
```bash
cd server
npm start
```
Server runs on: http://localhost:5000

### Terminal 2 - Frontend Development Server
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:3000

## Testing the Application

1. Open browser: http://localhost:3000
2. Navigate using the menu:
   - **Admin** - View dashboard statistics
   - **Profile** - View user profile
   - **Orders** - View order history
   - **Chatbot** - Test customer support chatbot

## API Testing

Test endpoints using:
- Browser: http://localhost:5000/api/admin/dashboard
- Postman/Thunder Client
- Or use the frontend pages

## Troubleshooting

- **Port already in use**: Change PORT in server/server.js or use different port
- **CORS errors**: Ensure backend server is running
- **Module errors**: Make sure you've run `npm install` in both client/ and server/ folders

