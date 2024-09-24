module.exports = (sequelize, Sequelize) => {
    const Notas = sequelize.define('notas', {
        id_nota: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_estudiante: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        FechaIngreso: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        id_curso: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Notatotal: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        Status_curso: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Notas;
};
