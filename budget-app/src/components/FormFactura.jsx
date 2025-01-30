import React, { useRef, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { helpHttp } from '../helpers/httpHelp';
import "../App.css";

const initalForm = {
    tipo: '',
    nroFactura: ''
}

const generateRandomNumbers = () => {
    let numberCase = "0123456789101130478201", 
        generateFactura = "";
    
    for(let i=0; i<10; i++){
        generateFactura += numberCase[parseInt(Math.random()*numberCase.length)];
    }

    return generateFactura;
}

const validationsForm = (form) => {

    let errors = {};

    if(!form.tipo.trim()){
        errors.tipo = "El campo 'Descripcion' es requerido";
    }

    if(!form.nroFactura.trim()){
        errors.nroFactura = "El campo 'Número Factura' es requerido";
    }else if(form.nroFactura.length > 10){
        errors.nroFactura = "El número de factura solo debe tener 10 números como maximo";
    }else if(!/^[0-9]+$/.test(form.nroFactura)){
        errors.nroFactura = "El patron del campo 'Número Factura' es inválido";
    }

    return errors;
}


function FormFactura() {

    const {form, errors, handleChange, handleBlur} = useForm(initalForm, validationsForm);

    const useFetch = helpHttp();

    const generateFactura = (e) => {
        e.target.previousElementSibling.focus();
        e.target.previousElementSibling.value = generateRandomNumbers();
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        if(!form.tipo || !form.nroFactura) return;

        useFetch.post("http://localhost:3000/crearFactura", {
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            method: "POST",
            body: form
        
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((err) => console.error(err));
    }   

    return (
        <form className='shadow-md w-2/4 mx-auto p-3' onSubmit={handleSubmit} autoComplete='off'>
            <div className="mb-3">
                <label htmlFor="tipo" className='block text-sm mb-2'>Descripcion Factura</label>
                <input type="text" name="tipo" id="tipo" className='outline-2 outline-offset-2 outline-gray-300 rounded px-2 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' placeholder='Detalles de la Factura' onChange={handleChange} onBlur={handleBlur} value={form.tipo}/>
                {errors && <span className='text-sm text-red-600 py-1 text-start'>{errors.tipo}</span> }
            </div>
            <div className="mb-7 relative">
                <label htmlFor="nroFactura" className='block text-sm mb-2'>Número Factura</label>
                <div>
                    <input type="text" name="nroFactura" id="nroFactura" className='outline-2 outline-offset-2 outline-gray-300 rounded px-2 py-3 text-sm text-black bg-gray-100 focus:bg-white w-full transition focus:outline-teal-600' placeholder='Número Factura' onChange={handleChange} onBlur={handleBlur} value={form.nroFactura} />
                    <button className='p-1 outline-none bg-transparent border-none cursor-pointer text-black absolute top-8 right-1' onClick={generateFactura}>Generate</button>
                </div>
                {errors && <span className='text-sm text-red-600 py-1 text-start'>{errors.nroFactura}</span> }
            </div>
            <button type="submit" className='bg-teal-600 text-white p-2 text-center flex gap-2 boder-teal-600 cursor-pointer rounded-md transition hover:bg-teal-800 disabled:cursor-not-allowed' disabled={Object.keys(errors).length > 0}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                </svg>
                Agregar
            </button>
        </form>
    );
}

export default FormFactura;