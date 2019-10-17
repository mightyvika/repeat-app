import React from 'react';
import { Link } from 'react-router-dom';
import { MdSettings as Settings, MdSettingsEthernet as Learning, MdFormatListBulleted as Categories, MdShowChart as Statistics, MdPersonAdd } from "react-icons/md";
import RegistrationModal from './auth/RegistrationModal';
import Logout from './auth/Logout';

import './AppNavbar.css';
import LoginModal from "./auth/LoginModal";

function AppNavbar() {
    return (
        <nav>
            <ul className="menu-nav">
                <li className="menu-nav__icon">
                    <LoginModal />
                </li>
                <li className="menu-nav__icon">
                    <RegistrationModal />
                </li>
                <li className="menu-nav__icon">
                    <Logout />
                </li>
                <li className="menu-nav__icon">
                    <Link to="/"><Learning /></Link>
                </li>
                <li className="menu-nav__icon">
                    <Link to="/categories/"><Categories /></Link>
                </li>
                <li className="menu-nav__icon">
                    <Link to="/statistics/"><Statistics /></Link>
                </li>
                <li className="menu-nav__icon">
                    <Link to="/settings/"><Settings /></Link>
                </li>
            </ul>
        </nav>
    )
}

export default AppNavbar;