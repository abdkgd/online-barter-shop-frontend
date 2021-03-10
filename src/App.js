import './App.css';
import store from './app/store/store.jsx'
import { Provider } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/layout/Navbar.jsx'
import { Switch, Route } from "react-router-dom";
import Login from './components/auth/Login.jsx'
import SignUp from './components/auth/Signup.jsx'
import { useState, useEffect } from "react";
import Pages from './components/pages/Pages.jsx'

function App() {
  const [logged, setLogged] = useState(false);
  

  useEffect(() => {
    const cachedCred = JSON.parse(window.localStorage.getItem("creds"));
    if(cachedCred !== null){
      setLogged(true);
      console.log(cachedCred)
      console.log("FOUND CRED")
    }
    else{
      setLogged(false);
      console.log("NOT FOUND CRED")
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
          {
            logged && 
            <Pages />          
          }
          {!logged && 
          <div>
            <NavBar />
            <Switch>
              <Route exact path='/' render={() => <Login logged={logged} setLogged={setLogged}/>} />
              <Route path="/signin" render={() => <Login logged={logged} setLogged={setLogged}/>} />
              <Route path="/signup" render={() => <SignUp logged={logged} setLogged={setLogged}/>} />
            </Switch>
          </div>
          }
      </Router>
    </Provider>
  );
}

export default App;
