# Hyfit API Documentation

## Local Environment

```shell
docker-compose up -d
```

## Production Environment

baseUrl: https://hyfit-715678994976.asia-southeast2.run.app

### Authentication

#### Register Endpoint

Method: POST

Endpoint: {baseUrl}/api/v1/register

Request Body:

```json
{
    "email": "string",
    "username": "string",
    "password": "string",
    "full_name": "string",
    "weight": number,
    "height": number,
    "bio": "string",
    "gender": "enum" # male || female
}
```

Response Success:

```json
{
    "status": "success",
    "message": "User registered successfully",
    "data": {
        "email": "string",
        "username": "string",
        "full_name": "string",
        "bio": "string",
        "weight": number,
        "height": number,
        "password": "string", # hashed
        "gender": "enum", # male || female
        "created_at": "timestamp",
        "is_active": boolean, # default true
        "avatar_url": null,
        "date_of_birth": null,
        "updated_at": null,
        "id": 2
    }
}
```

Optional Payload Request:

```json
{
    "avatar_url": "string",
    "date_of_birth": "string",
}
```

#### Login Endpoint

Method: POST

Endpoint: {baseUrl}/api/v1/login

Request Body:

```json
{
    "username": "string",
    "password": "string"
}
```

Response Success:

```json
{
    "status": "success",
    "message": "User login successfuly",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiZGV2YW4iLCJlbWFpbCI6ImRldmFuQGdtYWlsLmNvbSIsImlhdCI6MTczMzY2MjM5MywiZXhwIjoxNzMzNjY1OTkzfQ.EnACdjbyFDP_zmt_HBMQ_BD6ctBmeV5rVvxpQu4vLDQ"
    }
}
```

### User / Profile

#### Get Profile Endpoint

Method: GET

Endpoint: {baseUrl}/api/v1/profile

Authorization: Bearer Token

Response Success:

```json
{
    "status": "success",
    "message": "User found!",
    "data": {
        "full_name": "string",
        "bio": "string",
        "height": number,
        "weight": number,
        "age": number
    }
}
```

#### Update Profile Endpoint

Method: PATCH

Endpoint: {baseUrl}/api/v1/profile

Authorization: Bearer Token

Request Body: 

```json
{
    "full_name": "string",
    "avatar_url": "string",
    "bio": "string",
    "height": number,
    "weight": number,
    "date_of_birth": "string", # e.g 1995-05-12
    "gender": "enum" # male || female
}
```

Response Success:

```json
{
    "status": "success",
    "message": "Profile updated successfully",
    "data": {
        "full_name": "string",
        "avatar_url": "string",
        "bio": "string",
        "height": number,
        "weight": number,
        "date_of_birth": "string", # e.g 1995-05-12
        "gender": "enum" # male || female
    }
}
```

#### Delete Profile Endpoint

Method: DELETE

Endpoint: {baseUrl}/api/v1/profile

Authorization: Bearer Token

Response Success: [204 (No Content)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204)