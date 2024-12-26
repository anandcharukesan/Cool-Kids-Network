## Problem Statement

The "Cool Kids Network" is an online app designed to manage user profiles with varying levels of access based on assigned roles. The platform allows users to sign up, generate a character, and access character details depending on their roles. The roles are hierarchical:
- **Cool Kid**: Can view their own character's details.
- **Cooler Kid**: Can view other users' names and countries.
- **Coolest Kid**: Can view all details of all users.

Additionally, maintainers can assign roles to users through a protected API.

---

## Technical Specifications

### Backend
- **Framework**: Node.js with Express.
- **Database**: MySQL.
- **Authentication**: JWT (JSON Web Token) for secure user sessions.
- **Random User Data**: Used the `randomuser.me` API to generate fake user details.

### Frontend
- **Framework**: React with TailwindCSS for styling.
- **Pages**:
  - **Homepage**: Features login and signup buttons.
  - **Signup Page**: Allows new users to register.
  - **Login Page**: Allows users to log in using their email.
  - **User Dashboard**: Displays character details based on the user's role.
  - **Admin Dashboard**: Available only to admins for role management.

### Features Implemented
1. **User Registration**:
   - Users register with an email.
   - Fake character data is generated using `randomuser.me`.
   - Default role: "Cool Kid".
   
2. **Login System**:
   - Email-based login.
   - User role determines accessible features.

3. **Role-Based Access**:
   - **Cool Kid**: Can view their own character's details.
   - **Cooler Kid**: Can view names and countries of other users.
   - **Coolest Kid**: Can view all user details, including email and roles.

4. **Admin Role Management**:
   - A protected endpoint allows admins to change roles using email or first/last name.

---

## Running the Program

1. Clone the repository:
   ```bash
   git clone https://github.com/anandcharukesan/Cool-Kids-Network.git
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node server.js
   ```

4. Access the frontend hosted on Vercel:
   [Cool Kids Network](https://coolkidsnetwork.vercel.app/)

---

### Example Login Credentials

| Role          | Email               | Example Usage                                  |
|---------------|---------------------|-----------------------------------------------|
| **Cool Kid**  | `coolkid@gmail.com` | View only their character details.            |
| **Cooler Kid**| `coolerkid@gmail.com`| View names and countries of all users.        |
| **Coolest Kid**| `coolestkid@gmail.com`| View all details of all users.               |
| **Admin**     | `admin@gmail.com`   | Access admin dashboard and manage roles.      |

Alternatively, you can create your own account using the signup feature. 

---

## Hosting

The app is hosted on Vercel:  
**[coolkids.vercel.app](https://coolkidsnetwork.vercel.app/)**

--- 
