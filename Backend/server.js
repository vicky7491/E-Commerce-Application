const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Connect a databse connection -- u can also create a seperate file for this and then import that file here
mongoose.connect('mongodb+srv://vickyyadav5383:2025@e-commerce.wjekf.mongodb.net/'
).then(()=>console.log('MongoDB connected')).catch(err=>console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET','POST','PUT','DELETE'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));