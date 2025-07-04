# Senior Project RCIMS

## Overview
Senior Project RCIMS (Rehabilitation Center Information Management System) is a comprehensive platform designed to manage clinical information remotely. It includes features for patient management, professional management, appointment scheduling, messaging, role-based access, and more.
## Features
- **User Authentication**: Secure login and signup for users.
- **Patient Management**: Manage patient details, medical history, and appointments.
- **Professional Management**: Manage professional details, schedules,and patient assignments. 
- **Messaging**:  Secure messaging between professionals and patients.
- **Notifications**: Real-time notifications for appointments, messages, and updates.
- **Reports**: Generate and view various reports related to patient and professional activities.



## Tech Stack
- **MongoDB**: Database
- **Express.js**: Backend framework
- **React**: Frontend library
- **Node.js**: Backend runtime environment

##  Dependencies
### Backend
- **bcrypt**: For hashing passwords securely.
- **cors**: To enable Cross-Origin Resource Sharing.
- **express**: A minimal and flexible Node.js web application framework.
- **jsonwebtoken**: For creating and verifying JSON Web Tokens.
- **mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **pdfkit**: For generating PDF documents.
- **socket.io**: For enabling real-time, bidirectional communication between web clients and servers.

###  Frontend
- **axios**: For making HTTP requests from the browser.
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: Serves as the entry point to the DOM and server renderers for React.
- **react-router-dom**: For handling routing in React applications.
- **@mui/material**: A popular React UI framework.
- **@mui/icons-material**: Provides Material Design icons as React components.
- **sweetalert2**: For creating beautiful, responsive, customizable, and accessible (WAI-ARIA) replacement for JavaScript's popup boxes.

## Installation

### Prerequisites
- Node.js
- MongoDB
MongoDB

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    node app
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend server:
    ```bash
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000` for the frontend.
2. Explore the various features of the platform.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License.
