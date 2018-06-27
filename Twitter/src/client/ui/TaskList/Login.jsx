import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux'
import history from "../../history";
import {Button, Form, Grid, Header, Input, Modal, Table} from "semantic-ui-react";
import './Style.scss';

export class Login extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            newItemAddUser: {login: ''},
        }
    }

    addUser() {
        this.props.ChangeIsWatchingModeFalse();
        this.props.AddUser(this.state.newItemAddUser);
        this.setState({newItemAddUser: {login: ''}});
        history.push('/home');
    }

    WatchMode() {
        this.props.ChangeIsWatchingModeTrue();
        history.push('/watchingMode');
    }

    render() {
        return (
            <div>
                <div>
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column/>
                            <Grid.Column>
                                <Input icon placeholder='Login' fluid={true} value={this.state.newItemAddUser.login}
                                       type='text'
                                       onChange={i =>
                                           this.setState({
                                                   newItemAddUser: {
                                                       ...this.state.newItemAddUser, login: i.target.value
                                                   }
                                               }
                                           )
                                       }
                                />
                            </Grid.Column>
                            <Grid.Column/>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column/>
                            <Grid.Column>
                                <div className="login-button">
                                    <div className="ui buttons">
                                        <Button toggle fluid={true} onClick={() => this.WatchMode()}>Watch Mode</Button>
                                        <div className="or"/>
                                        <Button positive fluid={true} onClick={() => this.addUser()}>Sign In </Button>
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column/>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
        users: state.users,
        isWatchingMode: state.posts.isWatchingMode
    }),
    dispatch => ({
        AddUser: (login) => {
            dispatch({type: 'ADD_USER', login})
        },
        ChangeIsWatchingModeTrue: () => {
            dispatch({type: 'CHANGE_ISWATCHINGMODETRUE'})
        },
        ChangeIsWatchingModeFalse: () => {
            dispatch({type: 'CHANGE_ISWATCHINGMODEFALSE'})
        }
    })
)(Login);
