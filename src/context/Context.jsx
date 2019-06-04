import React, { Component, createContext } from 'react';

const Context = createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;

const ContextProvider = (ChildrenComponent) => {
    return (
        class ParentComponent extends Component {
            constructor(props) {
                super(props);

                this.state = {
                    siteTitle: "Weebonime",
                    isLogin: false,
                    loginData: {},
                }
            }

            handleLogin = (data) => {
                let loginData = { ...this.state.loginData }
                loginData = data;

                this.setState({
                    loginData: loginData,
                    isLogin: true
                })
            }

            handleLogout = () => {
                this.setState({
                    loginData: {},
                    isLogin: false
                })
            }

            handleCheckLogin = () => {
                let loginData = window.localStorage.getItem("loginData")
                if (loginData !== null) {
                    loginData = JSON.parse(loginData);
                    if (loginData.hasOwnProperty("email")) {
                        this.handleLogin(loginData);
                    }
                }
            }

            componentDidMount() {
                this.handleCheckLogin()
            }

            dispatch = (action) => {
                switch(action.type) {
                    case "USER_LOGIN":
                        this.handleLogin(action.data);
                        break;
                    case "USER_LOGOUT":
                        this.handleLogout(action.data);
                        break;
                    default:
                        return false;
                }
            }

            render() {

                let globalState = {
                    ContextState: this.state,
                    ContextAction: this.dispatch
                }
                return (
                    <Provider value={globalState}>
                        <ChildrenComponent {...this.props} />
                    </Provider>
                )
            }
        }
    )
}

export const ContextConsumer = (ChildrenComponent) => {
    return (
        class ParentComponent extends Component {
            render() {

                return (
                    <Consumer>
                        {
                            (value) => {
                                return (
                                    <ChildrenComponent {...value} {...this.props} />
                                )
                            }
                        }
                    </Consumer>
                )
            }
        }
    )
}

export default ContextProvider;