import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($userId: ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      phoneNumber
      address
      linkedIn
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
      educations {
        _id
        school
        dateRange
        degree
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

export const QUERY_EDUCATIONS = gql`
  query getEducations {
    educations {
      _id
      school
      dateRange
      degree
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
      phoneNumber
      address
      linkedIn
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
      educations {
        _id
        school
        dateRange
        degree
      }
    }
  }
`;