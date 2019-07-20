import React from 'react';
import './App.css';
import Home from './Pages/Home';
import History from './Pages/History';
import Landing from './Pages/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/history" component={History} />
        />
      </Switch>
    </div>
  </Router>
);

export default App;
