This repository contains an **end-to-end test automation project built with Cypress**, created during a hands-on Cypress course focused on real-world usage of the framework.
The main goal of this project was to **learn, practice, and apply best practices in test automation**, from initial setup to writing stable, readable, and maintainable tests.

---

## 🧠 What was covered
- Cypress environment setup  
- Well-structured E2E test architecture  
- Writing readable and maintainable automated tests  
- Using fixtures for test data  
- Creating custom commands and reusable logic  
- Applying automation best practices

---

## 🗂️ Project Structure
```
cypress/
├── e2e/ # End-to-end test cases
├── fixtures/ # Test data
├── support/
│ ├── commands.js # Custom Cypress commands
│ └── e2e.js # Global configurations
├── videos/ # Test execution videos (auto-generated)
├── screenshots/ # Failure screenshots (auto-generated)
cypress.config.js # Cypress configuration
package.json # Dependencies and scripts
```

The structure was designed to ensure:
- Easy maintenance  
- High readability  
- Scalability for future test scenarios  

---

## 🚀 How to Run the Project

### 🔧 Prerequisites
- Node.js (LTS version recommended)
- npm installed

### 🧩 Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/RaoneCosta/cursocypress.git
cd cursocypress
npm install
```
▶️ Run tests in interactive mode

npx cypress open

🧪 Run tests in headless mode (CLI)

npx cypress run


📌 Good Practices Applied

✔ Modern JavaScript test implementation

✔ Clear separation of test logic and test data

✔ Use of fixtures for data-driven testing

✔ Custom commands to reduce duplication

✔ Clean and maintainable test structure
