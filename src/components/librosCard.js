import React from 'react'
import { Link } from 'react-router-dom'
import swal from "sweetalert";
import { Peticiones } from '../hooks/useFetch';
export const LibrosCard = ({data}) => {
    const handleDelete=async(id)=>{
        const resp = await Peticiones(`libro/${id}`,{}, "DELETE");
        const body = await resp.json();
        if (body.mensaje) {
            swal({
              title: "Correcto",
              text: "Libro eliminado correctamente",
              icon: "success",
              button: "OK",
            });
            setTimeout(function(){
                window.location.reload(1);
            }, 5000);
          } else {
            swal({
              title: "Error",
              text: "No se ha podido eliminar el libro",
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
                        <h5 className="card-tittle">Nombre :{data.nombre}</h5>
                        <p className="card-text">
                            <small className="text-muted">
                                cantidad :{data.cantidad}
                            </small>
                        </p>
                        <div style={{marginLeft:1}} className="row">
                            <Link className="btn btn-primary" to={`./libro/${data.id}`}>
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
