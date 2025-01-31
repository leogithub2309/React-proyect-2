import { pool } from "../database.js";
import circularJSON from 'json-stringify-safe';

const mainRoute = async (req, res) => {
    
    return res.send(circularJSON({
        title: "Página Principal",
        status: 200
    },  null, 2));
}


const agregarFactura = async (req, res) => {
    
    try {
        
        let {tipo, nroFactura} = req.body;

        if(!tipo || !nroFactura) {
            return res.send({
                title: "Error",
                description: "Los campos del formulario no pueden estar vacios",
                status: res.status(404)
            });
        }

        const [data] = await pool.query("SELECT * FROM facturas");

        const verifyFactura = data.find((el) => el.nroFactura === nroFactura);

        if(verifyFactura){
            return res.status(404).send({
                title: "Error",
                description: "La factura que intenta agregar ya existe, por favor ingrese otro número de factura"
            });
        }

        let sql = `INSERT INTO facturas SET ?`;

        const [result] = await pool.query(sql, {tipo, nroFactura});

        return res.send(circularJSON({
            title: "Succes",
            description: "Se agregó una nueva factura correctamente",
            data: result
        }, null, 2));

    } catch (error) {
        return res.status(404).send({
            title: "Error",
            status: 404,
            error
        });
    }
}

const getFacturas = async (req, res) => {

    try {

        const [data] = await pool.query("SELECT * FROM facturas");

        return res.status(200).json({title: "Success", data});
        
    } catch (error) {
        return res.status(404).send({
            title: "Error",
            status: 404,
            error
        });
    }
}

const createProveedor = async (req, res) => {

    try {

        let {nombre, nit, cedula, direccion, telefono, facturaid} = req.body;

        if(!nombre || !nit || !cedula || !direccion || !telefono || !facturaid){
            return res.status(404).send({
                title: "Error",
                status: 404,
                description: "Los campos del formulario no pueden estar vacíos"
            });
        }

        let sql = "INSERT INTO proveedor SET ?";

        const [result] = await pool.query(sql, {nombre, nit, cedula, direccion, telefono, facturaid});

        if(result){
            return res.send(circularJSON({
                title: "Succes",
                description: "El nuevo proveedor se agregó correctamente",
                data: result
            }, null, 2));
        }
        
    } catch (error) {
        return res.status(404).send({
            title: "Error",
            status: 404,
            error
        });
    }
}

const getProveedores = async (req, res) => {

    try {
        
        let sql = `SELECT p.nombre, p.nit, p.cedula, p.direccion, p.telefono, f.tipo, f.nroFactura, f.fechaCreacion FROM proveedor p INNER JOIN facturas f ON p.facturaid=f.facturaid`;

        const [data] = await pool.query(sql);

        if(data) return res.status(200).send({
            title: "Succes",
            data
        });

    } catch (error) {
        return res.status(404).send({
            title: "Error",
            status: 404,
            error
        });
    }
}


const queryDB = {
    mainRoute,
    agregarFactura,
    getFacturas,
    createProveedor,
    getProveedores
}

export default queryDB;