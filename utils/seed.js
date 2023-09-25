const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThought, getRandomUser } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    const users = [];
    const thoughtsList = [];

    for (let i = 0; i < 5; i++) {

        const userName = getRandomUser();

        const thoughts = getRandomThought(2, userName);

        const friends = [getRandomUser(), getRandomUser(), getRandomUser(), getRandomUser(),];

        users.push({
            userName,
            thoughts: thoughts,
            email: 'guy@gmail.com',
            friends: friends,
            friendCount: friends.length,
        });

        thoughtsList.push(thoughts[0]);
        thoughtsList.push(thoughts[1]);
    }
    

    await User.collection.insertMany(users);

    await Thought.collection.insertMany(thoughtsList);

    console.table(users);
    console.table(thoughtsList);
    console.info('Seeding Complete!');
    process.exit(0);

})