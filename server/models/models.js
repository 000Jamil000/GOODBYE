const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Passenger = sequelize.define('passenger', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    FullName: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    PassportData: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false
    }

})

const Purchase = sequelize.define('purchase', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    ticketId: { 
        type: DataTypes.INTEGER,
        primaryKey: true, 
    }
})

const Ticket = sequelize.define('ticket', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Memberid: { 
        type: DataTypes.STRING,
        unique: true
    },
    flightNumber: { 
        type: DataTypes.STRING,
        unique: true 
    },
    seatNumber: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    cost: { 
        type: DataTypes.FLOAT 
    },
    airplaneNumber: { 
        type: DataTypes.STRING, 
        unique: true
    }
})

const Airplane = sequelize.define('airplane', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    airplaneNumber: { 
        type: DataTypes.STRING,
        unique: true 
    },
    model: { 
        type: DataTypes.STRING 
    },
    year: { 
        type: DataTypes.INTEGER 
    }
})

const Flight = sequelize.define('flight', {
    flightNumber: { 
        type: DataTypes.STRING, 
        primaryKey: true,
        unique: true 
    },
    departureDateTime: { 
        type: DataTypes.DATE 
    },
    departurePlace: { 
        type: DataTypes.STRING 
    },
    airplaneNumber: { 
        type: DataTypes.STRING,
        unique: true 
    }
});


Passenger.hasMany(Purchase);
Purchase.belongsTo(Passenger);

// Покупка <-> Билет (многие к одному)
Purchase.belongsTo(Ticket);
Ticket.hasMany(Purchase);

// Билет <-> Рейс (многие к одному)
Ticket.belongsTo(Flight);
Flight.hasMany(Ticket);

// Билет <-> Самолет (один ко многим)
Airplane.hasMany(Ticket);
Ticket.belongsTo(Airplane);

// Самолет <-> Рейс (один ко многим)
Airplane.hasMany(Flight);
Flight.belongsTo(Airplane);

module.exports = {
    Passenger,
    Purchase,
    Ticket,
    Airplane,
    Flight
};