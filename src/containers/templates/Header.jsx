import React, {Component} from 'react';
import {Icon} from 'react-icons-kit';
import {ic_person} from 'react-icons-kit/md/ic_person';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Setting as Config } from '../../services/Services';


class Header extends Component {
    state = {
        admin : this.props.ContextState.loginData,
        dropdown : false
    }

    render() {
        return(
            <>
            
            </>
        )
    }
}