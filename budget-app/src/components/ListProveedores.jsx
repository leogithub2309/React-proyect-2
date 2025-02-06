import React, { useState } from 'react';
import { helpHttp } from '../helpers/httpHelp';

function ListProveedores({ proveedores }) {

    const useFetch = helpHttp();
    
    const handleClick = (e, status) => {

        let id = e.target.dataset.id;

        let isConfirm = window.confirm("Está seguro de cambiar el status del proveedor?");

        if(isConfirm){
            useFetch.put(`http://localhost:3000/updateStatus/${id}`, {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                method: "PUT",
                body: {
                    status: status === '1' ? '0' : status
                }
            })
            .then((res) => {
                
                if(!res.err){
                    alert(`${res.description}`);
                    setTimeout(() => window.location.reload(), 2000);
                }

            }).catch((err) => console.error(err));
        }
        
    }
    
    return (
        <table className='table-auto w-10/12 mx-auto mt-5'>
            <thead className='border-b-2 border-gray-700 p-3'>
                <tr>
                    <th className='p-2 text-black'>Nombre</th>
                    <th className='p-2 text-black'>NIT</th>
                    <th className='p-2 text-black'>Cédula</th>
                    <th className='p-2 text-black'>Dirección</th>
                    <th className='p-2 text-black'>Teléfono</th>
                    <th className='p-2 text-black'>Factura</th>
                    <th className='p-2 text-black'>Status</th>
                    <th className='p-2 text-black'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {proveedores.length > 0 ? proveedores.map((el) => <tr key={el.nombre} className='border-b border-gray-300 text-center'>
                    <td className='p-3'>{el.nombre}</td>
                    <td className='p-3'>{el.nit}</td>
                    <td className='p-3'>{el.cedula}</td>
                    <td className='p-3'>{el.direccion}</td>
                    <td className='p-3'>{el.telefono}</td>
                    <td className='p-3'>{el.nroFactura}</td>
                    <td className='p-3'>
                        {parseInt(el.status) === 1 ? <span className='bg-teal-500 p-1 rounded text-white text-xs'>Activo</span> : <span className='bg-red-500 p-1 rounded text-white text-xs'>Inactivo</span>}
                    </td>
                    <td className='p-3'>
                        <button className="text-sm rounded-md bg-red-600 border-1 border-red-600 p-2 text-center cursor-pointer text-white transition hover:bg-red-700" data-id={el.proveedorid} onClick={(e) => handleClick(e, el.status)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 pointer-events-none">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </td>
                </tr>) : <tr><td colSpan={8}>No hay Resultados disponibles</td></tr>}
            </tbody>
        </table>
    );
}

export default ListProveedores;