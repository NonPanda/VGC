const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const {Purchase }= require('./models/Purchase');
const {User} = require('./models/Purchase');


dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connection established!'))
.catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Games API is Running!');
});

app.post('/api/purchase', async (req, res) => {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) {
        return res.status(400).send({ error: 'userId and gameId are required.' });
    }
    const purchase = new Purchase({ userId, gameId });
    await purchase.save();
    res.send(purchase);
}
);

app.get('/api/games/purchased', async (req, res) => {
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
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));