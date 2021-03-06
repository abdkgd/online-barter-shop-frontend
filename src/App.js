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
import About from './components/auth/About';
import Home from './components/pages/Home/Home.jsx'
import SectionFooter from './components/layout/SectionFooter';

function App() {
  const [logged, setLogged] = useState(false);
  

  useEffect(() => {
    const cachedCred = JSON.parse(window.localStorage.getItem("creds"));
    const tempCachedCred = JSON.parse(window.sessionStorage.getItem("creds"));
    if(cachedCred !== null){
      setLogged(true);
      console.log(cachedCred)
      console.log("FOUND CRED")
    }
    else if(tempCachedCred !== null){
      setLogged(true);
      console.log(tempCachedCred)
      console.log("FOUND CRED")
    }
    else{
      setLogged(false);
      console.log("NOT FOUND CRED")
    }
  }, [])

  // window.onbeforeunload = function() {
  //   // const rememberme = JSON.parse(window.localStorage.getItem("rememberme"));
  //   // if(!rememberme){
  //   //   localStorage.clear();
  //   // }
  // }


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
              <Route exact path='/' render={() => <><Home /><SectionFooter /></>} />
              <Route path="/signin" render={() => <Login logged={logged} setLogged={setLogged}/>} />
              <Route path="/signup" render={() => <SignUp logged={logged} setLogged={setLogged}/>} />
              <Route path="/about" render={() => <About />} />
            </Switch>
          </div>
          }
      </Router>
    </Provider>
  );
}

export default App;
