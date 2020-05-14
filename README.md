# Online Tutoring-app

This is an Online Tutoring app created as a task project in Startdotng

## API v1 DOCUMENTATION

**API"s can be tested using the postman app. Parameters are to be sent via the body tab** 

**Heroku URL -----> https://dry-mountain-17814.herokuapp.com/**

**Admin Details**

 - Email: ayodelesaba@gmail.com

 - Password: themayor1
 
 ### Signup and Login
 
 **Signup**
 
 A user can sign up as either Student or Tutor. Users cannot sign up as an admin
 
 `Route: POST /api/v1/signup`
 
 **Required Parameters**
 
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
