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

`Post /api/v1/subject`

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
        "_id": "5ec0d8df95afb802a4a35a46",
        "subjectName": "English",
        "categoryName": "primary"
    }
}
```

