import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($userId: ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      jobs {
        jobTitle
        employer
        jobDescription
      }
    }
  }
`;

export const QUERY_JOBS = gql`
  query getJobs {
    jobs {
      _id
      jobTitle
      employer
      jobDescription
    }
  }
`;

export const QUERY_SKILLS = gql`
  query getSkills {
    skills {
      _id
      skillName
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      jobs {
        _id
        jobTitle
        employer
        jobDescription
      }
      skills {
        _id
        skillName
      }
    }
  }
`;