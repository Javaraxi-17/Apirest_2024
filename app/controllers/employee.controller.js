const db = require('../config/db.config.js');
const Employee = db.Employee;

exports.create = (req, res) => {
    let employee = {};

    try {
        employee.firstname = req.body.firstname;
        employee.lastname = req.body.lastname;
        employee.role = req.body.role;
        employee.salary = req.body.salary;

        Employee.create(employee).then(result => {
            res.status(200).json({
                message: "Upload Successfully an Employee with id = " + result.id,
                employee: result,
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
    Employee.findAll()
        .then(employees => {
            res.status(200).json({
                message: "Get all Employees' Infos Successfully!",
                employees: employees
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
    let employeeId = req.params.id;
    Employee.findByPk(employeeId)
        .then(employee => {
            res.status(200).json({
                message: "Successfully Get an Employee with id = " + employeeId,
                employee: employee
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
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({
                message: "Not Found for updating an employee with id = " + employeeId,
                employee: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: req.body.role,
                salary: req.body.salary
            }
            let result = await Employee.update(updatedObject, { returning: true, where: { id: employeeId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update an employee with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully an Employee with id = " + employeeId,
                employee: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update an employee with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({
                message: "Does Not exist an Employee with id = " + employeeId,
                error: "404",
            });
        } else {
            await employee.destroy();
            res.status(200).json({
                message: "Delete Successfully an Employee with id = " + employeeId,
                employee: employee,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete an employee with id = " + req.params.id,
            error: error.message,
        });
    }
}
