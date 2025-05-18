Below are four detailed examples with visual diagrams that illustrate how route matching and parameter merging work in Express, depending on whether you use `mergeParams: true` or not.

---

### **Example 1: Static Mount Path with `mergeParams: true`**

**Setup:**  
- **Mounting in `app.js`:**  
  ```js
  app.use('/api/v1/blog', blogRouter);
  ```
- **Inside `blogRouter`:**  
  ```js
  const blogRouter = Router({ mergeParams: true });
  
  blogRouter.get('/:id', (req, res) => {
    // For a request to '/api/v1/blog/123'
    // req.params becomes: { id: '123' }
    res.send(`Blog ID: ${req.params.id}`);
  });
  ```

**Process:**  
1. The incoming URL is `/api/v1/blog/123`.
2. Express matches the mount path `/api/v1/blog` and strips it off.
3. The remaining URL `/123` is passed to `blogRouter`.
4. Inside `blogRouter`, the route `/:id` matches `/123`.
5. Since the mount path didn’t have any dynamic parts, `req.params` ends up with just `{ id: '123' }`.

**Visual Diagram:**

```
+--------------------------------------------------+
|  app.use('/api/v1/blog', blogRouter)             |
+--------------------------------------------------+
                │
 Request URL:   │  /api/v1/blog/123
                │
                ▼
+--------------------------------+
| Express strips `/api/v1/blog`  |
| Remaining path: '/123'         |
+--------------------------------+
                │
                ▼
+----------------------------------------+
| Inside blogRouter (mergeParams:true):  |
| Route defined as GET '/:id'            |
| req.params => { id: '123' }            |
+----------------------------------------+
```

---

### **Example 2: Static Mount Path without `mergeParams`**

**Setup:**  
- **Mounting in `app.js`:**  
  ```js
  app.use('/api/v1/blog', blogRouter);
  ```
- **Inside `blogRouter`:**  
  ```js
  const blogRouter = Router(); // Note: mergeParams not enabled
  
  blogRouter.get('/:id', (req, res) => {
    // For a request to '/api/v1/blog/123'
    // req.params becomes: { id: '123' }
    res.send(`Blog ID: ${req.params.id}`);
  });
  ```

**Process:**  
1. The incoming URL is `/api/v1/blog/123`.
2. Express matches and strips the static mount path `/api/v1/blog`.
3. The remaining URL `/123` is processed by `blogRouter`.
4. The defined route `/:id` matches, so `req.params` is `{ id: '123' }`.
5. Since no dynamic parameters existed in the mount path, there’s no difference from Example 1 here.

**Visual Diagram:**

```
+--------------------------------------------------+
|  app.use('/api/v1/blog', blogRouter)             |
+--------------------------------------------------+
                │
 Request URL:   │  /api/v1/blog/123
                │
                ▼
+--------------------------------+
| Express strips `/api/v1/blog`  |
| Remaining path: '/123'         |
+--------------------------------+
                │
                ▼
+-------------------------------+
| Inside blogRouter (default):  |
| Route defined as GET '/:id'   |
| req.params => { id: '123' }   |
+-------------------------------+
```

---

### **Example 3: Nested Dynamic (Mixed) Mount Path with `mergeParams: true`**

**Setup:**  
- **Mounting in `app.js`:**  
  ```js
  app.use('/api/v1/users/:userId/blog', blogRouter);
  ```
- **Inside `blogRouter`:**  
  ```js
  const blogRouter = Router({ mergeParams: true });
  
  blogRouter.get('/:id', (req, res) => {
    // For a request to '/api/v1/users/42/blog/123':
    // req.params becomes: { userId: '42', id: '123' }
    res.send(`User ${req.params.userId} - Blog ID: ${req.params.id}`);
  });
  ```

**Process:**  
1. The incoming URL is `/api/v1/users/42/blog/123`.
2. Express matches the mount path `/api/v1/users/:userId/blog`:
   - It extracts and temporarily holds `userId: '42'`.
3. Express strips the mount path off, leaving `/123` for `blogRouter`.
4. Because `mergeParams: true` is enabled, the parameter `{ userId: '42' }` is merged with the parameters defined in `blogRouter`.
5. The defined route `/:id` in the router matches `/123`, setting `id: '123'`.
6. In total, `req.params` becomes: `{ userId: '42', id: '123' }`.

**Visual Diagram:**

```
+--------------------------------------------------------------+
|  app.use('/api/v1/users/:userId/blog', blogRouter)           |
+--------------------------------------------------------------+
                │
 Request URL:   │  /api/v1/users/42/blog/123
                │
                ▼
+-----------------------------------------------------+
| Express matches mount '/api/v1/users/:userId/blog'  |
| Extracted Parent Param: { userId: '42' }            |
| Strips mount path ⇒ Remaining: '/123'               |
+-----------------------------------------------------+
                │
                ▼
+------------------------------------------------------------+
| Inside blogRouter (mergeParams:true):                      |
| Route defined as GET '/:id'                                |
| Merges parent params with local ({ id: '123' })            |
| Final req.params => { userId: '42', id: '123' }            |
+------------------------------------------------------------+
```

---

### **Example 4: Nested Dynamic (Mixed) Mount Path without `mergeParams`**

**Setup:**  
- **Mounting in `app.js`:**  
  ```js
  app.use('/api/v1/users/:userId/blog', blogRouter);
  ```
- **Inside `blogRouter`:**  
  ```js
  const blogRouter = Router(); // Default, without mergeParams
  
  blogRouter.get('/:id', (req, res) => {
    // For a request to '/api/v1/users/42/blog/123':
    // req.params becomes: { id: '123' }
    // The parent parameter userId is not available
    res.send(`Blog ID: ${req.params.id}`);
  });
  ```

**Process:**  
1. The incoming URL is `/api/v1/users/42/blog/123`.
2. Express matches the mount path `/api/v1/users/:userId/blog` and extracts the parameter `userId: '42'` internally.
3. It strips the mount path off, passing the remaining path `/123` to `blogRouter`.
4. Since `mergeParams` is not enabled, the `userId` from the parent route is not merged into `req.params`.
5. Inside `blogRouter`, the route `/:id` matches `/123`, setting `id: '123'`.
6. The resulting `req.params` inside the router only contains `{ id: '123' }`—the `userId` is lost.

**Visual Diagram:**

```
+--------------------------------------------------------------+
|  app.use('/api/v1/users/:userId/blog', blogRouter)           |
+--------------------------------------------------------------+
                │
 Request URL:   │  /api/v1/users/42/blog/123
                │
                ▼
+----------------------------------------------------------+
| Express matches mount '/api/v1/users/:userId/blog'       |
| Extracts parent param: { userId: '42' } (held privately) |
| Strips mount path ⇒ Remaining: '/123'                    |
+----------------------------------------------------------+
                │
                ▼
+--------------------------------------------------+
| Inside blogRouter (default, no mergeParams):     |
| Route defined as GET '/:id'                      |
| req.params => { id: '123' }                      |
| (Parent param userId is not merged)              |
+--------------------------------------------------+
```

---

### **Summary**

- **Static Mount Path (`/api/v1/blog`):**  
  Whether or not you enable `mergeParams` makes no practical difference here because there are no dynamic parameters in the mount path.  
  - **Result in both cases:** `req.params` contains only `{ id: '123' }` if the defined route is `/:id`.

- **Dynamic (Mixed) Mount Path (`/api/v1/users/:userId/blog`):**  
  - **With `mergeParams: true`:** The router receives both parent (`userId`) and local (`id`) parameters.  
    - Outcome: `req.params` becomes `{ userId: '42', id: '123' }`.
  - **Without `mergeParams`:** The router does **not** inherit the parent parameters.  
    - Outcome: `req.params` contains only `{ id: '123' }`; `userId` is lost.
