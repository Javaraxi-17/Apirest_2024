const db = require('../config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
    let libro = {};

    try {
        libro.nombre = req.body.nombre;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.paisAutor = req.body.paisAutor;
        libro.numeroPaginas = req.body.numeroPaginas;
        libro.añoEdicion = req.body.añoEdicion;
        libro.precio = req.body.precio;

        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con id = " + result.id,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el libro!",
            error: error.message
        });
    }
}

exports.retrieveAll = (req, res) => {
    Libro.findAll()
        .then(libros => {
            res.status(200).json({
                message: "Todos los libros obtenidos exitosamente!",
                libros: libros
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los libros!",
                error: error
            });
        });
}

exports.getById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "Libro obtenido exitosamente con id = " + libroId,
                libro: libro
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el libro!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                paisAutor: req.body.paisAutor,
                numeroPaginas: req.body.numeroPaginas,
                añoEdicion: req.body.añoEdicion,
                precio: req.body.precio
            }
            let result = await Libro.update(updatedObject, { returning: true, where: { id: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el libro con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Libro actualizado exitosamente con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el libro con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el libro con id = " + req.params.id,
            error: error.message,
        });
    }
}
