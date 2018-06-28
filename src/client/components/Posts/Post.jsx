import React, { PureComponent } from 'react';
import { Grid, Input, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Post extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: '',
    };
  }

  addComment = (titleOfPost) => {
    const comment = {
      login: this.props.selectedUser,
      title: titleOfPost,
      comment: { loginWhoLeft: this.props.currentLogin, textOfComment: this.state.commentInput },
    };
    this.props.addComment(comment);
    this.setState({ commentInput: '' });
  };

  render() {
    const { post, isWatchingMode } = this.props;
    return (
      <Grid>
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
              {isWatchingMode
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
              {isWatchingMode ? null
                : (
                  <Button
                    className="ui right floated button"
                    disabled={!(this.state.commentInput)}
                    onClick={() => this.addComment(post.title)}
                  >
                    Add Comment
                  </Button>
                )
              }
            </div>
            <div className="ui compact segments" />
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
      </Grid>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      loginWhoLeft: PropTypes.string.isRequired,
      textOfComment: PropTypes.string.isRequired,
    })),
  }).isRequired,
  isWatchingMode: PropTypes.bool.isRequired,
  selectedUser: PropTypes.string.isRequired,
  currentLogin: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default Post;
