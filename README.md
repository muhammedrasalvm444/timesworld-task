React Login and Country Listing App
Welcome to the React Login and Country Listing App! This app allows users to log in, view a list of countries, and interact with a slider for easy navigation. It's built using React, Redux Toolkit, TypeScript, and Vite for fast development. The app is fully responsive, so it works seamlessly on both desktop and mobile devices.

What You’ll Find Here
Login Page: The login form asks for a username and password. The password must be at least 8 characters long and include a capital letter, a number, and a symbol. Once logged in, users are redirected to the home page.
Home Page: After logging in, you'll see a list of countries, each displayed with its flag and region, all fetched from the REST Countries API.
Slider: There’s a slick slider on the home page with navigation buttons (Next/Previous) and clickable dots to jump between slides.
Pagination: We’ve added a "load more" button to load additional countries as you scroll.
Continent Filter: You can filter the countries by continent, making it easier to find specific regions.
How to Set Up
Prerequisites
Make sure you have the following installed:

Node.js (version 16 or later)
Git
Getting Started
Clone the repo:

bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
Navigate to the project folder:

bash
Copy
Edit
cd your-repo-name
Install dependencies:

bash
Copy
Edit
npm install
Run the app:

bash
Copy
Edit
npm run dev
This will start the app on http://localhost:3000.

Open your browser and you’re good to go!

What Technologies Are Used?
React: The heart of the app, built using functional components and hooks.
Redux Toolkit: To manage global state like login status and country data.
TypeScript: For type safety and better development experience.
Vite: Super-fast development server to keep things snappy.
React-Bootstrap: For easy-to-use components with built-in responsiveness.
REST API: We’re using REST Countries API to fetch the countries' data.
Folder Structure
Here’s a quick look at how the project is organized:

bash
Copy
Edit
/src
  /components
    /Login
    /Home
    /Slider
  /redux
    /slices
    store.ts
  /utils
  App.tsx
  index.tsx
API Integration
We’re pulling country data from REST Countries API. The countries are displayed with their flag and region, and you can paginate through them with the "load more" button.

How to Use the App
Login: Enter a username and password. If your credentials are correct, you’ll be taken to the Home page.
Home Page: Once logged in, you’ll see a list of countries with their flags and regions. You can scroll through them, navigate using the slider, and even filter by continent.
Deployment
The app is live on Netlify for easy access in production.

