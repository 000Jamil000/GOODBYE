const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING, 
        defaultValue: "USER"
    },
})

const Passenger = sequelize.define('passenger', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },


    full_name: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    passport_data: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true 
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY, // Используем DATEONLY для хранения только даты без времени
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
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
    },
    from_city: { 
        type: DataTypes.STRING 
    },
    to_city: { 
        type: DataTypes.STRING 
    },
    departure_date: { 
        type: DataTypes.DATE 
    },
    arrival_date: { 
        type: DataTypes.DATE 
    },
    departure_time: { 
        type: DataTypes.TIME 
    },
    arrival_time: { 
        type: DataTypes.TIME 
    },
    departure_time_back: { 
        type: DataTypes.TIME 
    },  
    arrival_time_back: { 
        type: DataTypes.TIME 
    },
    passenger_id: {
        type: DataTypes.INTEGER,

        references: {
          model: Passenger, // Имя связываемой таблицы
          key: 'id', // Поле в связываемой таблице
        },
    }
    
}, {
    timestamps: false // Отключение автоматически добавляемых createdAt и updatedAt
});




// const Ticket = sequelize.define('ticket', {
//     id: { 
//         type: DataTypes.INTEGER, 
//         primaryKey: true, 
//         autoIncrement: true 
//     },
//     member_id: { 
//         type: DataTypes.STRING,
//         unique: true
//     },
//     flight_number: { 
//         type: DataTypes.STRING,
//         unique: true 
//     },
//     seat_number: { 
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false
//     },
//     cost: { 
//         type: DataTypes.FLOAT 
//     },
//     airplane_number: { 
//         type: DataTypes.STRING, 
//         unique: true
//     }
// }, {
//     timestamps: false // Отключение автоматически добавляемых createdAt и updatedAt
// });

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
    timestamps: false 
});

Ticket.belongsTo(Passenger, {
    foreignKey: 'passenegr_id', 
    as: 'passenger', 
  });
  
Passenger.belongsTo(User, { foreignKey: 'userId' }); 
User.hasOne(Passenger, { foreignKey: 'userId' });

Ticket.belongsTo(Flight);
Flight.hasMany(Ticket);

// Билет <-> Самолет (один ко многим)
Airplane.hasMany(Ticket);
Ticket.belongsTo(Airplane);

// Самолет <-> Рейс (один ко многим)
Airplane.hasMany(Flight);
Flight.belongsTo(Airplane);

module.exports = {
    User,
    Passenger,
    Ticket,
    Airplane,
    Flight
};