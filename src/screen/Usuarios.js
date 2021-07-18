import React,{useState,useEffect} from "react";
import swal from 'sweetalert';
import { UsuarioCard } from "../components/usuarioCard";
import {Peticiones} from '../hooks/useFetch';
export const Usuarios = () => {
    useEffect(() => {
        TraerUsuarios();
    }, [])

    const TraerUsuarios=async()=>{
        const resp = await Peticiones("usuario");
        const usuarios = await resp.json();
        setUsuarios(usuarios.usuario);
    }

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    const handleSubmit=async()=>{
        setNombre(nombre.trim());
        setApellido(apellido.trim());
        setEmail(email.trim());
        setPassword(password.trim());
        setRepeatPassword(repeatPassword.trim());
        if(nombre!=="" && apellido!=="" && email!=="" && password!=="" && repeatPassword!==""  ){
          if(password===repeatPassword){
              const resp = await Peticiones("usuario", { nombre, apellidos:apellido,email,contra:password }, "POST");
              const body = await resp.json();
              if (body.success) {
                  swal({
                    title: "Correcto",
                    text: "Usuario creado correctamente",
                    icon: "success",
                    button: "OK",
                  });
                  window.location.reload();
                } else {
                  swal({
                    title: "Error",
                    text: "No se ha podido crear el usuario",
                    icon: "error",
                    button: "OK",
                  });
              }
          }else{
              swal({
                  title: "Error",
                  text: "Las contraseñas deben ser iguales",
                  icon: "error",
                  button: "OK",
                });
          }
        }else{
          swal({
            title: "Error",
            text: "Los campos no pueden estar vacios",
            icon: "error",
            button: "OK",
          });
        }
    }
  return (
    <div>
      <h1>Usuarios Screen</h1>
      <hr />
      <div>
        <h2>Registro de Usuarios</h2>
        <hr />
        <div>
          <div className="row">
            <input
              type="text"
              className="col-md-6 form-control mt-2"
              placeholder="Nombre del usuario"
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              className="col-md-6 form-control mt-2"
              placeholder="Apellidos"
                onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="row">
            <input
              type="email"
              className="col-md-6 form-control mt-2"
              placeholder="Email del usuario"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="col-md-6 form-control mt-2"
              placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row">
            <button
              type="submit"
              className="col-md-6 btn btn-primary mt-2 form-control"
              onClick={handleSubmit}
            >
              Guardar Usuario
            </button>
            <input
              type="password"
              className="col-md-6 form-control mt-2"
              placeholder="Repetir Password"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
          <h2>Listado de Usuarios</h2>
          <hr/>
        <div className="row animate__animated animate__fadeIn">
          {usuarios.map((data, key) => {
            return <UsuarioCard key={key} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
};
