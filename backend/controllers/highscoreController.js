const { Highscore } = require('../models/Highscore');

exports.saveHighscore = async (req, res) => {
    const { userId, gameId, score } = req.body;
    if (!userId || !gameId || score === undefined) {
        return res.status(400).send({ error: 'userId, gameId and score are required.' });
    }
    try {
        let highscore = await Highscore.findOne({ userId });
        if (!highscore) {
            highscore = new Highscore({ userId, scores: [{ gameId, highscore: score }] });
        } else {
            let game = highscore.scores.find(game => game.gameId === gameId);
            if (!game) {
                highscore.scores.push({ gameId, highscore: score });
            } else {
                game.highscore = score;
            }
        }
        await highscore.save();
        res.send(highscore);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to save highscore' });
    }
};

exports.getHighscore = async (req, res) => {
    const { userId, gameId } = req.query;
    if (!userId || !gameId) {
        return res.status(400).send({ error: 'userId and gameId are required!' });
    }

    try {
        const highscoresEntry = await Highscore.findOne({ userId });
        if (!highscoresEntry) {
            highscoresEntry = new Highscore({ userId, scores: [{ gameId, highscore: 0 }] });
            await highscoresEntry.save();
        }

        const gameScore = highscoresEntry.scores.find((game) => game.gameId === gameId);
        res.send({ userId, gameId, highscore: gameScore ? gameScore.highscore : 0 });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to get highscore' });
    }
};
