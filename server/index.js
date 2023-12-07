require('dotenv').config()
const express = require('express');
const sequelize = require('./db')
const models = require('./models/models.js')
const PORT = process.env.PORT || 3000
const router = require('./routes/index.js')
const pullTable = require('./pullTable.js')

const app = express()



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


