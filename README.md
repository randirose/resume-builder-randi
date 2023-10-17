# Resume Builder

EdX Coding Bootcamp - Project 3

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)


## Description

Resume Builder  

App that allows users to continuously add to and remove from their downloadable, formatted resume.  

Users can:  

- View and add previous jobs (work history)  
- View and add skills  
- View and add education/certificates  
- Remove jobs/skills/certificates  
- Download a PDF version of their resume to use when applying to jobs  

## User Story

AS A member of the workforce and a job searcher,  
I WANT to have an easy way to continuously add and remove jobs, skills, and education/certificates from a formatted resume,  
SO THAT I can easily apply to multiple jobs with a nice looking resume, and,  
SO THAT I can easily edit or adjust my resume on a continuous basis throught my career.  

## Acceptance Criteria

GIVEN a full-stack application using a GraphQL database to store my work history  
WHEN I load the app  
THEN I am presented with a home page to login or sign up  
WHEN I enter in all the fields and sign up  
THEN I am presented with my empty profile page  
WHEN I add a job, skill, or education/certificate using the provided forms  
THEN I am able to see the list of the corresponding category to the left of the form (or on top if on mobile)  
WHEN I click the `Preview/Download` option in the nav bar  
THEN I am presented with a preview of my formatted resume  
WHEN I click on the `Download` button  
THEN my resume is downloaded in PDF format  
WHEN I go back to my profile page, I can add or remove additional jobs/skills/certs  
THEN those changes are reflected in my downloadable PDF resume!  

- Project Requirements:  
Use React for the front end.  
Use GraphQL with a Node.js and Express.js server.  
Use MongoDB and the Mongoose ODM for the database.  
Use queries and mutations for retrieving, adding, updating, and deleting data.  
Be deployed using Heroku (with data).  
Have a polished UI.  
Be responsive.  
Be interactive (i.e., accept and respond to user input).  
Include authentication (JWT).  
Protect sensitive API key information on the server.  
Have a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class and id naming conventions, indentation, high-quality comments, and so on).  
Have a high-quality README (with unique name, description, technologies used, screenshot, and link to deployed application).  

## Installation

Packages/Dependencies (backend):  
- `Node.js`  
- `GraphQL`  
- `bcrypt`  
- `dotenv`  
- `Express.js`  
- `jsonwebtoken`  
- `Mongoose`  
- `apollo-server-express`  

Packages/Dependencies (frontend):  
- `React` (+ associated packages in client package.json)  
- `@apollo/client`  
- `Bootstrap` / `react-bootstrap`  
- `jwt-decode`  
- `GraphQL`  
- `html2canvas` & `jspdf` (for downloadable component)  

While in the root directory of the application, enter "npm install" into the terminal to install all dependencies.

## Usage

Deployed site can be found here: https://secure-tundra-34525-b3ddf11b8e0b.herokuapp.com/  

- Sign up by filling in all the corresponding fields; the site will navigate you to your profile page.  
- Start adding jobs, skills, and education/certificates using the forms on the right (if on desktop).  
- Once all is added, navigate to the `Preview/Download` page using the top navbar.  
- You will see a preview of your resume. If everything looks good, click the download button and you'll have your PDF of your resume!
- Edit your resume by removing any jobs/skills/certs, or adding additional ones on your profile page.  

screenshots

## License

MIT License  
See [LICENSE](/LICENSE) file in contatining directory  

## Test

N/A

## Questions?

Repo found here: https://github.com/randirose/resume-builder-randi  

[Randi Brown](mailto:randibrown21@gmail.com)  
GitHub Profile: https://github.com/randirose  
