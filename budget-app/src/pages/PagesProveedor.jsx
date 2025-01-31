import React from 'react';
import FormProveedor from '../components/FormProveedor';

function PageProveedor() {
    return (
        <section className='flex flex-row lg:flex-row md:flex-row sm:flex-col p-5 gap-5'>
            <article className='w-full'>
                <h2 className='text-5xl text-zinc-900 text-start mb-4'>Agrergar Proveedor</h2>
                <p className="text-sm text-gray-500">Los campos requeridos están marcados con un <b className='text-red-600'>*</b></p>
                <p>Todos los proveedores que agregue seran visibles en una sección aparte llamada proveedores arriba en el menú principal</p>
            </article>
            <FormProveedor />
        </section>
    );
}

export default PageProveedor;