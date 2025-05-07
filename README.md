# Prod-Template
## About
This app is created as template to follow few configuration personal to me, this may or may not be useful to anybody.
### Dev Initialization
Basic Initialization:
```bash
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```
Eslint Initialization:
```bash
npm init @eslint/config@latest
```
ESlint Plugins:
```bash
npm i -D eslint @eslint/js globals eslint-plugin-import eslint-plugin-unicorn @stylistic/eslint-plugin-js
```
Husky Config:
```bash
npx husky init
```
CommitLint:
```bash
npm pkg set scripts.commitlint="commitlint --edit"
```
ON Mac/Linux:
```bash
echo "npm run commitlint \$1" > .husky/commit-msg
```
ON Windows:
```bash
echo "npm run commitlint `$1" > .husky/commit-msg
```

## Folder Structure
```
project/
├── node_modules/         # Dependencies installed from npm.
├── src/                  
│   ├── controllers/      # Request handlers that process incoming HTTP requests.
│   ├── models/           # Database models or schemas (if using a database like MongoDB, Sequelize, etc.).
│   ├── routes/           # Route definitions that map endpoints to controllers.
│   ├── middleware/       # Custom middleware functions (e.g., for authentication, error handling).
│   ├── services/         # Business logic, external API calls, or any core operations beyond basic CRUD.
│   ├── utils/            # Utility functions and helpers that can be reused across the project.
│   └── app.js            # Entry point where you configure Express (or another framework) and set up middleware.
├── config/               # Configuration files (environment-specific settings, DB connections, etc.).
├── public/               # Static assets such as images, CSS files, or JavaScript files served directly.
├── tests/                # Test files, organized per module or functionality (or you may name this __tests__).
├── .env                  # Environment variable definitions (typically not committed to version control).
├── package.json          # Project metadata, dependencies, and scripts.
├── package-lock.json     # Auto-generated file that locks dependency versions.
└── README.md             # Project overview and documentation.
```

**Key Points:**

- The **`src`** folder houses most application code, making it easier to distinguish core logic from configuration or static assets.
- **`controllers`**, **`routes`**, and **`middleware`** work together to handle and process HTTP requests.
- **`services`** and **`utils`** keep business logic and helper functions modular and reusable.
- **`config`** centralizes configuration to support different environments (development, testing, production).

---

### **Creating/Updating a Blog Record**

1. **Entry Point:**  
   **`src/app.js`**  
   The Express server handles incoming requests from this starting point.

2. **Route Handling:**  
   **`src/routes/blogRoutes.js`**  
   In the routes file, you define a POST endpoint to create a blog. For instance:  
   ```js
   router.post('/', authMiddleware, blogController.createBlog);
   ```  
   When a POST request is made to `/blogs`, this route is triggered.
   OR,
   In this file, you define the endpoints for blog-related operations. For example, updating a blog record might be mapped with a route like:  
   ```js
   router.put('/:id', authMiddleware, blogController.updateBlog);
   ```  
   When a PUT request is made to `/blogs/:id`, Express uses this route to start the request processing.

3. **Authentication Middleware:**  
   **`src/middleware/auth.js`**  
   Before the update logic is executed, the `authMiddleware` is invoked. This middleware checks if the incoming request is from an authenticated user. If the check fails, the middleware typically sends an error response; otherwise, it passes control to the next function.

4. **Controller Logic:**  
   **`src/controllers/blogController.js`**  
   Now the controller method (`createBlog` OR `updateBlog`) handles the request. For new record, it extracts the new blog data from the request body, validates it, and then passes the data on to the service.
   For existing record, the controller extracts parameters (like the blog ID and data to update) from the request and performs any necessary input validation. It then delegates the business logic to a service layer.

5. **Service Layer:**  
   **`src/services/blogService.js`**  
   For new record:
   The controller calls a function in the service layer that implements the business logic for creation (such as ensuring no duplicate titles exist, setting default values, etc.).
   For existing record:
   The controller calls a function from the service layer to perform the actual update. This layer is responsible for any business rules, such as checking if the blog exists or if the user has permission to update it.

6. **Database Interaction:**  
   **`src/models/blog.js`**  
   Finally, the service layer uses the model to insert the new record or runs the query to update the blog record into the MongoDB database.

**Traversal Summary for Create/Update:**  
```
src/app.js 
  └── src/routes/blogRoutes.js  (defines POST /blogs) 
       └── src/middleware/auth.js  (checks authentication) 
            └── src/controllers/blogController.js  (handles request, calls service) 
                 └── src/services/blogService.js  (business logic for creation) 
                      └── src/models/blog.js  (performs database insertion or update)
```

---

### **Additional Considerations**

- **Robustness:** Each layer is responsible for a specific task. The middleware handles security, the controller focuses on handling request/response, and the service encapsulates business rules. This division makes your code easier to test and maintain.
- **Configuration & Error Handling:** While these steps outline the main flow, it’s common to have additional configuration (e.g., database connections in a separate `config/` folder) and error handling at various layers to ensure your application runs smoothly even in failure modes.