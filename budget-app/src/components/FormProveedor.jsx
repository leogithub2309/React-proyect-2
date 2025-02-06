import React, { useEffect, useState } from 'react';
import { helpHttp } from '../helpers/httpHelp';
import { useForm } from '../hooks/useForm';

import { useNavigate } from 'react-router-dom';

/*
regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
regexComments = /^.{1,255}$/;

*/

let initialForm = {
    nombre: '',
    nit: '',
    cedula: '',
    direccion: '',
    telefono: '',
    facturaid: '',
    status: ''
}

const validationsForm = (form) => {

    let errors = {};

    if(!form.nombre.trim()){
        errors.nombre = "El campo 'nombre' es requerido";
    }else if(!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.nombre)){
        errors.nombre = "El patron del campo 'nombre' es inválido";
    }

    if(!form.nit.trim()){//^([\N])-?(\d+) || ^(\d+)\-?([\dkK])
        errors.nit = "El campo 'nit' es requerido";
    }else if(!/^([\N])-?(\d+)+$/.test(form.nit)){
        errors.nit = "El campo 'nit' no tiene un patron válido";
    }

    if(!form.cedula.trim()){
        errors.cedula = "El campo 'cedula' es requerido";
    }else if(!/[0-9]+$/.test(form.cedula)){
        errors.cedula = "El campo 'cedula' solo acepta números";
    }

    if(!form.direccion.trim()){
        errors.direccion = "El campo 'direccion' es requerido";
    }else if(!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]+$/.test(form.direccion)){
        errors.direccion = "El patron del campo 'direccion' solo debe tener números, letras y espacios en blanco";
    }

    if(!form.telefono.trim()){
        errors.telefono = "El campo 'telefono' es requerido";
    }else if(!/[0-9]+$/.test(form.telefono)){
        errors.telefono = "El campo 'telefono' solo acepta números";
    }

    if(!form.facturaid.trim()){
        errors.facturaid = "El campo 'faacturaid' es requerido";
    }

    if(!form.status.trim()){
        errors.status = "El campo 'status' es requerido";
    }


    return errors;
}

function FormProveedor() {
    
    const useFetch = helpHttp();

    const [facturas, setFacturas] = useState([]);

    const navigate = useNavigate();

    const {form, errors, handleChange, handleBlur} = useForm(initialForm, validationsForm);

    useEffect(() => {

        useFetch.get("http://localhost:3000/facturas", {method: "GET"})
        .then((response) => {
            setFacturas(response.data);
        }).catch((err) => console.error(err));
        
    }, []);

    const handleSubmit = (e) => {

        e.preventDefault();

        useFetch.post("http://localhost:3000/crearProveedor", {
            headers: {
                'Content-Type': "application/json; charset=UTF-8"
            },
            method: "POST",
            body: form
        }).then((response) => {
            //console.log(response);
            alert(`${response.description}`);
            setTimeout(() => {
                navigate("/listaProveedores");
            }, 2000);

        }).catch((err) => console.error(err));
    }
    
    
    return ( 
        <form autoComplete='off' className='w-full' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className='block text-sm mb-2'>Nombre Completo {errors.nombre && <span className='text-red-600 text-sm font-bold'>*</span>}</label>
                <input type="text" name="nombre" id="nombre" className='outline-2 outline-offset-2 outline-gray-300 rounded px-2 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' placeholder='Nombre del Proveedor' onChange={handleChange} onBlur={handleBlur}/>
                {errors &&  <span className='text-red-600 text-sm px-2 py-1 font-semibold'>{errors.nombre}</span> }
            </div>
            <div className="flex flex-row lg:flex-row md:flex-row sm:flex-col items-center gap-4 justify-center">
                <div className="mb-3 w-full">
                    <label htmlFor="nit" className='block text-sm mb-2'>NIT {errors.nit && <span className='text-red-600 text-sm font-bold'>*</span>}</label>
                    <input type="text" name="nit" id="nit" className='outline-2 outline-offset-2 outline-gray-300 rounded px-2 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' maxLength={10} placeholder='ej: N-12345678' onChange={handleChange} onBlur={handleBlur}/>
                    {errors &&  <span className='text-red-600 text-sm px-2 py-1 font-semibold'>{errors.nit}</span> }
                </div>
                <div className="mb-3 w-full">
                    <label htmlFor="cedula" className='block text-sm mb-2'>Cédula {errors.cedula && <span className='text-red-600 text-sm font-bold'>*</span>}</label>
                    <input type="text" name="cedula" id="cedula" className='outline-2 outline-offset-2 outline-gray-300 rounded px-2 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' maxLength={8} placeholder='ej: 12345678' onChange={handleChange} onBlur={handleBlur}/>
                    {errors &&  <span className='text-red-600 text-sm px-2 py-1 font-semibold'>{errors.cedula}</span> }
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="direccion" className='block text-sm mb-2'>Dirección {errors.direccion && <span className='text-red-600 text-sm font-bold'>*</span>}</label>
                <input type="text" name="direccion" id="direccion" className='outline-2 outline-offset-2 outline-gray-300 rounded px-2 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' placeholder='Dirección de Habitación' onChange={handleChange} onBlur={handleBlur}/>
                {errors &&  <span className='text-red-600 text-sm px-2 py-1 font-semibold'>{errors.direccion}</span> }
            </div><div className="mb-3">
                <label htmlFor="telefono" className='block text-sm mb-2'>Teléfono {errors.telefono && <span className='text-red-600 text-sm font-bold'>*</span>}</label>
                <input type="text" name="telefono" id="telefono" className='outline-2 outline-offset-2 outline-gray-300 rounded px-2 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' placeholder='ej: 5559430843' maxLength={12} onChange={handleChange} onBlur={handleBlur}/>
                {errors &&  <span className='text-red-600 text-sm px-2 py-1 font-semibold'>{errors.telefono}</span> }
            </div>
            <div className="mb-5">
                <label htmlFor="facturaid" className='block text-sm mb-2'>Factura {errors.facturaid && <span className='text-red-600 text-sm font-bold'>*</span>}</label>
                <select name="facturaid" id="facturaid" className='outline-2 outline-offset-2 outline-gray-300 rounded px-4 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' onChange={handleChange} onBlur={handleBlur}>
                    <option value="--" defaultValue={"--"}>Elige una factura</option>
                    {facturas.length !== 0 ? facturas.map((el) => <option key={el.facturaid} value={el.facturaid}>{el.facturaid} - {el.tipo}</option> ) : <option value="">No hay Resultados Disponibles</option>}
                </select>
                {errors &&  <span className='text-red-600 text-sm px-2 py-1 font-semibold'>{errors.facturaid}</span> }
            </div>
            <div className="mb-5">
            <label htmlFor="status" className='block text-sm mb-2'>Status {errors.status &&   <span className='text-red-600 text-sm font-bold'>*</span>}</label>
                <select name="status" id="status" className='outline-2 outline-offset-2 outline-gray-300 rounded px-4 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' onChange={handleChange} onBlur={handleBlur}>
                    <option value="--" defaultValue={"--"}>Elige una opción</option>
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
                {errors &&  <span className='text-red-600 text-sm px-2 py-1 font-semibold'>{errors.status}</span> }
            </div>
            <button type="submit" className='w-full px-2 py-3 rounded-md bg-teal-600 text-white flex items-center justify-center border-1 borde-teal-600 cursor-pointer transition hover:bg-teal-800'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Agregar
            </button>
        </form>
    );
}

export default FormProveedor;