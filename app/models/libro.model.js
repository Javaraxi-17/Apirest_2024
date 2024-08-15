module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define('libro', {
        codigo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING(60),
            allowNull: false,
        },
        editorial: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
        autor: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
        genero: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        paisAutor: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        numeroPaginas: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        añoEdicion: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        precio: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }
    });

    return Libro;
};
