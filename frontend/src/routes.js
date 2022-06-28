import React from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom';

import Profile from './pages/Profile';
import Logon_Register from './pages/Logon_Register';
import Programing from './pages/Programing';

export default function Routes(){
    return (
        <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Logon_Register} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/programing" exact component={Programing} />
          </Switch>  
        </BrowserRouter>
    )
}