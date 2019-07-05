const Sequelize = require('sequelize');

const sequelize = new Sequelize('reservations', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Reservations_table = sequelize.define('reservations_table', {
    // attributes
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    restaurant_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reservation_year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reservation_date: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reservation_month: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reservation_hour: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reservation_min: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    available_seats: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    restaurant_total_booking_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
  });

  const Reservations_user = sequelize.define('reservations_user', {
    // attributes
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    restaurant_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reservation_year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reservation_month: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reservation_date: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reservation_hour: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reservation_min: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    party_size: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
  });


  Reservations_table.sync();
  Reservations_user.sync();
  module.exports.Reservations_table = Reservations_table;
  module.exports.Reservations_user = Reservations_user;