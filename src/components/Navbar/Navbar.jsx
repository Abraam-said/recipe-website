import { NavLink } from 'react-router-dom';
import './Navbar.scss'; // Import SCSS file
import logo from '../../assets/logo-BfNap0Pe.png'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <span>Flowbite</span>
            </div>

            <ul className="nav-links">
                <li>
                    <NavLink to="/" className="nav-button">
                        Meals
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" className="nav-button">
                        Ingredients
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" className="nav-button">
                        Area
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
