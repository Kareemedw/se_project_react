# WTWR (What to Wear?) — React Weather Clothing App

Project Name

WTWR (What to Wear?)

## Description

WTWR is a responsive React application that helps users decide what clothing to wear based on the current weather conditions. The app fetches real-time weather data using an external weather API and displays clothing items appropriate for the temperature (hot, warm, or cold).

Users can:

View current weather conditions
See recommended clothing items based on temperature
Add new clothing items with an image and weather type
Preview clothing items in a modal
Delete clothing items with a confirmation modal
Toggle temperature units between Fahrenheit and Celsius
Persist clothing items using a mock API (json-server)

This project demonstrates modern React development practices including component architecture, state management, API integration, conditional rendering, and CRUD operations.

Functionality
Weather-based clothing filtering
Modal system (Add, Preview, Delete Confirmation)
Controlled form inputs using a custom useForm hook
REST API integration (GET, POST, DELETE)
Dynamic UI updates without page reload
Keyboard accessibility (Escape key closes modals)
Responsive grid layout for clothing items
Technologies Used
Frontend
React
JavaScript (ES6+)
React Router
CSS (Grid / Flexbox)
Context API
Custom Hooks
Backend (Mock API)
json-server
REST API
Local JSON database (db.json)
External APIs
OpenWeather API
Project Structure (Simplified)
src/
├── components/
│ ├── AddItemModal
│ ├── DeleteConfirmationModal
│ ├── ItemCard
│ ├── ItemModal
│ ├── ClothesSection
│ ├── Profile
│ └── Main
│
├── utils/
│ ├── api.js
│ ├── weatherApi.js
│
├── contexts/
│ └── CurrentTemperatureUnitContext.js
│
├── hooks/
│ └── useForm.js
│
└── App.jsx
Installation

## Clone the repository:

git clone:

Navigate into the project:

cd wtwr

Install dependencies:

npm install
Running the React App

Start the development server:

npm start

The app will run at:

http://localhost:3000
Running the Mock API (json-server)
Step 1 — Install json-server
npm install json-server --save-dev

OR globally:

npm install -g json-server
Step 2 — Start the mock API
json-server --watch db.json --id \_id --port 3001

The API will run at:

http://localhost:3001/items
Example API Endpoints
GET /items
POST /items
DELETE /items/:id
Example db.json
{
"items": [
{
"_id": 1,
"name": "Jacket",
"imageUrl": "https://example.com/jacket.png",
"weather": "cold"
}
]
}
Available Scripts
npm start

Runs the React development server.

npm run build

Builds the app for production.

json-server --watch db.json --id \_id --port 3001

Runs the mock API server.

Future Improvements
User authentication
Edit clothing items
Persistent database (MongoDB / Supabase)
Loading and error states
Image validation
Unit tests
Deployment (Render / Vercel)

## Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Project Pitch Video - https://drive.google.com/file/d/1EKrt5wxZ_9oNlxf5FW7D-gDT2C4S2MRG/view?usp=sharing

## Author:

Kareem Edwards
Software Engineer
