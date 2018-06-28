import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Input,
  Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { addPost } from 'actions/home';
import { GetCurrentLogin, GetPostUsers } from '../selectors/GetDataFromStore';

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titlePost: '',
      bodyPost: '',
    };
  }

  addPost = () => {
    this.props.addPost({ title: this.state.titlePost, body: this.state.bodyPost });
    this.setState({ titlePost: '', bodyPost: '' });
  };

  render() {
    return (
      <div>
        <div>
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column>
                <div className='header , margin'>
                  <Label size="large">
                    {`User: ${this.props.currentLogin}`}
                  </Label>
                </div>
              </Grid.Column>
              <Grid.Column>
                <Input
                  icon
                  placeholder='Title'
                  fluid
                  value={this.state.titlePost}
                  type='text'
                  onChange={i => this.setState({
                    titlePost: i.target.value,
                  })
                  }
                />
              </Grid.Column>
              <Grid.Column>
                <Input
                  icon
                  placeholder='Text'
                  fluid
                  value={this.state.bodyPost}
                  type='text'
                  onChange={i => this.setState({
                    bodyPost: i.target.value,
                  })
                  }
                />
              </Grid.Column>
              <Grid.Column />
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column width={4} />
              <Grid.Column width={8}>
                <Button positive fluid onClick={this.addPost} disabled={!(this.state.bodyPost)}>
                  ADD
                </Button>
              </Grid.Column>
              <Grid.Column width={4} />
            </Grid.Row>
          </Grid>
        </div>
        <div className="ui list">
          {this.props.posts && this.props.posts.map((post, index) => (
            <Grid key={index}>
              <Grid.Row columns={3}>
                <Grid.Column width={4} />
                <Grid.Column width={8}>
                  <div className="ui stacked segment">
                    <div>
                      <h2>
                        {this.props.currentLogin}
                      </h2>
                    </div>
                    {
                      post.title === ''
                        ? undefined
                        : (
                          <div>
                            {`${post.title}: `}
                          </div>
                        )
                    }
                    <div>
                      {post.body}
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column width={4} />
              </Grid.Row>
            </Grid>
          ))
          }
        </div>
      </div>
    );
  }
}


Home.propTypes = {
  addPost: PropTypes.func.isRequired,
  currentLogin: PropTypes.string.isRequired,
  posts: PropTypes.element.isRequired,
};
export default connect(
  state => (
    {
      currentLogin: GetCurrentLogin(state),
      posts: GetPostUsers(state),
    }),
  { addPost },
)(Home);
