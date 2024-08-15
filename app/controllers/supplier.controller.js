const db = require('../config/db.config.js');
const Supplier = db.Supplier;

exports.create = (req, res) => {
    let supplier = {};

    try {
        supplier.name = req.body.name;
        supplier.contact = req.body.contact;
        supplier.address = req.body.address;

        Supplier.create(supplier).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Supplier with id = " + result.id,
                supplier: result,
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
    Supplier.findAll()
        .then(suppliers => {
            res.status(200).json({
                message: "Get all Suppliers' Infos Successfully!",
                suppliers: suppliers
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
    let supplierId = req.params.id;
    Supplier.findByPk(supplierId)
        .then(supplier => {
            res.status(200).json({
                message: "Successfully Get a Supplier with id = " + supplierId,
                supplier: supplier
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
        let supplierId = req.params.id;
        let supplier = await Supplier.findByPk(supplierId);

        if (!supplier) {
            res.status(404).json({
                message: "Not Found for updating a supplier with id = " + supplierId,
                supplier: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                name: req.body.name,
                contact: req.body.contact,
                address: req.body.address
            }
            let result = await Supplier.update(updatedObject, { returning: true, where: { id: supplierId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a supplier with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Supplier with id = " + supplierId,
                supplier: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a supplier with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let supplierId = req.params.id;
        let supplier = await Supplier.findByPk(supplierId);

        if (!supplier) {
            res.status(404).json({
                message: "Does Not exist a Supplier with id = " + supplierId,
                error: "404",
            });
        } else {
            await supplier.destroy();
            res.status(200).json({
                message: "Delete Successfully a Supplier with id = " + supplierId,
                supplier: supplier,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a supplier with id = " + req.params.id,
            error: error.message,
        });
    }
}
