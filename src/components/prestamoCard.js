import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { Peticiones } from '../hooks/useFetch';

export const PrestamoCard = ({data}) => {
    console.log(data);
    useEffect(() => {
        TraerInfo();
    }, []);
    const [libro, setLibro] = useState([])
    const [usuario, setUsuario] = useState([])

    const TraerInfo=async()=>{
        const resp = await Peticiones(`usuario/loc/${data.id_usuario}`);
        const usuarios = await resp.json();
        setUsuario(usuarios.usuario[0])
        const resp1 = await Peticiones(`libro/${data.id_libro}`);
        const libros = await resp1.json();
        setLibro(libros.success[0])
    }

    const handleDelete=async(id)=>{
        const resp = await Peticiones(`prestamo/${id}`,{}, "DELETE");
        const body = await resp.json();
        if (body.mensaje) {
            swal({
              title: "Correcto",
              text: "Prestamo eliminado correctamente",
              icon: "success",
              button: "OK",
            });
            setTimeout(function(){
                window.location.reload(1);
            }, 5000);
          } else {
            swal({
              title: "Error",
              text: "No se ha podido eliminar el prestamo",
              icon: "error",
              button: "OK",
            });
          }
    }

    return (
        <div className="card ms-3 mr-5 mt-2" style={{marginLeft:20,width:300,maxHeight:200}}>
            <div className="row no-gutters">
                <div className="col-md-12">
                    <div className="card-body">
                        <h5 className="card-tittle">Prestamo :{data.id}</h5>
                        <p className="card-text">
                            Nombre Usuario :{usuario.nombre}
                        </p>
                        <p className="card-text">
                            Nombre Libro :{libro.nombre}
                        </p>
                        <div style={{marginLeft:1}} className="row">
                            <Link className="btn btn-primary" to={`./prestamo/${data.id}`}>
                                Editar
                            </Link>
                            <button type="submit" className="btn btn-danger" onClick={()=>handleDelete(data.id)} >Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
