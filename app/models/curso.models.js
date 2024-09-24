module.exports = (sequelize, Sequelize) => {
    const Curso = sequelize.define('curso', {
        id_curso: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_curso: {
            type: Sequelize.STRING,
            allowNull: false
        },
        horario_inicio: {
            type: Sequelize.TIME,
            allowNull: false
        },
        horario_fin: {
            type: Sequelize.TIME,
            allowNull: false
        },
        jornada: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Curso;
};
