import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
 `;

 export const ADD_JOB = gql`
  mutation addJob($jobTitle: String!, $employer: String!, $jobDescription: String!) {
    addJob(jobTitle: $jobTitle, employer: $employer, jobDescription: $jobDescription) {
      _id
      jobTitle
      employer
      jobDescription
    }
  }
`;

export const ADD_SKILL = gql`
mutation addSkill($skillName: String!) {
  addSkill(skillName: $skillName) {
    _id
    skillName
  }
}
`;