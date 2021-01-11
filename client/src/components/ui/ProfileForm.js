import React from 'react';
import {
  TextField,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';

import useStyles from '../../assets/styles/ProfileForm';

const ProfileForm = ({
  user,
  username,
  handleModalClick,
  handleChange,
  onFormSubmit,
}) => {
  const classes = useStyles();

  function renderTextField(id, label, disabled, value, fn) {
    return (
      <TextField
        id={id}
        label={label}
        disabled={disabled}
        InputProps={{ readOnly: disabled }}
        value={value}
        variant="outlined"
        className={classes.textfield}
        onChange={fn}
      />
    );
  }

  return (
    <>
      <DialogContent>
        <div className={classes.contentContainer}>
          {renderTextField(
            'first-name',
            'First Name',
            true,
            user.user.first_name
          )}
          {renderTextField('last-name', 'Last Name', true, user.user.last_name)}
          {renderTextField(
            'username',
            'username',
            false,
            username,
            handleChange
          )}
          {renderTextField(
            'review-count',
            'Review Count',
            true,
            user.user.review_count
          )}
        </div>
      </DialogContent>

      <DialogActions className={classes.actionsContainer}>
        <Button onClick={handleModalClick} color="secondary" variant="outlined">
          Close
        </Button>
        <Button onClick={onFormSubmit} color="primary" variant="outlined">
          Update
        </Button>
      </DialogActions>
    </>
  );
};

export default ProfileForm;
