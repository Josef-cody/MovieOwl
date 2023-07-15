# MovieOwl
 
### movie search website

##### This website is based on database from mongodb sample database

![](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/index.png?width=300px)


### Features
- Search movie aftername
- Recommend movies after IMDB rating and votes
- Sort movies after genres
- Filtering movies after year and language
- Registe and sign in function
- Registe and sign in function
- Be able to create your own movie list and edit it.

Visit https://movies-owl.netlify.app/

Sign up with Email and login


![](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/signup.png?raw=true)
![](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/login.png?raw=true)
### User home page
![](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/home1.png?raw=true)
![](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/home2.png?raw=true)
### User movie list
![](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/myList.png?raw=true)
### filter
![](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/filter.png?raw=true)
### User update and logout
![](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/userSetting.png?raw=true)


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
![FrontEnd](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/tableFront.png?raw=true) <br/>
![BackEnd](https://github.com/Josef-cody/MovieOwl/blob/main/frontend/public/imgs/tableBack.png?raw=true)

## Installation

MoviewOwl requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.


##### Backend
install dependencies run
- npm install

for database connection, change your own mongo_uri at .env file
- npx nodemon - index.js

##### Frontend
- npm install

for backend connection, change your API_url at .env file

- npm start


