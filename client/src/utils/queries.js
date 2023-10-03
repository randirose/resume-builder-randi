import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      skills
      jobs
    }
  }
`;