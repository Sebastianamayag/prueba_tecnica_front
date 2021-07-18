import React, { useState, useEffect } from "react";
import { Peticiones } from "../hooks/useFetch";
import { LibrosCard } from "../components/librosCard";
import swal from "sweetalert";
export const Libros = () => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [libros, setLibros] = useState([]);
  const handleSubmit = async () => {
    setNombre(nombre.trim());
    if(nombre!=="" & cantidad!==0 ){
      const resp = await Peticiones("libro", { nombre, cantidad }, "POST");
      const body = await resp.json();
      if (body.success) {
        swal({
          title: "Correcto",
          text: "Libro creado correctamente",
          icon: "success",
          button: "OK",
        });
        setTimeout(function(){
          window.location.reload(1);
      }, 5000);
      } else {
        swal({
          title: "Error",
          text: "No se ha podido crear el libro",
          icon: "error",
          button: "OK",
        });
      }
    }else{
      swal({
        title:"Error",
        text:"Los campos no pueden estar vacios",
        icon:"error",
        button:"OK"
    })
    }

  };
  useEffect(() => {
    Traerlibros();
  }, []);
  const Traerlibros = async () => {
    const resp = await Peticiones("libro");
    const libros = await resp.json();
    setLibros(libros.books);
  };
  return (
    <div>
      <h1>Libros Screen</h1>
      <hr />
      <div style={{ height: "30vh" }}>
        <h2>Registro de Libros</h2>
        <hr />
        <div>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Nombre del libro"
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="number"
            className="form-control mt-2"
            placeholder="Cantidad"
            onChange={(e) => setCantidad(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary mt-2 form-control"
            onClick={handleSubmit}
          >
            Guardar libro
          </button>
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
        <h2>Listado de Libros</h2>
        <hr />
        <div className="row animate__animated animate__fadeIn">
          {libros.map((data, key) => {
            return <LibrosCard key={key} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
};
