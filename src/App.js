import React from 'react'
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import Login from './components/Login/Login'
import Home from './components/TabOne/Home'
import TabTwo from './components/TabTwo/TabTwo'

const App = () => {
    return (
            
    <Router>
    <Switch>

     <Route exact path='/'>
            <Login />
      </Route>

      <Route path='/home'>
        <Home />
      </Route>
      <Route  path='/tabtwo'>
          <TabTwo />
      </Route>
     

    </Switch>
    </Router>
      
    )   
}

export default App
