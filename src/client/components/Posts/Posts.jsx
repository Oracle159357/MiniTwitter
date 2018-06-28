import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, Label } from 'semantic-ui-react';
import { addComment } from 'actions/login';
import PropTypes from 'prop-types';
import { getCurrentLogin, getPostUsersByComment, getWatchingMode } from '../../selectors/index';
import Post from './Post';

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

export class Posts extends PureComponent {
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
            <Post
              key={index}
              post={post}
              isWatchingMode={this.props.isWatchingMode}
              selectedUser={this.props.match.params.login}
              currentLogin={this.props.currentLogin}
              addComment={this.props.addComment}
            />
          ))}
        </div>
      </div>
    );
  }
}


Posts.propTypes = {
  addComment: PropTypes.func.isRequired,
  currentLogin: PropTypes.string.isRequired,
  isWatchingMode: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      loginWhoLeft: PropTypes.string.isRequired,
      textOfComment: PropTypes.string.isRequired,
    })),
  })).isRequired,
};

export default connect(
  (state, props) => (
    {
      isWatchingMode: getWatchingMode(state),
      currentLogin: getCurrentLogin(state),
      posts: getPostUsersByComment(state, props.match.params.login),
    }),
  { addComment },
)(Posts);
