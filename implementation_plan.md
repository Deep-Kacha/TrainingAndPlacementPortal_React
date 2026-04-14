# Connect Frontend to Backend

This plan outlines the steps to connect the React frontend to the Express backend by implementing authentication (Registration/Login) and setting up a robust API communication layer.

## User Review Required

> [!IMPORTANT]
> - I will be installing `bcryptjs` and `jsonwebtoken` in the **Backend** for secure password hashing and authentication.
> - I will be installing `axios` in the **Frontend** for API requests.
> - I will be creating a `models` directory in the Backend to manage database tables using Sequelize.

## Proposed Changes

### Backend

#### [MODIFY] [package.json](file:///d:/TrainingAndPlacementPortal_React/Backend/package.json)
- Add `bcryptjs` and `jsonwebtoken` dependencies.

#### [NEW] [models](file:///d:/TrainingAndPlacementPortal_React/Backend/models)
- Create `User.js`, `StudentProfile.js`, etc., to match the `schema.sql`.

#### [NEW] [controllers/authController.js](file:///d:/TrainingAndPlacementPortal_React/Backend/controllers/authController.js)
- Implement logic for `register` and `login`.

#### [NEW] [routes/authRoutes.js](file:///d:/TrainingAndPlacementPortal_React/Backend/routes/authRoutes.js)
- Define endpoints for authentication.

#### [MODIFY] [index.js](file:///d:/TrainingAndPlacementPortal_React/Backend/index.js)
- Register auth routes and potentially other feature routes.

---

### Frontend

#### [MODIFY] [package.json](file:///d:/TrainingAndPlacementPortal_React/Frontend/package.json)
- Add `axios` dependency.

#### [NEW] [src/api/axios.js](file:///d:/TrainingAndPlacementPortal_React/Frontend/src/api/axios.js)
- Set up a central Axios instance with `baseURL: 'http://localhost:5000/api'`.

#### [MODIFY] [src/Components/home/StudentRegister.jsx](file:///d:/TrainingAndPlacementPortal_React/Frontend/src/Components/home/StudentRegister.jsx)
- Update `handleSubmit` to call the backend registration API.

#### [MODIFY] [src/Components/home/Login.jsx](file:///d:/TrainingAndPlacementPortal_React/Frontend/src/Components/home/Login.jsx)
- (Or whichever file handles Login) Update to call the backend login API and store the JWT token.

## Open Questions

1. **Authentication Strategy**: Is JWT (JSON Web Token) acceptable for your authentication needs? This is usually the standard for React-Express apps.
2. **Database State**: Have you already executed the `schema.sql` on your local PostgreSQL database? If not, should I include a migration/sync step in the backend?

## Verification Plan

### Automated Tests
- Run `npm run dev` for both Frontend and Backend.
- Use the Browser tool to test the Registration form and verify the data is saved in the database.

### Manual Verification
- Verify successful login redirects the user to their respective dashboard (Admin/Student).
- Check the browser console for any CORS issues or API errors.
