const db = require('../config/db.config.js');
const Music = db.Music;

exports.create = (req, res) => {
    let music = {};

    try {
        music.songName = req.body.songName;
        music.description = req.body.description;
        music.artist = req.body.artist;
        music.duration = req.body.duration;
        music.extension = req.body.extension;
        music.album = req.body.album;
        music.year = req.body.year;

        Music.create(music).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Music with id = " + result.id,
                music: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAll = (req, res) => {
    Music.findAll()
        .then(musics => {
            res.status(200).json({
                message: "Get all Music's Infos Successfully!",
                musics: musics
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getById = (req, res) => {
    let musicId = req.params.id;
    Music.findByPk(musicId)
        .then(music => {
            res.status(200).json({
                message: "Successfully Get a Music with id = " + musicId,
                music: music
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let musicId = req.params.id;
        let music = await Music.findByPk(musicId);

        if (!music) {
            res.status(404).json({
                message: "Not Found for updating a music with id = " + musicId,
                music: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                songName: req.body.songName,
                description: req.body.description,
                artist: req.body.artist,
                duration: req.body.duration,
                extension: req.body.extension,
                album: req.body.album,
                year: req.body.year
            }
            let result = await Music.update(updatedObject, { returning: true, where: { id: musicId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a music with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Music with id = " + musicId,
                music: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a music with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let musicId = req.params.id;
        let music = await Music.findByPk(musicId);

        if (!music) {
            res.status(404).json({
                message: "Does Not exist a Music with id = " + musicId,
                error: "404",
            });
        } else {
            await music.destroy();
            res.status(200).json({
                message: "Delete Successfully a Music with id = " + musicId,
                music: music,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a music with id = " + req.params.id,
            error: error.message,
        });
    }
}
