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
- [Credits](#credits)
- [Future Development](#future-development)
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
SO THAT I can easily edit or adjust my resume on a continuous basis throughout my career.  

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

<img width="1440" alt="Home Page" src="https://github.com/randirose/resume-builder-randi/assets/128757891/efdc7152-158f-482a-b0ca-4ffd2ca244b9">  

<img width="1440" alt="Login Screen" src="https://github.com/randirose/resume-builder-randi/assets/128757891/2ea2800d-a675-4a2a-91b0-ee777c4e4431">  

<img width="1438" alt="User Profile" src="https://github.com/randirose/resume-builder-randi/assets/128757891/65e9484e-ca8d-4efe-b7a6-2b7d03012cfd">  

<img width="1435" alt="Jobs" src="https://github.com/randirose/resume-builder-randi/assets/128757891/7eb13889-29cc-4b8b-995b-9e9095d12032">  

<img width="1439" alt="Skills and Education" src="https://github.com/randirose/resume-builder-randi/assets/128757891/19de7a70-a374-4466-99cd-a1e3574c4665">  

<img width="1440" alt="Download Page" src="https://github.com/randirose/resume-builder-randi/assets/128757891/b4554f4c-1849-47b1-b220-8e87f8a80139">  

<img width="1440" alt="Screen Shot of Downloaded Resume" src="https://github.com/randirose/resume-builder-randi/assets/128757891/c7680217-bd45-45c0-9b45-15a69565e2c5">  

## License

MIT License   

## Test

N/A

## Credits

- This Medium blog post on how to make a React component downloadable: https://shivekkhurana.medium.com/how-to-create-pdfs-from-react-components-client-side-solution-7f506d9dfa6d  
- Stack Overflow for help with sizing of the PDF: https://stackoverflow.com/questions/44989119/generating-a-pdf-file-from-react-components  
- MERN and State class activities  

## Future Development

- Edit user & job functionality: edit user info, deactivate jobs for job-specific customization  
- Create multiple resume templates for user to choose from  
- Implement additional validation (right now, validation is minimal to allow for formatting/customization)  
- LinkedIn integration: Pull in LinkedIn info (LinkedIn has a resume builder, but the formatting isn’t spectacular)  

## Questions?

Repo found here: https://github.com/randirose/resume-builder-randi  

[Randi Brown](mailto:randibrown21@gmail.com)  
GitHub Profile: https://github.com/randirose  
