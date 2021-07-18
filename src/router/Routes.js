import React from 'react'
import { BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Libros } from '../screen/Libros';
import { LibroScreen } from '../screen/LibroScreen';
import { Prestamos } from '../screen/Prestamos';
import { PrestamosScreen } from '../screen/PrestamosScreen';
import { Usuarios } from '../screen/Usuarios';
import { UsuariosScreen } from '../screen/UsuariosScreen';
export const Routes = () => {
    return (
        <Router>
            <NavBar/>
            <div className="container mt-2">
                <Switch>
                    <Route exact path="/usuarios" component={Usuarios}/>
                    <Route exact path="/usuarios/:usuarioEmail" component={UsuariosScreen}/>
                    <Route exact path="/libros" component={Libros}/>
                    <Route exact path="/libro/:libroId" component={LibroScreen}/>
                    <Route exact path="/prestamos" component={Prestamos}/>
                    <Route exact path="/prestamo/:prestamoId" component={PrestamosScreen}/>
                    <Redirect to ="/libros"/>
                </Switch>
            </div>
        </Router>
    )
}
