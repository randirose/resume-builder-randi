const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phoneNumber: String!
    address: String!
    linkedIn: String!
    jobs: [Job]
    skills: [Skill]
    educations: [Education]
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

  type Education {
    _id: ID
    school: String!
    dateRange: String!
    degree: String
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
    educations(userEmail: String!): [Education]
    education(educationId: ID!): Education
    me: User
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, phoneNumber: String!, address: String!, linkedIn: String!): Auth
    login(email: String!, password: String!): Auth
    addJob(jobTitle: String!, employer: String!, jobDescription: String!, userEmail: String): Job
    addSkill(skillName: String!): Skill
    addEducation(school: String!, dateRange: String!, degree: String, userEmail: String): Education
    removeJob(jobId: ID!): Job
    removeSkill(skillId: ID!): Skill
    removeEducation(educationId: ID!): Education
  }
`;

module.exports = typeDefs;