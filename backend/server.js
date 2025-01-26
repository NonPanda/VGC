const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./errorHandler');
const purchaseRoutes=require('./routes/purchase');
const highscoreRoutes=require('./routes/highscore');



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
    res.send('games api running');
});

app.use('/api/purchases', purchaseRoutes);
app.use('/api/highscores', highscoreRoutes);
app.use(errorHandler);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





