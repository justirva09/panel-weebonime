import React, {Component} from 'react';
import API, { Setting } from '../../services/Service';
import { ContextConsumer } from '../../context/Context';

class Login extends Component {
    state = {
        loginData : {
            email: "",
            password: ""
        },
        alertStatus: false,
        alertData : {
            type : "",
            message : ""
        }
    }

    ChangeText = (input) => {
        let loginData = {...this.state.loginData};
        let name = input.target.name;

        switch(name) {
            case "email":
                loginData.email = input.target.value;
                break;
            case "password":
                loginData.password = input.target.value;
                break;
            default:
                return false;
        }
        this.setState({
            loginData : loginData
        })
    }

    handleLoginAdmin =  () => {
        let loginData = {...this.state.loginData};
        let noValue = false;
        for(let key in loginData){
            if(loginData[key] === ""){
                noValue = true;
            }
        }
        if(noValue){
            alert("Form tidak boleh kosong!");
        } else {
            let data ={
                loginData : loginData
            }
            API.loginSubmit(data)
            .then((response) => {
                console.log(response)
                if(response.status) {
                    this.props.ContextAction({
                        type  : "USER_LOGIN",
                        data  : response.data
                    })
                    window.localStorage.setItem("loginData",JSON.stringify(response.data));
                    this.props.history.push(Setting.basePath);
                    alert("SUKSES LOGIN");
                } else {
                    alert("GAGAL LOGIN");
                }
            })
        }
    
    }

    UserData = () => {
        API.getUser()
        .then((response) =>{
            console.log(response)
        })
    }
    componentDidMount() {
        console.log("Component Did Mount");
        this.UserData()
    }
    render() {
        return(
            <div className="login-section">
                <div className="login-content flat-card-body-items">
                    <div className="flat-card-body">
                        <div className="flat-card-items">
                        <h4>私はマゾ女が好き!</h4>
                            <div className="form-group m-0">
                                {/* {this.state.alertStatus ? <Alert type={this.state.alertData.type} message={this.state.alertData.message} style={{textAlign: "center"}} /> : ""} */}
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input onChange={(input) => this.ChangeText(input)} type="email" className="form-control" name="email"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input onChange={(input) => this.ChangeText(input)} type="password" className="form-control" name="password" />
                            </div>
                            <div className="form-group m-0">
                                <button onClick={this.handleLoginAdmin} type="button" className="btn btn-primary btn-block">Login</button>
                            </div>
                        </div>
                    </div>
                    <div className="flat-card-footer">

                    </div>
                </div>
            </div>
        )
    }
}

export default ContextConsumer(Login);