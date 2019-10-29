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
                        <div className="container">
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
