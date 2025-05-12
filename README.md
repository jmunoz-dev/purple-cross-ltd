# Purple Cross Ltd - Employee Management Dashboard

This project is a frontend application built with Vue 3 to manage and display employee data for Purple Cross Ltd, a fictional pharmaceutical company created for demo purposes. The dashboard allows users to view, edit, and manage employee information, with functionalities such as sorting, filtering, and creating new employees.

## Features

- **Employee Grid**: Displays a list of employees with relevant details such as name, occupation, department, employment dates, and termination status.
- **View/Edit/Remove**: Buttons for viewing, editing, or deleting an employee’s information.
- **Create Employee**: A form to add new employees, with validation on required fields (Code, Full Name, Occupation, Department).
- **Responsive Design**: The app is optimized for different screen sizes.
- **Data Handling**: The employee data is provided in a sample JSON file.
- **Basic Validation**: Ensures required fields are completed before saving.

## Technologies Used

- **Vue 3**: Frontend framework for building the user interface.

  - **Vue Router**: For managing routing and navigation within the app.
  - **Pinia**: State management library for handling the application state.

- **CSS**: Styling for the user interface (UI)
- **Extra Libraries**:
  - **Tailwind**

---

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
