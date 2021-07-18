import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Peticiones } from "../hooks/useFetch";
import swal from "sweetalert";
import { PrestamoCard } from "../components/prestamoCard";
export const Prestamos = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);
  const [libroID, setLibroID] = useState(0);
  const [usuarioId, setUsuarioId] = useState(0);
  const [prestamos, setPrestamos] = useState([]);
  useEffect(() => {
    TraerlibrosyUsuarios().then(() => verificar());
  }, []);
  const TraerlibrosyUsuarios = async () => {
    const resp = await Peticiones("usuario");
    const usuarios = await resp.json();
    setUsuarios(usuarios.usuario);
    const resp1 = await Peticiones("libro");
    const libros = await resp1.json();
    setLibros(libros.books);
  };
  const verificar = () => {
    if (libros.length < 1 && usuarios.length < 1) {
      return <Redirect to="/" />;
    }
  };
  const handleSubmit = async () => {
    if (libroID !== 0 && usuarioId !== 0) {
      setLibroID(parseInt(libroID, 10));
      setUsuarioId(parseInt(usuarioId, 10));
      const resp = await Peticiones(
        "prestamo",
        { id_libro: libroID, id_usuario: usuarioId },
        "POST"
      );
      const body = await resp.json();
      if (body.mensaje) {
        swal({
          title: "Correcto",
          text: "Prestamo creado correctamente",
          icon: "success",
          button: "OK",
        });
        setTimeout(function () {
          window.location.reload(1);
        }, 5000);
      } else {
        swal({
          title: "Error",
          text: "No se ha podido crear el prestamo",
          icon: "error",
          button: "OK",
        });
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

  useEffect(() => {
    TraerPrestamos();
  }, [])

  const TraerPrestamos=async()=>{
    const resp = await Peticiones("prestamo");
    const prestamos = await resp.json();
    setPrestamos(prestamos.loans);
  }
  return (
    <div>
      <div>
        <h2>Registro de Prestamos</h2>
        <hr />
        <div className="form-group">
          <label htmlFor="usuario">Seleccione el usuario</label>
          <select
            onChange={(e) => setUsuarioId(e.target.value)}
            className="form-control"
            id="usuario"
          >
            <option value={0}>Seleccione el usuario</option>
            {usuarios.map((data, key) => {
              return (
                <option key={key} value={data.id}>
                  {data.nombre}
                </option>
              );
            })}
          </select>
          <label htmlFor="libro">Seleccione el Libro</label>
          <select
            onChange={(e) => setLibroID(e.target.value)}
            className="form-control"
            id="libro"
          >
            <option value={0}>Seleccione el Libro</option>
            {libros.map((dat, key) => {
              if (dat.cantidad > 0) {
                return (
                  <option key={key} value={dat.id}>
                    {dat.nombre}
                  </option>
                );
              }
            })}
          </select>
          <button
            type="submit"
            className="btn btn-primary mt-2 form-control"
            onClick={handleSubmit}
          >
            Guardar Prestamo
          </button>
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
        <h2>Listado de Prestamos</h2>
        <hr />
        <div className="row animate__animated animate__fadeIn">
          {prestamos.map((data, key) => {
            return <PrestamoCard key={key} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
};
