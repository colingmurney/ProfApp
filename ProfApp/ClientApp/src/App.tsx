import * as React from 'react';
import { Route } from 'react-router';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
// import Login from './components/Login'
import { Container } from 'reactstrap';
import NavMenu from './components/NavMenu';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import './custom.css'

const App: React.FC = () => {

    return (
    <React.Fragment>
        <NavMenu/>
        <Container>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
        </Container>
    </React.Fragment>
    )
}

export default App;

