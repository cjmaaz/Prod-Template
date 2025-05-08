## **DB Operations**
### **Step-by-Step Process With Mongoose**

1. **Creating the Schema**  
   - **What Happens:**  
     We import the `Schema` constructor from the mongoose library. Using the `new` keyword, we provide an object that outlines the structure of the model. This object can define properties in a simple way (like `String` or `[String]`) or in a more detailed fashion (like `{ type: String, required: true }`) to enforce constraints.  

2. **Building the Model**  
   - **What Happens:**  
     We pass the created Schema to the `model()` method (also imported from mongoose). The first parameter is the collection name (for example, `'post'`), and the second parameter is your Schema instance. The `model()` method then returns a "class/constructor function" that contains all of the model’s functionalities.

3. **Storing and Exporting the Model**  
   - **What Happens:**  
     Since `model()` returns a constructor function, we assign it to a variable using PascalCase (e.g., `Post`). This naming convention is standard practice and makes it clear that this variable represents a class-like construct. This model is then exported so it can be used elsewhere to create and manipulate records.

4. **Inserting a Record**  
   - **What Happens:**  
     When you instantiate the model by executing the constructor function (using `new Post()`), it creates a new document that conforms to your Schema’s structure. This operation returns a promise which, when awaited, confirms that the new record has been successfully inserted into the collection.

---

### **Visual Flow Diagram**

```
         +-----------------------------+
         |  Import Mongoose Components |
         +-------------+---------------+
                       │
                       │
                       ▼
         +-----------------------------+
         |  Create the Schema:         |
         |  new Schema({               |
         |      field1: String,        |
         |      field2: [String],      |
         |      field3: {              |
         |          type: String,      |
         |          required: true     |
         |      }                      |
         |  })                         |
         +-------------+---------------+
                       │
                       │
                       ▼
         +-----------------------------+
         |  Build the Model with:      |
         |  model('post', schema)      |
         +-------------+---------------+
                       │
                       │ (returns a constructor)
                       ▼
         +-----------------------------+
         |  Store in Variable:         |
         |  const Post = model(...)    |
         +-------------+---------------+
                       │
                       │ (export for reuse)
                       ▼
         +-----------------------------------+
         |  Create New Record:               |
         |  const newPost = new Post({...})  |
         |  await newPost.save()             |
         +-----------------------------------+
```

---