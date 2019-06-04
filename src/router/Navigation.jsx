import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ContextProvider, { ContextConsumer } from '../context/Context';
import { Setting as Config} from '../services/Service';
//Contents
import Dashboard from '../containers/contents/Dashboard';
import Login from '../containers/contents/Login';


const RouterWrapper = (Navigation) => {
    return(
        class ParentRouter extends Component {
            render() {
                return (
                    <BrowserRouter>
                        <Navigation {...this.props} />
                    </BrowserRouter>
                )
            }
        }
    )
}

const Navigation = (props) => {
    return(
        <Switch>
            {
                props.ContextState.isLogin ?
                <>
                    <Route path ={`${Config.basePath}`} component={Dashboard} exact />
                </>
                :
                <>
                    <Route path ={`${Config.basePath}`} component={Login} exact />
                </>
            }
        </Switch>
    )   
}

export default
ContextProvider(
    RouterWrapper(
        ContextConsumer(
            Navigation
        )
    )
);