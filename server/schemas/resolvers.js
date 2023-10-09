const { AuthenticationError } = require('apollo-server-express');
const { User, Job, Skill, Education } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('jobs').populate('skills').populate('educations');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('jobs').populate('skills').populate('educations');
    },
    jobs: async (parent, { userEmail }) => {
      const params = userEmail ? { userEmail } : {};
      return await Job.find(params);
    },
    job: async (parent, { jobId }) => {
      return await Job.findOne({ _id: jobId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('jobs').populate('skills').populate('educations');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    skills: async (parent, { userEmail }) => {
        const params = userEmail ? { userEmail } : {};
        return Skill.find(params);
      },
    skill: async (parent, { skillId }) => {
        return Skill.findOne({ _id: skillId });
    },
    educations: async (parent, { userEmail }) => {
      const params = userEmail ? { userEmail } : {};
      return Education.find(params);
    },
    education: async (parent, { educationId }) => {
      return Education.findOne({ _id: educationId });
    },
  },


Mutation: {
    addUser: async (parent, { firstName, lastName, email, password, phoneNumber, address, linkedIn }) => {
      const user = await User.create({ firstName, lastName, email, password, phoneNumber, address, linkedIn });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    addJob: async (parent, { jobTitle, employer, jobDescription, userEmail }, context) => {
        if (context.user) {
          const job = await Job.create({
            jobTitle,
            employer,
            jobDescription,
            userEmail: context.user.email,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { jobs: job._id } }
          );
  
          return job;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    addSkill: async (parent, { skillName, userEmail }, context) => {
        if (context.user) {
          const skill = await Skill.create({
            skillName,
            userEmail: context.user.email,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { skills: skill._id } }
          );
  
          return skill;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    addEducation: async (parent, { school, dateRange, degree, userEmail }, context) => {
      if (context.user) {
        const education = await Education.create({
          school,
          dateRange,
          degree,
          userEmail: context.user.email,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { educations: education._id } }
        );

        return education;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeJob: async (parent, { jobId }, context) => {
        if (context.user) {
          const job = await Job.findOneAndDelete({
            _id: jobId,
            userEmail: context.user.email,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { jobs: job._id } }
          );
  
          return job;
        }
        throw new AuthenticationError('You need to be logged in!');
    },

    removeSkill: async (parent, { skillId }, context) => {
        if (context.user) {
          const skill = await Skill.findOneAndDelete({
            _id: skillId,
            userEmail: context.user.email,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { skills: skill._id } }
          );
  
          return skill;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    removeEducation: async (parent, { educationId }, context) => {
      if (context.user) {
        const education = await Education.findOneAndDelete({
          _id: educationId,
          userEmail: context.user.email,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { educations: education._id } }
        );

        return education;
      }
      throw new AuthenticationError('You need to be logged in!');
  },
  },
};

module.exports = resolvers;
