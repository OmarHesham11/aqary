import '../style.css';
import Searching from '../../components/property/Searching';

import { NavLink, Form, useRouteLoaderData } from 'react-router-dom';





function NavBar() {
    const token = useRouteLoaderData('root');
    const userData = JSON.parse(localStorage.getItem('userData'));

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
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/properties">Property</NavLink>
                            </li>
                            {!token &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/auth/login">Login</NavLink>
                                </li>
                            }

                            {!token &&

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/auth/register">Register</NavLink>
                                </li>
                            }
                            {token &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/postProperty">create Property</NavLink>
                                </li>
                            }

                            {token &&
                                <li className="nav-item">
                                    <Form action='/postProperty' method='post'>
                                        <button className='nav-link'>Logout</button>
                                    </Form>
                                </li>
                            }



                            {userData && userData.firstName &&
                                // <li className="nav-item">
                                //     <a className="nav-link disabled"  style={{ color: 'orange' }}>{`Ahlan ${userData.firstName}!`}</a>
                                // </li>

                                <li className="nav-item">
                                <NavLink className="nav-link" style={{ color: 'orange' }} to="/profile">{`Ahlan ${userData.firstName}!`}</NavLink>
                                </li>
                            }

                        </ul>

                    </div>

                </div>

            </nav>

        </>
    )
}

export default NavBar