import React from 'react'
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { Peticiones } from '../hooks/useFetch';
export const UsuarioCard = ({data}) => {
    const handleDelete=async(email)=>{
        const resp = await Peticiones(`usuario/${email}`,{}, "DELETE");
        const body = await resp.json();
        if (body.mensaje) {
            swal({
              title: "Correcto",
              text: "Usuario eliminado correctamente",
              icon: "success",
              button: "OK",
            });
            setTimeout(function(){
                window.location.reload(1);
            }, 5000);
          } else {
            swal({
              title: "Error",
              text: "No se ha podido eliminar el usuario",
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
                            Apellido: {data.apellidos}
                        </p>
                        <p className="card-text">
                            Email: {data.email}
                        </p>
                        <div style={{marginLeft:1}} className="row">
                            <Link className="btn btn-primary" to={`./usuarios/${data.email}`}>
                                Editar
                            </Link>
                            <button type="submit" className="btn btn-danger" onClick={()=>handleDelete(data.email)} >Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
