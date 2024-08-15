module.exports = (sequelize, Sequelize) => {
    const Music = sequelize.define('music', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        songName: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        artist: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.INTEGER
        },
        extension: {
            type: Sequelize.STRING
        },
        album: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        }
    });

    return Music;
};
