const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Passenger = sequelize.define('passenger', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    passport_data: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false // Отключение автоматически добавляемых createdAt и updatedAt
});

const Purchase = sequelize.define('purchase', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    ticket_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true, 
    }
}, {
    timestamps: false // Отключение автоматически добавляемых createdAt и updatedAt
});

const Ticket = sequelize.define('ticket', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    member_id: { 
        type: DataTypes.STRING,
        unique: true
    },
    flight_number: { 
        type: DataTypes.STRING,
        unique: true 
    },
    seat_number: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    cost: { 
        type: DataTypes.FLOAT 
    },
    airplane_number: { 
        type: DataTypes.STRING, 
        unique: true
    }
}, {
    timestamps: false // Отключение автоматически добавляемых createdAt и updatedAt
});

const Airplane = sequelize.define('airplane', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    airplane_number: { 
        type: DataTypes.STRING,
        unique: true 
    },
    model: { 
        type: DataTypes.STRING 
    },
    year: { 
        type: DataTypes.INTEGER 
    }
}, {
    timestamps: false // Отключение автоматически добавляемых createdAt и updatedAt
});

const Flight = sequelize.define('flight', {
    flight_number: { 
        type: DataTypes.STRING, 
        primaryKey: true,
        unique: true 
    },
    departure_date_time: { 
        type: DataTypes.DATE 
    },
    departure_place: { 
        type: DataTypes.STRING 
    },
    airplane_number: { 
        type: DataTypes.STRING,
        unique: true 
    }
}, {
    timestamps: false // Отключение автоматически добавляемых createdAt и updatedAt
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