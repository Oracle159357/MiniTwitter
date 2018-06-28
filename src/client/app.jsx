import React, {PureComponent} from 'react';
import {Router, Route, Link} from 'react-router-dom';
import {Menu, Label} from 'semantic-ui-react'
import './app.scss';
import Login from "./components/Login";
import Home from "./components/Home";
import Users from "./components/Users";
import PostAndComment from "./components/PostAndComment"
import history from './history';
import {connect} from "react-redux";

export class App extends PureComponent {
    render() {
        return (
            <Router history={history}>
                <div>
                    {(() => {
                        if (this.props.isWatchingMode) {
                            return <Menu>
                                <Menu.Item as={Link} to='/'>
                                    Login
                                </Menu.Item>
                                <Menu.Item as={Link} to='/users'>
                                    Users
                                </Menu.Item>
                            </Menu>
                        }
                        else {
                            return <Menu>
                                <Menu.Item as={Link} to='/'>
                                    Login
                                </Menu.Item>
                                <Menu.Item as={Link} to='/home'>
                                    Home
                                </Menu.Item>
                                <Menu.Item as={Link} to='/users'>
                                    Users
                                </Menu.Item>
                            </Menu>
                        }
                    })()}
                    <Route exact path="/" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/watchingMode" component={Users}/>
                    <Route path={"/user/:login"} component={PostAndComment}/>
                </div>
            </Router>
        );
    }
}

export default connect(state => ({
        isWatchingMode: state.watchMode.isWatchingMode
    }),
    dispatch => ({})
)(App);