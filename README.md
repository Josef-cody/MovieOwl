# MovieOwl
 
### movie search website

##### This website is based on database from mongodb sample database
![logo]([https://github.com/Josef-cody/kitchaid/assets/85129283/d84efb30-9320-4ab4-a73e-18fe2b33675a](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/Movie-owl.png?raw=true))
frontend/public/imgs/Movie-owl.png

### Features
- Search movie aftername
- Recommend movies after IMDB rating and votes
- Sort movies after genres
- Filtering movies after year and language
- Registe and sign in function
- Be able to create your own movie list and edit it.

Visit https://movies-owl.netlify.app/

Sign up with Email and login


![mobile (2)](https://github.com/Josef-cody/kitchaid/assets/85129283/31ecc762-264b-485c-aea2-303dbdf227ce)


## Tech

MovieOwl is a ---MERN fullstack website:
#### Front-end
- [React] 
- - react-query - as CRUD hooks associated with axios
- - react-hook-form  -for collecting of user data
- - react-router-dom - for frontend URI route control
- - react-bootstrap - for UI design, combine with my own CSS style
- - react-datepicker - for date picking
- [Axios] - for CRUD at frontend, using axios instance for every HTTP request
- [dotenv] - for secure api-keys and uri
- [HTML5] 
- [CSS3]
- [SASS]

##### Frontend website hosted on netlify

#### Back-end
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [bcryptjs] - the encrpt package
- [helmet] - for more secure headers
- [jsonwebtoken] - securely transmitting information between parties
- [dotenv] - for secure api-keys and uri
- [mongoose] - MongoDB as database

##### Backend server hosted on heroku

#### Table of contents
![Screenshot 2023-05-31 at 8 14 41 PM](https://github.com/Josef-cody/kitchaid/assets/85129283/dd2f6089-ba99-4207-8ebe-f410e94ca3b5) <br/>
![Screenshot 2023-05-31 at 8 16 18 PM](https://github.com/Josef-cody/kitchaid/assets/85129283/584f2bcc-b422-4481-9e2e-7e095a7adf0f)

## Installation

MoviewOwl requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

clone project https://github.com/Josef-cody/kitchaid.git

##### Backend
install dependencies run
- npm install

for database connection, change your own mongo_uri at .env file
- npx nodemon - index.js

##### Frontend
- npm install

for backend connection, change your API_url at .env file

- npm start


