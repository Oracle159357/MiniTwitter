import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Grid, Input } from 'semantic-ui-react';
import { addUser, changeIsWatchingMode } from 'actions/login';
import history from '../history';
import './Style.scss';

export class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loginInput: '',
    };
  }

  componentDidMount() {
    this.props.changeIsWatchingMode(true);
  }

  addUser = () => {
    this.props.changeIsWatchingMode(false);
    this.props.addUser(this.state.loginInput);
    this.setState({ loginInput: '' });
    history.push('/home');
  };

  WatchMode = () => {
    this.props.changeIsWatchingMode(true);
    history.push('/watchingMode');
  };

  render() {
    return (
      <div>
        <div>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column />
              <Grid.Column>
                <Input
                  icon
                  placeholder='Login'
                  fluid
                  value={this.state.loginInput}
                  type='text'
                  onChange={i => this.setState({
                    loginInput: i.target.value,
                  })
                  }
                />
              </Grid.Column>
              <Grid.Column />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column />
              <Grid.Column>
                <div className="login-button">
                  <div className="ui buttons">
                    <Button toggle fluid onClick={this.WatchMode}>
                      Watch Mode
                    </Button>
                    <div className="or" />
                    <Button positive fluid onClick={this.addUser}>
                      Sign  In
                    </Button>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column />
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
  changeIsWatchingMode: PropTypes.func.isRequired,
};

export default connect(undefined,
  { addUser, changeIsWatchingMode })(Login);

// export default connect(undefined,
//   dispatch => (
//     {
//       addUser: login => dispatch(addUser(login)),
//       changeIsWatchingMode: isWatchMode => dispatch(changeIsWatchingMode(isWatchMode)),
//       // changeIsWatchingModeFalse: () => dispatch({ type: 'CHANGE_ISWATCHINGMODEFALSE' }),
//     }))(Login);