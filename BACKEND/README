# API Endpoints

## Authentication

### Login

- **Endpoint:** /api/auth/login
- **Method:** POST
- **Description:** Authenticates a user and returns an access token.

example usage:

```BASH
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
           "username": "newuser",
           "password": "securepassword",
           "name": "New User"
         }'
```

### Register

- **Endpoint:** /api/auth/register
- **Method:** POST
- **Description:** Registers a new user and returns a success message.

example usage:

```BASH
curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
           "username": "newuser",
           "password": "securepassword"
         }'

```

## User Profile

### Verify User

- **Endpoint:** /api/user/profile
- **Method:** GET
- **Description:** Retrieves the profile information of the authenticated user.

example usage:

```BASH
curl -X GET http://example.com/api/user/profile \
     -H "Authorization: Bearer your_jwt_token_here"
```
