const users = [
    'artorrias',
    'leon',
    'bee',
    'dakoba',
    'richie'
];

const thoughtText = [
    'post',
    'posted',
    'poster',
    'postee',
    'posts'
];

const emojis = [
    'emoji1',
    'emoji2',
    'emoji3',
    'emoji4',
    'emoji5',
    'emoji6',
    'emoji7',
    'emoji8',
    'emoji9',
    'emoji10',
    'emoji11',
    'emoji12',
];

const getRandomItem = (arr) => arr[Math.floor(Math.random()*arr.length)];

const getRandomUser = () => `${getRandomItem(users)}`;

const getRandomEmoji = () =>`${getRandomItem(emojis)}`;

const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push(
            getRandomEmoji()
        );
    }
    return results;
}

const getRandomThought = (int, userName) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomItem(thoughtText),
            userName: userName,
            reactions: getRandomReactions(5),
        });
    }
    return results;
}

module.exports = { getRandomThought, getRandomUser, getRandomReactions };