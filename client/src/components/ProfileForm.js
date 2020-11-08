import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextField,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';

import { updateUser } from 'actions/userActions';

class ProfileForm extends Component {
  state = { username: this.props.user.username };

  onInputChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onFormSubmit = () => {
    this.props.updateUser({ username: this.state.username });
  };

  render() {
    return (
      <>
        <DialogContent>
          <div
            style={{
              display: 'flex',
              margin: '2rem',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <TextField
              id="first-name"
              label="First Name"
              disabled
              InputProps={{ readOnly: true }}
              value={this.props.user.first_name}
              variant="outlined"
              style={{ marginBottom: '2rem' }}
            />

            <TextField
              id="last-name"
              label="Last Name"
              disabled
              InputProps={{ readOnly: true }}
              value={this.props.user.last_name}
              variant="outlined"
              style={{ marginBottom: '2rem' }}
              type="text"
            />

            <TextField
              id="username"
              label="username"
              name="username"
              value={this.state.username}
              variant="outlined"
              style={{ marginBottom: '2rem' }}
              type="text"
              onChange={this.onInputChange}
            />
            <TextField
              id="review-count"
              label="Review Count"
              disabled
              InputProps={{ readOnly: true }}
              value={this.props.user.review_count}
              variant="outlined"
              style={{ marginBottom: '2rem' }}
              type="text"
            />
          </div>
        </DialogContent>

        <DialogActions
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          <Button
            onClick={this.props.handleModalClick}
            color="secondary"
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={this.onFormSubmit}
            color="primary"
            variant="outlined"
          >
            Update
          </Button>
        </DialogActions>
      </>
    );
  }
}

export default connect(null, { updateUser })(ProfileForm);
