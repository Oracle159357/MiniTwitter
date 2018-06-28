import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import history from '../history';
import './Style.scss';

import { GetUsers } from '../selectors/GetDataFromStore';


export class Users extends PureComponent {
  UserMode = (login) => {
    history.push(`/user/${login}`);
  };

  render() {
    return (
      <div className='user-list'>
        <div>
          <Label size="large">
            {'ListUsers: '}
          </Label>
        </div>
        <div className="ui middle aligned animated list">
          {
            this.props.users && this.props.users.map((user, index) => (
              <div className="item" key={index}>
                <div className="content">
                  <div className="header">
                    {`${index + 1}.`}
                    <a onClick={() => this.UserMode(user.login)} role="link">
                      {user.login}
                    </a>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    login: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(
  state => (
    {
      users: GetUsers(state),
    }), undefined,
)(Users);
