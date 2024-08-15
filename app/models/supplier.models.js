module.exports = (sequelize, Sequelize) => {
    const Supplier = sequelize.define('supplier', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        contact: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        }
    });

    return Supplier;
};
