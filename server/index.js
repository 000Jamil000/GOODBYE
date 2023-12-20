require('dotenv').config()
const express = require('express');
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const router = require('./routes/index.js')


const app = express()

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(express.json())
app.use('/api', router)

const start = async () => {

    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}` ))
    }
    catch(e){
        console.log(e)
    }
    
}



start()


