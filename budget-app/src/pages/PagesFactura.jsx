import React from 'react';
import FormFactura from '../components/FormFactura';

function Factura() {

    return ( 
        <>
            <section className='container p-4 text-center'>
                <h2 className='text-4xl text-black mb-2 w-full font-semibold'>Crear Nueva Factura</h2>
                <p className='text-sm text-gray-400'>Las nuevas facturas que desee agregar serán visibles una vez agregue un nuevo proveedor</p>
            </section>
            <FormFactura />
        </>
    );
}

export default Factura;