# EduApp ITM - As-Is Prototype

This is the current state (As-Is) of the EduApp ITM educational platform.

## Features

- React-based educational platform
- Three user roles: admin, teacher, student
- Course management with modules and assessments
- Interactive VBA learning modules
- Hardcoded data (no persistence)

## Running the Application

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`

## Test Accounts

- Admin: `admin@itm.edu.co` / `admin123`
- Teacher: `j.salazar@itm.edu.co` / `profe123`
- Student: `carlos.perez@correo.itm.edu.co` / `est123`

## Architecture

This is the current hardcoded implementation with no API layer or database integration.
All data is stored in the `INITIAL_DATA` constant within the App component.

## Next Steps

See the design document for the To-Be architecture with backend integration.
