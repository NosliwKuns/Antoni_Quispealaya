# Bus Management System Documentation

Welcome to the Bus Management System! This comprehensive documentation will guide you through the setup, architecture, and functionality of the innovative solution designed to streamline bus operations and enhance passenger experiences.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Architecture](#architecture)
4. [Microservices](#microservices)
    - [User Microservice](#user-microservice)
    - [Bus Microservice](#bus-microservice)
    - [Itinerary Microservice](#itinerary-microservice)
    - [Reservation Microservice](#reservation-microservice)
    - [Chat Microservice](#chat-microservice)
5. [API Endpoints](#api-endpoints)
6. [Features](#features)
7. [Technologies](#technologies)
8. [Usage](#usage)

## Introduction

The Bus Management System is a cutting-edge solution designed to revolutionize bus operations and passenger interactions. It leverages advanced technologies and best practices to provide a seamless experience for users, administrators, and bus operators. This system empowers you to efficiently manage bus schedules, reservations, and communication, enhancing the overall travel experience.

## Getting Started

To begin, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/NosliwKuns/Antoni_Quispealaya.git
   ```

2. Navigate to the root folder of the repository:

   ```bash
   cd your-repository
   ```

3. Install the required dependencies for each microservice and the API Gateway:

   ```bash
    cd api-gateway
    npm install
    
    cd ../ms-users
    npm install
    
    cd ../ms-buses
    npm install
    
    cd ../ms-itineraries
    npm install
    
    cd ../ms-reservations
    npm install
    
    cd ../ms-chat
    npm install
   ```

## Architecture

The system follows a microservices architecture, allowing for modularity, scalability, and maintainability. Each microservice focuses on a specific domain and interacts through APIs. This architecture enables us to efficiently manage and update individual components while ensuring optimal performance.

### User Microservice

The User Microservice handles user authentication, profile management, and role-based permissions. It ensures secure access and efficient management of user-related operations.

### Bus Microservice

The Bus Microservice is responsible for managing bus information, including plate numbers, operators, and seat types. It provides endpoints for adding, updating, and querying bus details.

### Itinerary Microservice

The Itinerary Microservice manages travel itineraries, including origin, destination, schedules, prices, and assigned buses. Users can search and reserve seats on available itineraries.

### Reservation Microservice

The Reservation Microservice handles seat reservations for passenger users. It enables users to reserve seats, view existing reservations, and manage their shopping cart.

### Chat Microservice

The Chat Microservice offers real-time chat functionality for onroad users. It facilitates seamless communication and coordination among onroad personnel, enhancing internal operations.

## API Endpoints

The system offers a comprehensive set of API endpoints for managing buses, itineraries, reservations, and user interactions. Refer to the Swagger documentation for detailed information about each endpoint.

Access the Swagger documentation at: http://localhost:3000/api/docs

## Features

* Seamless bus schedule management.
* User authentication and role-based access control.
* Real-time chat for efficient coordination.
* User-friendly reservation system with a shopping cart.
* API documentation using Swagger.
* Scalable microservices architecture.

## Technologies

* Node.js and TypeScript for backend development.
* Nest.js framework for microservices.
* TypeORM for efficient database management.
* WebSockets with socket.io for real-time chat.
* CronJobs for scheduled tasks.
* Swagger for API documentation.

## Usage

To start the system and its microservices, follow these steps:

1. Navigate to each microservice folder (api-gateway, ms-users, etc.) in separate terminals.

2. Run the following command in each terminal:

   ```bash
    npm run start
   ```

3. Access the API documentation for each microservice through the provided Swagger URLs.

