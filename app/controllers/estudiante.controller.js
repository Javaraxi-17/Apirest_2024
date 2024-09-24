const db = require('../config/db.config.js');
const Estudiante = db.Estudiante;

exports.create = (req, res) => {
    let estudiante = {};

    try {
        estudiante.firstname = req.body.firstname;
        estudiante.lastname = req.body.lastname;
        estudiante.role = req.body.role;
        estudiante.salary = req.body.salary;

        Estudiante.create(estudiante).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Estudiante with id = " + result.id,
                estudiante: result,
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
    Estudiante.findAll()
        .then(estudiantes => {
            res.status(200).json({
                message: "Get all Estudiantes' Infos Successfully!",
                estudiantes: estudiantes
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
    let estudianteId = req.params.id;
    Estudiante.findByPk(estudianteId)
        .then(estudiante => {
            res.status(200).json({
                message: "Successfully Get a Estudiante with id = " + estudianteId,
                estudiante: estudiante
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
        let estudianteId = req.params.id;
        let estudiante = await Estudiante.findByPk(estudianteId);

        if (!estudiante) {
            res.status(404).json({
                message: "Not Found for updating a estudiante with id = " + estudianteId,
                estudiante: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: req.body.role,
                salary: req.body.salary
            }
            let result = await Estudiante.update(updatedObject, { returning: true, where: { id: estudianteId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a estudiante with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Estudiante with id = " + estudianteId,
                estudiante: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a estudiante with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let estudianteId = req.params.id;
        let estudiante = await Estudiante.findByPk(estudianteId);

        if (!estudiante) {
            res.status(404).json({
                message: "Does Not exist a Estudiante with id = " + estudianteId,
                error: "404",
            });
        } else {
            await estudiante.destroy();
            res.status(200).json({
                message: "Delete Successfully a Estudiante with id = " + estudianteId,
                estudiante: estudiante,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a estudiante with id = " + req.params.id,
            error: error.message,
        });
    }
}
