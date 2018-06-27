import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux'
import history from "../../history";
import {Button, Form, Grid, Header, Input, Label, Modal, Table} from "semantic-ui-react";

export class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            newItemAddPost: {title: '', body: ''},
        }
    }

    addPost() {
        this.props.AddPost(this.state.newItemAddPost)
        this.setState({newItemAddPost: {title: '', body: ''}});
    }

    render() {

        return (
            <div>
                <div className='header , margin'>
                    <Label size="big">User: {this.props.tempLogin}</Label>
                </div>
                <div>
                    <Grid>
                        <Grid.Row columns={4}>
                            <Grid.Column/>
                            <Grid.Column>
                                <Input icon placeholder='Title' fluid={true} value={this.state.newItemAddPost.title}
                                       type='text'
                                       onChange={i =>
                                           this.setState({
                                                   newItemAddPost: {
                                                       ...this.state.newItemAddPost, title: i.target.value
                                                   }
                                               }
                                           )
                                       }
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input icon placeholder='Text' fluid={true}
                                       value={this.state.newItemAddPost.body}
                                       type='text'
                                       onChange={i =>
                                           this.setState({
                                                   newItemAddPost: {
                                                       ...this.state.newItemAddPost,
                                                       body: i.target.value
                                                   }
                                               }
                                           )
                                       }
                                />
                            </Grid.Column>
                            <Grid.Column/>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                            <Grid.Column width={4}/>
                            <Grid.Column width={8}>
                                <Button positive fluid={true} onClick={() => this.addPost()}>ADD</Button>
                            </Grid.Column>
                            <Grid.Column width={4}/>
                        </Grid.Row>
                    </Grid>
                </div>
                <div className="ui list">
                    {this.props.posts && this.props.posts.map((post, index) =>
                        <Grid key={index}>
                            <Grid.Row columns={3}>
                                <Grid.Column width={4}/>
                                <Grid.Column width={8}>
                                    < div className="ui stacked segment">
                                        <h4 className="ui header">{post.title}</h4>
                                        <p>{post.body}</p>
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

export default connect(state => {
        return ({
            tempLogin: state.posts.tempLogin.login,
            posts: state.posts.tempLogin && state.posts.users.find(user => user.login === state.posts.tempLogin).posts
        });
    },
    dispatch => ({
        AddPost: (post) => {
            dispatch({type: 'ADD_POST', post})
        },
    })
)(Home);
