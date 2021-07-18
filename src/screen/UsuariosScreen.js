import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { Peticiones } from "../hooks/useFetch";

export const UsuariosScreen = () => {
  useEffect(() => {
    TraerUsuario();
  }, []);
  const { usuarioEmail } = useParams();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const TraerUsuario = async () => {
    const resp = await Peticiones(`usuario/${usuarioEmail}`);
    const usuario = await resp.json();
    console.log(usuario);
    setNombre(usuario.usuario[0].nombre);
    setApellido(usuario.usuario[0].apellidos);
    setEmail(usuario.usuario[0].email);
  };
  const handleSubmit = async () => {
    setNombre(nombre.trim());
    setApellido(apellido.trim());
    setEmail(email.trim());
    if (nombre!=="" && apellido!=="" && email!=="") {
        const resp = await Peticiones(`usuario/actualizar/${usuarioEmail}`, { nombre, apellidos:apellido,email }, "PUT");
        const body = await resp.json();
        if(body.mensaje){
            swal({
                title:"Correcto",
                text:"Usuaio actualizado correctamente",
                icon:"success",
                button:"OK"
            })
        }else{
            swal({
                title:"Error",
                text:"No se ha podido actualizar el usuario",
                icon:"error",
                button:"OK"
            })
        }
    } else {
      swal({
        title: "Error",
        text: "Los campos no pueden estar vacios",
        icon: "error",
        button: "OK",
      });
    }
  };
  return (
    <div>
      <h2>Actualización de Usuarios</h2>
      <hr />
      <div>
        <div className="row">
          <input
            type="text"
            className="col-md-6 form-control mt-2"
            placeholder="Nombre del usuario"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
          <input
            type="text"
            className="col-md-6 form-control mt-2"
            placeholder="Apellidos"
            onChange={(e) => setApellido(e.target.value)}
            value={apellido}
          />
        </div>
        <div className="row">
          <input
            type="email"
            className="col-md-6 form-control mt-2"
            placeholder="Email del usuario"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            type="submit"
            className="col-md-6 btn btn-primary mt-2 form-control"
            onClick={handleSubmit}
          >
            Acutalizar Usuario
          </button>
        </div>
      </div>
    </div>
  );
};
