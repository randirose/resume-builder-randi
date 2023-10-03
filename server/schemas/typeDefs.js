const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    jobs: [Job]
    skills: [Skill]
  }

  type Job {
    jobTitle: String!
    employer: String!
    jobDescription: String!
    userEmail: String
  }

  type Skill {
    skillName: String!
    userEmail:String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    jobs(email: String): [Job]
    job(jobId: ID!): Job
    skills(email: String): [Skill]
    skill(skillId: ID!): Skill
    me: User
  }
`;

module.exports = typeDefs;