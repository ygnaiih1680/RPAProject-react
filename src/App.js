import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Loading} from "./view/Loading";
import CommonModal from "./view/CommonModal";
import {useStore} from "react-redux";

const Home = lazy(() => import('./view/Home'))
const Apply = lazy(() => import('./view/Apply'))
const Login = lazy(() => import('./view/Login'))
const SignUp = lazy(() => import('./view/SignUp'))
const EmailAuthentication = lazy(() => import('./view/EmailAuthentication'))
const Admin = lazy(() => import('./view/Admin'))
const Page404 = lazy(() => import('./view/Page404'))

function App() {
    const {user} = useStore().getState()
    return (
      <BrowserRouter>
            <Suspense fallback={Loading()}>
                <Switch>
                    <Route path='/404' render={props => <Page404 {...props}/>}/>
                    <Route path='/admin' render={props => <Admin {...props}/>}/>
                    <Route path='/login' render={props => <Login {...props}/>}/>
                    <Route path='/signup' render={props => <SignUp {...props}/>}/>
                    <Route path='/home' render={props => <Home {...props}/>}/>
                    <Route path='/apply' render={props => <Apply {...props}/>}/>
                    <Route path='/user/auth' render={props => <EmailAuthentication {...props}/>}/>
                    <Redirect from='/' to='/home'/>
                </Switch>
                <CommonModal/>
            </Suspense>
      </BrowserRouter>
  );
}

export default App;
