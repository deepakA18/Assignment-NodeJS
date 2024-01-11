User Management
1. Signup:
 Collected basic details (email, phone number, name, profile image, password) 
during the signup process.
 Ensured at least one of the phone number or email is provided during signup.
 Implemented encryption for passwords.

2. Login:
 Allowed users to log in using email/phone and password.

3. Modify User Details:
 Users can only modify their own name and profile image.
 Phone number and email, once entered, cannot be changed.

4. Delete User:
 Users have the ability to delete their accounts.

Roles and Access Control
5. Roles:
 Defined two roles: Admin and User.

6. Admin Access:
 Admins can view, modify, and delete all user details.

7. User Access:
 Users can only view, modify and delete their own details.

Admin Management
8. Create Admin:
 Created APIs to allow the creation of admin accounts.

Authentication and Security
9. Authentication:
 Implemented an authentication system using JSON Web Tokens (JWT).

10.Password Encryption:
 Used bcrypt to securely encrypt user passwords.

Image Storage
11.Profile Image:
 Save profile images in the local system using Multer library.
 Ensured that image URLs work, at least in the local environment.

Database and Framework
12.Framework:
 Utilized Express.js for API development.

13.Database:
 Used MongoDB for the database.

Data Validation
14.Data Validation:
 Implemented thorough data validation to ensure the correctness and integrity of 
input data using Postman API testing tool.
