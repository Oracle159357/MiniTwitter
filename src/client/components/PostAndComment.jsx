import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Label } from 'semantic-ui-react';
import { addComment } from 'actions/login';
import PropTypes from 'prop-types';
import { GetWatchingMode, GetPostUsersByComment, GetCurrentLogin } from '../selectors/GetDataFromStore';

export class PostAndComment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: '',
    };
  }

  addComment = (titleOfPost) => {
    const comment = {
      login: this.props.match.params.login,
      title: titleOfPost,
      comment: { loginWhoLeft: this.props.currentLogin, textOfComment: this.state.commentInput },
    };
    this.props.addComment(comment);
    this.setState({ commentInput: '' });
  };

  render() {
    return (
      <div>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column />
            <Grid.Column>
              <div className='header , margin'>
                <Label size="big">
                  {`My User: ${this.props.currentLogin}`}
                </Label>
                <Label size="big">
                  {
                    `User Page: ${this.props.match.params.login}`
                  }
                </Label>
              </div>
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
        <div className="ui list">
          {this.props.posts && this.props.posts.map((post, index) => (
            <Grid key={index}>
              <Grid.Row columns={3}>
                <Grid.Column width={4} />
                <Grid.Column width={8}>
                  <div className="ui stacked segment">
                    <h4 className="ui header">
                      {
                        `Title: ${post.title}`
                      }
                    </h4>

                    <div>
                      {
                        `Body: ${post.body}`
                      }
                      {
                        post.comments.map((comment, j) => j === 0
                          ? null
                          : (
                            <p key={j}>
                              {`Login: ${comment.loginWhoLeft} Comment: ${comment.textOfComment}`}
                            </p>))
                      }
                    </div>
                    {this.props.isWatchingMode
                      ? null
                      : (
                        <Input
                          icon
                          placeholder='Text'
                          value={this.state.commentInput}
                          type='text'
                          onChange={i => this.setState({
                            commentInput: i.target.value,
                          })
                          }
                        />)
                    }
                    {this.props.isWatchingMode ? null
                      : (
                        <div
                          className="ui right floated button"
                          onClick={() => this.addComment(post.title)}
                        >
                          Add Comment
                        </div>
                      )
                    }
                  </div>
                  <div className="ui compact segments" />
                </Grid.Column>
                <Grid.Column width={4} />
              </Grid.Row>
            </Grid>
          ))}
        </div>
      </div>
    );
  }
}


PostAndComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  currentLogin: PropTypes.string.isRequired,
  isWatchingMode: PropTypes.bool.isRequired,
};

export default connect(
  (state, props) => (
    {
      isWatchingMode: GetWatchingMode(state),
      currentLogin: GetCurrentLogin(state),
      posts: GetPostUsersByComment(state, props.match.params.login),
    }),
  { addComment },
)(PostAndComment);
