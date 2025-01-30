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



const queryDB = {
    mainRoute,
    agregarFactura,
    getFacturas
}

export default queryDB;