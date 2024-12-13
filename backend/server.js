const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config();

//mongo connection
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connection established!'))
.catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('MERN Games API is Running!');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));