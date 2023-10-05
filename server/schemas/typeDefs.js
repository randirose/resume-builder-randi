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
    _id: ID
    jobTitle: String!
    employer: String!
    jobDescription: String!
    userEmail: String
  }

  type Skill {
    _id: ID
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
    jobs(userEmail: String!): [Job]
    job(jobId: ID!): Job
    skills(userEmail: String!): [Skill]
    skill(skillId: ID!): Skill
    me: User
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addJob(userId: ID!, jobTitle: String, employer: String, jobDescription: String, userEmail: String): Job
    addSkill(userId: ID!, skillName: String!): Skill
    removeJob(jobId: ID!): Job
    removeSkill(skillId: ID!): Skill
  }
`;

module.exports = typeDefs;