const db = require('../config/db.config.js');
const Notas = db.Notas;

exports.create = (req, res) => {
    let notas = {};

    try {
        notas.id_estudiante = req.body.id_estudiante;
        notas.FechaIngreso = req.body.FechaIngreso;
        notas.id_curso = req.body.id_curso;
        notas.Notatotal = req.body.Notatotal;
        notas.Status_curso = req.body.Status_curso;

        Notas.create(notas).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Notas with id = " + result.id_nota,
                notas: result,
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
    Notas.findAll()
        .then(notasList => {
            res.status(200).json({
                message: "Get all Notas' Infos Successfully!",
                notas: notasList
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
    let notasId = req.params.id;
    Notas.findByPk(notasId)
        .then(notas => {
            res.status(200).json({
                message: "Successfully Get a Notas with id = " + notasId,
                notas: notas
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
        let notasId = req.params.id;
        let notas = await Notas.findByPk(notasId);

        if (!notas) {
            res.status(404).json({
                message: "Not Found for updating a notas with id = " + notasId,
                notas: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                id_estudiante: req.body.id_estudiante,
                FechaIngreso: req.body.FechaIngreso,
                id_curso: req.body.id_curso,
                Notatotal: req.body.Notatotal,
                Status_curso: req.body.Status_curso
            }
            let result = await Notas.update(updatedObject, { returning: true, where: { id: notasId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a notas with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Notas with id = " + notasId,
                notas: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a notas with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let notasId = req.params.id;
        let notas = await Notas.findByPk(notasId);

        if (!notas) {
            res.status(404).json({
                message: "Does Not exist a Notas with id = " + notasId,
                error: "404",
            });
        } else {
            await notas.destroy();
            res.status(200).json({
                message: "Delete Successfully a Notas with id = " + notasId,
                notas: notas,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a notas with id = " + req.params.id,
            error: error.message,
        });
    }
}

