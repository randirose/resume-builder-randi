const db = require('../config/connection');
const { User, Job, Skill } = require('../models');
const userSeeds = require('./userSeeds.json');
const jobSeeds = require('./jobSeeds.json');
const skillSeeds = require('./skillSeeds.json');

db.once('open', async () => {
  try {
    await Job.deleteMany({});
    await Skill.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < jobSeeds.length; i++) {
      const { _id, userEmail } = await Job.create(jobSeeds[i]);
      const user2 = await User.findOneAndUpdate(
        { email: userEmail },
        {
          $addToSet: {
            jobs: _id,
          },
        }
      );
    }
    for (let i = 0; i < skillSeeds.length; i++) {
        const { _id, userEmail } = await Skill.create(skillSeeds[i]);
        const user3 = await User.findOneAndUpdate(
          { email: userEmail },
          {
            $addToSet: {
              skills: _id,
            },
          }
        );
      }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
