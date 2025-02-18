import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.scss';

export default function Layout() {
    return (
        <div className="layout">
            <div className="sidebar">
                <Navbar />
            </div>

            <div className="main-content">
                <div className="content">
                    <Outlet />
                </div>

                <Footer />
            </div>
        </div>
    );
}

