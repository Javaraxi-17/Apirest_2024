module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('employee', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        salary: {
            type: Sequelize.FLOAT
        }
    });

    return Employee;
};
