import '../style.css';
import Searching from '../../components/property/Searching';

import { NavLink } from 'react-router-dom';





function NavBar() {

    return (

        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top vh-150 mouse">

                <div className="container">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                        <NavLink className="navbar-brand" to="/"><span className="text-warning">House</span>Hunters</NavLink>

                        <Searching />

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/" exact>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/properties">Property</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="#">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="#">Register</NavLink>
                            </li>

                        </ul>

                    </div>

                </div>

            </nav>

        </>
    )
}

export default NavBar