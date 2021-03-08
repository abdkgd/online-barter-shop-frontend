import './App.css';
import store from './app/store/store.jsx'
import { Provider } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/layout/Navbar.jsx'
import { Switch, Route } from "react-router-dom";
import Login from './components/auth/Login.jsx'
import SignUp from './components/auth/Signup.jsx'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/signin" component={Login} />
            <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
