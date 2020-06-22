import React, {lazy, Suspense} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import {Loading} from "./view/Loading";

const Home = lazy(() => import('./view/Home'))
const Apply = lazy(() => import('./view/Apply'))
const Login = lazy(() => import('./view/Login'))
const SignUp = lazy(() => import('./view/SignUp'))
const EmailAuthentication= lazy(() => import('./view/EmailAuthentication'))

function App() {
  return (
      <BrowserRouter>
            <Suspense fallback={Loading()}>
                <Switch>
                    <Route path='/home' render={props => <Home {...props}/>} />
                    <Route path='/apply' render={props => <Apply {...props}/>} />
                    <Route path='/login' render={props => <Login {...props}/>} />
                    <Route path='/signup' render={props => <SignUp {...props}/>} />
                    <Route path='/user/auth' render={props => <EmailAuthentication {...props}/>} />
                    <Redirect from='/' to='/home'/>
                </Switch>
            </Suspense>
      </BrowserRouter>
  );
}

export default App;
