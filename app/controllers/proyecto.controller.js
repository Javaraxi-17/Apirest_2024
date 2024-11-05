const db = require('../config/db.config.js');
const Proyecto = db.Proyecto;


// Crear un nuevo proyecto
exports.create = (req, res) => {
    let proyecto = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        completada: req.body.completada || false,
        fecha_vencimiento: req.body.fecha_vencimiento,
        prioridad: req.body.prioridad || 'media',
        asignado_a: req.body.asignado_a,
        categoria: req.body.categoria,
        costo_proyecto: req.body.costo_proyecto,
        pagado: req.body.pagado || false
    };

    Proyecto.create(proyecto)
        .then(result => {
            res.status(201).json({
                message: "Proyecto creado exitosamente",
                proyecto: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al crear el proyecto",
                error: error.message
            });
        });
};

// Obtener todos los proyectos
exports.retrieveAll = (req, res) => {
    Proyecto.findAll()
        .then(proyectos => {
            res.status(200).json({
                message: "Proyectos obtenidos exitosamente",
                proyectos: proyectos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los proyectos",
                error: error.message
            });
        });
};

// Obtener un proyecto por ID
exports.getById = (req, res) => {
    let proyectoId = req.params.id;
    Proyecto.findByPk(proyectoId)
        .then(proyecto => {
            if (!proyecto) {
                return res.status(404).json({
                    message: "Proyecto no encontrado con id = " + proyectoId
                });
            }
            res.status(200).json({
                message: "Proyecto obtenido exitosamente",
                proyecto: proyecto
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el proyecto",
                error: error.message
            });
        });
};

// Actualizar un proyecto por ID
exports.updateById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            return res.status(404).json({
                message: "No se encontró el proyecto para actualizar con id = " + proyectoId
            });
        }

        let updatedObject = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            completada: req.body.completada,
            fecha_vencimiento: req.body.fecha_vencimiento,
            prioridad: req.body.prioridad,
            asignado_a: req.body.asignado_a,
            categoria: req.body.categoria,
            costo_proyecto: req.body.costo_proyecto,
            pagado: req.body.pagado
        };

        let result = await Proyecto.update(updatedObject, { returning: true, where: { id: proyectoId } });

        res.status(200).json({
            message: "Proyecto actualizado exitosamente",
            proyecto: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el proyecto",
            error: error.message
        });
    }
};

// Eliminar un proyecto por ID
exports.deleteById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            return res.status(404).json({
                message: "No existe un proyecto con id = " + proyectoId
            });
        }

        await proyecto.destroy();
        res.status(200).json({
            message: "Proyecto eliminado exitosamente",
            proyecto: proyecto
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el proyecto",
            error: error.message
        });
    }
};
