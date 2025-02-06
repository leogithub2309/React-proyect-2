import React, { useEffect, useState } from 'react';
import ListProveedores from '../components/ListProveedores';
import { helpHttp } from '../helpers/httpHelp';

const PagesListProveedores = () => {

    let url = "http://localhost:3000/proveedores"

    const [proveedores, setProveedores] = useState([]);

    const useFetch = helpHttp();

    useEffect(() => {

        useFetch.get(url, {method: "GET"})
        .then((res) => {
            //console.info(res);
            setProveedores(res.data);
        }).catch((err) => console.error(err));
        
    }, [url]);

    return (
        <>
            <h2 className='text-center text-5xl font-semibold text-zinc-900'>Lista de Proveedores</h2>
            <ListProveedores proveedores={proveedores}/>
        </>
    );
}
 
export default PagesListProveedores;