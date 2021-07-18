import React from 'react';
import { Link,NavLink } from 'react-router-dom';
export const NavBar = () => {

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

                <Link 
                    className="navbar-brand"
                    to="/"
                >
                    Prestamos de libros
                </Link >

                <div className="navbar-collapse">
                    <div className="navbar-nav">

                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/libros"
                        >
                            Libros
                        </NavLink>

                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/usuarios"
                        >
                            Usuarios
                        </NavLink>
                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/prestamos"
                        >
                            Prestamos
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}
