import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Peticiones } from "../hooks/useFetch";

export const PrestamosScreen = () => {
  const { prestamoId } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);
  const [libroID, setLibroID] = useState(0);
  const [usuarioId, setUsuarioId] = useState(0);
  useEffect(() => {
    TraerInfo();
  }, []);
  const TraerInfo = async () => {
    const resp = await Peticiones(`prestamo/${prestamoId}`);
    const prestamo = await resp.json();
    const resp2 = await Peticiones(`usuario/loc/${prestamo.success[0].id_usuario}`);
    const usuario = await resp2.json();
    setUsuarios(usuario.usuario[0]);
    const resp1 = await Peticiones(`libro`);
    const libros = await resp1.json();
    setLibros(libros.books);
    setLibroID(prestamo.success[0].id_libro);
    setUsuarioId(prestamo.success[0].id_usuario);
  };

  const handleSubmit=async()=>{
    setLibroID(parseInt(libroID, 10));
    setUsuarioId(parseInt(usuarioId, 10));
    const resp = await Peticiones(
        `prestamo/actualizar/${prestamoId}`,
        { id_libro: libroID, id_usuario: usuarioId },
        "PUT"
      );
      const body = await resp.json();
      if (body.mensaje) {
        swal({
          title: "Correcto",
          text: "Prestamo actualizado correctamente",
          icon: "success",
          button: "OK",
        });
      } else {
        swal({
          title: "Error",
          text: "No se ha podido actualizar el prestamo",
          icon: "error",
          button: "OK",
        });
      }
  }
  return (
    <div>
      <h2>Actualización de Prestamos</h2>
      <hr />
      <div className="form-group">
        <label htmlFor="usuario">Seleccione el usuario</label>
        <select
          className="form-control"
          id="usuario"
        >
          <option value={usuarios.id}>{usuarios.nombre}</option>
        </select>
        <label htmlFor="libro">Seleccione el Libro</label>
        <select
          onChange={(e) => setLibroID(e.target.value)}
          className="form-control"
          id="libro"
          value={`${libroID}`}
        >
          {libros.map((dat, key) => {
            if(dat.id==libroID){
                return (
                    <option key={key}  value={dat.id} >
                      {dat.nombre}
                    </option>
                  );
            }else{
                if (dat.cantidad > 0) {
                    return (
                        <option key={key} value={dat.id} >
                          {dat.nombre}
                        </option>
                      );
                }
            }
          })}
        </select>
        <button
          type="submit"
          className="btn btn-primary mt-2 form-control"
          onClick={handleSubmit}
        >
          Actualizar  Prestamo
        </button>
      </div>
    </div>
  );
};
