import React from 'react';

function FormProveedor() {
    return ( 
        <form autoComplete='off' className='w-full'>
            <div className="mb-3">
                <label htmlFor="tipo" className='block text-sm mb-2'>Descripcion Factura</label>
                <input type="text" name="tipo" id="tipo" className='outline-2 outline-offset-2 outline-gray-300 rounded px-2 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' placeholder='Detalles de la Factura'/>
            </div>
        </form>
    );
}

export default FormProveedor;