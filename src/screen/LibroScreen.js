import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Peticiones } from "../hooks/useFetch";
import swal from 'sweetalert';
export const LibroScreen = () => {
    const { libroId } = useParams();
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    useEffect(() => {
        TraerLibro();
    }, []);

    const TraerLibro=async()=>{
        const resp = await Peticiones(`libro/${libroId}`);
        const libro = await resp.json();
        setCantidad(libro.success[0].cantidad);
        setNombre(libro.success[0].nombre);
    }

    const handleSubmit=async()=>{
      setNombre(nombre.trim());
      if(nombre!=="" & cantidad!==0 ){
        const resp = await Peticiones(`libro/actualizar/${libroId}`, { nombre, cantidad }, "PUT");
        const body = await resp.json();
        if(body.mensaje){
            swal({
                title:"Correcto",
                text:"Libro actualizado correctamente",
                icon:"success",
                button:"OK"
            })
        }else{
            swal({
                title:"Error",
                text:"No se ha podido actualizar el libro",
                icon:"error",
                button:"OK"
            })
        }
      }else{
        swal({
          title:"Error",
          text:"Los campos no pueden estar vacios",
          icon:"error",
          button:"OK"
      })
      }

    }

  return (
    <div style={{ height: "30vh" }}>
      <h2>Actualización de Libros</h2>
      <hr />
      <div>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Nombre del libro"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Cantidad"
          onChange={(e) => setCantidad(e.target.value)}
          value={cantidad}
        />
        <button
          type="submit"
          className="btn btn-primary mt-2 form-control"
          onClick={handleSubmit}
        >
          Acutalizar libro
        </button>
      </div>
    </div>
  );
};
