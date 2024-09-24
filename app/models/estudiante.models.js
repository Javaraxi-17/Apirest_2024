module.exports = (sequelize, Sequelize) => {
    const Estudiante = sequelize.define('estudiante', {
        Id_estudiante: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_completo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Tutor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Fecha_nacimiento: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        Genero: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Ultimo_grado_aprobado: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Estudiante;
};
