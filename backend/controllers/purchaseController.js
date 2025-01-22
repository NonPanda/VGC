const { Purchase } = require('../models/Purchase');

exports.createPurchase = async (req, res) => {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) {
        return res.status(400).send({ error: 'userId and gameId are required.' });
    }
    const purchase = new Purchase({ userId, gameId });
    await purchase.save();
    res.send(purchase);
};

exports.getPurchasedGames = async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).send({ error: 'userId is required.' });
    }

    try {
        const purchases = await Purchase.find({ userId });
        const gameIds = purchases.map(purchase => purchase.gameId);
        res.send(gameIds);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch purchased games' });
    }
};

