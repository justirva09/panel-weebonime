import React, {Component} from 'react';
import Header from './templates/Header';
import Sidebar from './templates/Sidebar';
import Footer from './templates/Footer';

const ContentWrapper = (Content) => {
    return(
        class Wrapper extends Component{
            state = {
                sidebar : false
            }

            sidebarToggle = () => {
                this.setState({
                    sidebar : !this.state.sidebar
                })
            }
            render() {
                let wrapperState = {
                    state : this.state,
                    sidebarToggle : this.sidebarToggle
                }
                return(
                    <>
                        <Sidebar wrapper={wrapperState} {...this.props} />
                        <Header  wrapper={wrapperState} {...this.props} />
                        <div className="content-section">
                            <div className="row">
                                <div className="content-main col-12">
                                    <Content {...this.props} />
                                </div>
                            </div>
                        </div>
                        <Footer {...this.props} />
                    </>
                )
            }
        }
    )
}

export default ContentWrapper;