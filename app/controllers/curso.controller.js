const db = require('../config/db.config.js');
const Curso = db.Curso;

exports.create = (req, res) => {
    let curso = {};

    try {
        curso.firstname = req.body.firstname;
        curso.lastname = req.body.lastname;
        curso.role = req.body.role;
        curso.salary = req.body.salary;

        Curso.create(curso).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Curso with id = " + result.id,
                curso: result,
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
    Curso.findAll()
        .then(cursos => {
            res.status(200).json({
                message: "Get all Cursos' Infos Successfully!",
                cursos: cursos
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
    let cursoId = req.params.id;
    Curso.findByPk(cursoId)
        .then(curso => {
            res.status(200).json({
                message: "Successfully Get a Curso with id = " + cursoId,
                curso: curso
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
        let cursoId = req.params.id;
        let curso = await Curso.findByPk(cursoId);

        if (!curso) {
            res.status(404).json({
                message: "Not Found for updating a curso with id = " + cursoId,
                curso: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: req.body.role,
                salary: req.body.salary
            }
            let result = await Curso.update(updatedObject, { returning: true, where: { id: cursoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a curso with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Curso with id = " + cursoId,
                curso: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a curso with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let cursoId = req.params.id;
        let curso = await Curso.findByPk(cursoId);

        if (!curso) {
            res.status(404).json({
                message: "Does Not exist a Curso with id = " + cursoId,
                error: "404",
            });
        } else {
            await curso.destroy();
            res.status(200).json({
                message: "Delete Successfully a Curso with id = " + cursoId,
                curso: curso,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a curso with id = " + req.params.id,
            error: error.message,
        });
    }
}
