import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import LearningWords from './pages/LearningWords/LearningWords';
import WordCategories from './pages/WordCategories/WordCategories';
import Statistics from './pages/Statistics/Statistics';
import Settings from './pages/Settings/Settings';
import AppNavbar from './components/AppNavbar/AppNavbar';
import RegistrationModal from './components/auth/RegistrationModal';
import Logout from './components/auth/Logout';
import LoginModal from "./components/auth/LoginModal";
import store from './store';

import {loadUser} from './redux/actions/authActions';

class App extends React.Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <div className="main">
                    <Router>
                        <header>
                            <ul className="menu-nav">
                                <li className="menu-nav__item">
                                    <Logout/>
                                </li>
                                <li className="menu-nav__item">
                                    <LoginModal/>
                                </li>
                                <li className="menu-nav__item">
                                    <RegistrationModal/>
                                </li>
                            </ul>
                        </header>
                        <div className="container main-content">
                            <Route path="/" exact component={LearningWords}/>
                            <Route path="/categories/" component={WordCategories}/>
                            <Route path="/statistics/" component={Statistics}/>
                            <Route path="/settings/" component={Settings}/>
                        </div>
                        <footer>
                            <AppNavbar/>
                        </footer>
                    </Router>
                </div>
            </Provider>
        )
    };
}

export default App;
