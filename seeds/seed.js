const sequelize = require('../config/connection');
const { User, Scores } = require('../models');

const userData = require('./userData.json');
const scoreData = require('./scoreData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const scores of scoreData) {
    await Scores.create({
      ...scores,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
