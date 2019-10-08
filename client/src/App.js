import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';

import './App.css';
import LearningWords from './components/LearningWords';
import WordCategories from './components/WordCategories';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import AppNavbar from './components/AppNavbar';
import store from './store';

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <Router>
                  <div className="container">
                      <Route path="/" exact component={LearningWords} />
                      <Route path="/categories/" component={WordCategories} />
                      <Route path="/statistics/" component={Statistics} />
                      <Route path="/settings/" component={Settings} />
                  </div>
                  <footer>
                      <AppNavbar />
                  </footer>
              </Router>
          </div>
      </Provider>
  );
}

export default App;
