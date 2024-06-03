## Bitespeed Backend Task: Identity Reconciliation

This project involves creating a web service for FluxKart.com to identify and link multiple customer contacts using Bitespeed. The service should help track customers who use different contact information across multiple purchases.


### Overview

FluxKart.com wants to reward loyal customers by linking different orders made with different contact information to the same person. Bitespeed collects contact details and stores them in a relational database table named `Contact`.

### Tech-stack

**Database: Any SQL database can be used 
**Backend framework: NodeJs with typescript is preferred but any other framework can also be used.

### Requirements

- Design a web service with an endpoint `/identify` that will receive HTTP POST requests with JSON body containing `email` and/or `phoneNumber`.
- The service should return the consolidated contact information.

### Design

1. **Database Table: Contact**
    - `id`: Unique identifier for each contact.
    - `phoneNumber`: Phone number of the contact.
    - `email`: Email address of the contact.
    - `linkedId`: ID of another contact linked to this one.
    - `linkPrecedence`: Indicates if the contact is "primary" or "secondary".
    - `createdAt`: Timestamp when the contact was created.
    - `updatedAt`: Timestamp when the contact was last updated.
    - `deletedAt`: Timestamp when the contact was deleted.

2. **API Endpoint: /identify**
    - Accepts a POST request with `email` and/or `phoneNumber`.
    - Returns the consolidated contact information.

### Implementation

#### Database Schema

Here's the SQL schema for the `Contact` table:

```sql
CREATE TABLE Contact (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phoneNumber VARCHAR(15),
    email VARCHAR(255),
    linkedId INT,
    linkPrecedence ENUM('primary', 'secondary'),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);
```

#### API Endpoint

The `/identify` endpoint will process the incoming request and return the consolidated contact information.

**Request:**

```json
{
    "email": "example@example.com",
    "phoneNumber": "1234567890"
}
```

**Response:**

```json
{
    "contact": {
        "primaryContactId": 1,
        "emails": ["example@example.com", "another@example.com"],
        "phoneNumbers": ["1234567890"],
        "secondaryContactIds": [2, 3]
    }
}
```

### Setup and Run

#### Prerequisites

- Node.js
- SQL Database (e.g., MySQL, PostgreSQL)

#### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/Mamta-bisht0522/Bitespeed-Backend.git

2. **Install dependencies:**

```bash
npm install
```

3. **Configure the database:**

Update the database configuration in `config/database.js`.

4. **Start the server:**

```bash
npm start
```

The server will start on `http://localhost:3000`.

### Testing

To test the endpoint, you can use tools like Postman or CURL.

Example CURL request:

```bash
curl -X POST http://localhost:3000/identify \
-H "Content-Type: application/json" \
-d '{
    "email": "example@example.com",
    "phoneNumber": "1234567890"
}'
```

### Conclusion

This service enables FluxKart.com to track and link customer identities across multiple purchases, enhancing their customer experience and loyalty rewards program. The design ensures that contacts are linked efficiently and accurately, with the ability to handle new information dynamically.