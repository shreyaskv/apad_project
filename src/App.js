import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserSignInPage from './components/SignUp';
import Navbar from './components/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginPage from './components/LoginPage';
import Project from './components/Projects';
import create_Project from './components/createProject';
const AppRouter = () => (
    <BrowserRouter>
        <MuiThemeProvider>
            <Navbar/>
            <Switch>
                <Route path="/" component={LoginPage} exact={true} />
                <Route path="/UserSignIn" component={UserSignInPage} />
                <Route path="/Login" component={LoginPage} />
                <Route path="/project" component={Project} />
                <Route path="/createProject" component={create_Project} />
            </Switch>
        </MuiThemeProvider>
    </BrowserRouter>
);
export default AppRouter;