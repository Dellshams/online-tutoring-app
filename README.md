# Online Tutoring-app

This is an Online Tutoring app created as a task project in Startdotng

## API v1 DOCUMENTATION

**API"s can be tested using the postman app. Parameters are to be sent via the body tab** 

**Heroku URL -----> https://dry-mountain-17814.herokuapp.com/**

**Admin Details**

 - Email: deleshams@gmail.com

 - Password: bossman12
 
 ### Signup and Login
 
 **Signup**
 
 A user can sign up as either Student or Tutor. Users cannot sign up as an admin
 
 `POST /api/v1/signup`
 
 **Parameters**
 
 1. firstName
 2. lastName
 3. email
 4. password
 5. userCategory
 
 **Response**
 ```
 {
    "status": true,
    "message": "User registered successfully"
}
```

**Login**

`POST /api/vi/login`

**Parameters**

1. email
2. password

**Response**
```
{
    "status": true,
    "message": "Login successful",
    "_id": ,
    "token":
}
```

### Admin

**1. Admin can create a category named either primary, jss, sss**

`POST /api/v1/category`

**Parameters**

1. categoryName
2. token

**Response**
```
    "status": true,
    "message": "Category created",
    "newCategory": {
        "subjects": [],
        "_id": "5ebfaabe05171a049854d2ce",
        "categoryName": "sss"
```

**2. Admin can create subjects under 3 categories: primary, jss, sss**

`POST /api/v1/subject`

**Parameters**

1. subjectName
2. categoryName
3. token

**Response**
```
{
    "status": true,
    "message": "Subject created",
    "newSubject": {
        "tutors": [],
        "_id": "5ec1237ac58bbf21a859289d",
        "subjectName": "Chemistry",
        "categoryName": "sss"
    }
}
```

**3. Admin can update a subject in a category (by Id)**

`PATCH api/v1/subject`

**Parameters**

1. subjectId
2. subjectName
3. token

**Response**
```
{
    "status": true,
    "message": "Subject status has been updated",
    "subjectUpdate": {
        "tutors": [],
        "_id": "5ec1237ac58bbf21a859289d",
        "subjectName": "Physics",
        "categoryName": "sss",
        "createdAt": "2020-05-17T11:43:54.690Z",
        "updatedAt": "2020-05-17T11:53:07.798Z",
        "__v": 0
    }
}
```

**4. Admin can delete a subject in a category (by Id)**

`DELETE /api/v1/subject`

**Parameters**

1. subjectId
2. categoryName
3. token

**Response**
```
{
    "status": true,
    "message": "Subject deleted"
}
```

**5. Admin can delete a category**

`DELETE /api/v1/category`

**Parameters**

1. categoryId
2. token

**Response**
```
{
    "status": true,
    "message": "Category deleted"
}
```

**6. Admin can retrieve all tutors**
`GET /api/v1/tutors`

**Parameters**

1. token

**Response**
```
{
    "status": true,
    "data": [
        {
            "subjects": [],
            "lesson": [],
            "userCategory": "tutor",
            "_id": "5ec13105d1dea81de4914c1b",
            "firstName": "Dell",
            "lastName": "Shams",
            "email": "shamsdell@gmail.com",
            "password": "$2a$12$y7YkMh5/P9DCtsIXcT989OrQHCNGtW3ZiP6BW1Juw5iujfDPbZxHa",
            "createdAt": "2020-05-17T12:41:41.329Z",
            "updatedAt": "2020-05-17T12:41:41.329Z",
            "__v": 0
        },
        {
            "subjects": [],
            "lesson": [],
            "userCategory": "tutor",
            "_id": "5ec13188d1dea81de4914c1c",
            "firstName": "Tayo",
            "lastName": "Shams",
            "email": "tyshams@gmail.com",
            "password": "$2a$12$gfdUzTWRCGcuDXLjwd1KvOrBXjQseft7UM6EeKR0V7Eh.25OQd90u",
            "createdAt": "2020-05-17T12:43:52.368Z",
            "updatedAt": "2020-05-17T12:43:52.368Z",
            "__v": 0
        },
        {
            "subjects": [],
            "lesson": [],
            "userCategory": "tutor",
            "_id": "5ec131efd1dea81de4914c1d",
            "firstName": "Kelvin",
            "lastName": "Ubem",
            "email": "kevubem@gmail.com",
            "password": "$2a$12$N5CFIRsdTGNbD7MBIFYT3OELW6tVXflL.nEBWR4jWhblATsVLxuMm",
            "createdAt": "2020-05-17T12:45:35.948Z",
            "updatedAt": "2020-05-17T12:45:35.948Z",
            "__v": 0
        }
    ]
}
```

**7. Admin can get a tutor (by Id)**

`GET /api/v1/tutor/:id`

**Parameters**

1. tutorId
2. token

**Response**
```
{
    "status": true,
    "tutor": {
        "subjects": [],
        "lesson": [],
        "userCategory": "tutor",
        "_id": "5ec13188d1dea81de4914c1c",
        "firstName": "Tayo",
        "lastName": "Shams",
        "email": "tyshams@gmail.com",
        "password": "$2a$12$gfdUzTWRCGcuDXLjwd1KvOrBXjQseft7UM6EeKR0V7Eh.25OQd90u",
        "createdAt": "2020-05-17T12:43:52.368Z",
        "updatedAt": "2020-05-17T12:43:52.368Z",
        "__v": 0
    }
}
```

**8. Admin can deactivate a tutor (by Id)**

`DELETE /api/v1/tutor/:id`

**Parameters**

1. tutorId
2. token

**Response**
```
{
    "status": true,
    "message": "Tutor deactivated"
}
```

