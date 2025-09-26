# Location Posting App 📍
A MERN stack project that allows users to sign up, log in, and post locations on a map.
The app demonstrates authentication, authorization, and map integration using Leaflet.
(No booking functionality is included.)


🚀 Features

🔑 User Authentication (Signup / Login / Logout)

🛡 Authorization (only logged-in users can post)

🗺 Post a Location with map integration (Leaflet.js)

📂 View Listings by category (e.g., Rooms, Castles, etc.)

⚡ Runs on Node.js with Express backend and MongoDB database

# 🛠 Tech Stack
Frontend: HTML, CSS, EJS
Backend: Node.js, Express.js
Database: MongoDB + Mongoose
Authentication: Passport.js 
Maps: Leaflet.js

1.⚙ Installation & Setup
Clone the repository
git clone https://github.com/manjityadav/delta-project.git
cd location-posting-app

2.Install dependencies npm install

3.Set up environment variables Create a .env file in the root with the following: PORT=8080 MONGO_URI=your_mongodb_connection_string SESSION_SECRET=your_secret_key

4.Run the project nodemon app.js 5.Open your browser at 👉 http://localhost:8080
