import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux'
import history from "../../history";
import {Button, Form, Grid, Header, Input, Label, Modal, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";

export class PostAndComment extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newItemAddComment: {textOfComment: ''},
        }
    }

    addComment(login, titleOfPost, loginWhoLeft) {
        this.props.AddComment(login, titleOfPost, loginWhoLeft, this.state.newItemAddComment);
        this.setState({newItemAddComment: {textOfComment: ''}});
    }

    render() {
        return (
            <div>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column/>
                        <Grid.Column>
                            <div className='header , margin'>
                                <Label size="big">User: {this.props.tempLogin}</Label>
                            </div>
                        </Grid.Column>
                        <Grid.Column/>
                    </Grid.Row>
                </Grid>
                <div className="ui list">
                    {this.props.posts && this.props.posts.map((post, index) =>
                        <Grid key={index}>
                            <Grid.Row columns={3}>
                                <Grid.Column width={4}/>
                                <Grid.Column width={8}>
                                    < div className="ui stacked segment">
                                        <h4 className="ui header">{post.title}</h4>
                                        {this.props.isWatchingMode ? null :
                                            <div className="ui right floated button"
                                                 onClick={() => this.addComment(this.props.match.params.login,
                                                     post.title, this.props.tempLogin)}>Add
                                                Comment</div>
                                        }
                                        <p>{post.body}</p>
                                        {this.props.isWatchingMode ? null :
                                            <Input icon placeholder='Text'
                                                   value={this.state.newItemAddComment.textOfComment}
                                                   type='text'
                                                   onChange={i =>
                                                       this.setState({
                                                               newItemAddComment: {
                                                                   ...this.state.newItemAddComment,
                                                                   textOfComment: i.target.value
                                                               }
                                                           }
                                                       )
                                                   }
                                            />}

                                    </div>
                                    <div className="ui compact segments">
                                        {
                                            post.comments.map((comment, index) =>
                                                index === 0 ? null
                                                    : <div className="ui segment" key={index}>
                                                        <p>
                                                            {comment.loginWhoLeft} {}
                                                            {comment.textOfComment}
                                                        </p>
                                                    </div>
                                            )
                                        }
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={4}/>
                            </Grid.Row>
                        </Grid>
                    )}
                </div>
            </div>
        );
    }
}

export default connect((state, props) => {
        return ({
            isWatchingMode: state.posts.isWatchingMode,
            tempLogin: state.posts.tempLogin.login,
            posts: state.posts.tempLogin && state.posts.users.find(user =>
                user.login.login === props.match.params.login).posts
        });
    },
    dispatch => ({
        AddComment: (login, titleOfPost, loginWhoLeft, textOfComment) => {
            const payload = {
                login: login,
                title: titleOfPost,
                comment: {loginWhoLeft: loginWhoLeft, textOfComment: textOfComment.textOfComment}
            };
            dispatch({type: 'ADD_COMMENT', payload})
        },
    })
)(PostAndComment);
