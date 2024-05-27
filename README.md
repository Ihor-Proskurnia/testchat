# Simple Chat App

This is a simple chat application where users can communicate with each other.

## How to Run Locally

To run this application locally, you need to have Docker and Docker Compose installed on your system.

### Prerequisites

- Docker
- Docker Compose

### Steps

1. Clone this repository to your local machine:

   ```bash
   git clone <repository_url>

2. Navigate to the project directory:

    ```bash
   cd <project_directory>

3. Copy a `template.docker-compose.yml` file:

    ```bash
    cp template.docker-compose.yml docker-compose.yml
    
4. Fill next variables
       
    ```plaintext
       FLASK_ENV=production
       SECRET_KEY=SECRETKEY
       JWT_SECRET_KEY=JWTSECRETKEY
       GOOGLE_CLOUD_PROJECT=google-id
       GOOGLE_APPLICATION_CREDENTIALS=/app/service-account-file.json
   
5. Run the following Docker Compose command to build and start the containers:

   ```bash
   docker-compose up --build

6. Once the containers are up and running, you can access the chat application at http://localhost:8081.

### Technologies Used
+ Flask (Backend)
+ JS (Frontend)
+ Docker