import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux'
import history from "../../history";
import {Button, Form, Grid, Header, Input, Label, Modal, Table} from "semantic-ui-react";
import './Style.scss';

export class Users extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newItemAddPost: {title: '', body: ''},
        }
    }

    UserMode(login) {
        history.push(`/user/${login}`);
        console.log(history.location.pathname)
    }

    render() {
        return (
            <div>
                <div className="ui middle aligned animated list">
                    {
                        this.props.users && this.props.users.map((user, index) =>
                            <div className="item" key={index}>
                                <div className="content">
                                    <div className="header">{index + 1}. <a
                                        onClick={() => this.UserMode(user.login.login)}>{user.login.login}</a></div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
        users: state.posts.users,
    }),
    dispatch => ({})
)(Users);
