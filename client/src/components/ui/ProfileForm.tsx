import React from 'react';
import {
  TextField,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';

import useStyles from '../../assets/styles/ProfileForm';

type ProfileFormProps = {
  user: { first_name: string; last_name: string; review_count: string };
  username: string;
  handleModalClick: () => void;
  handleChange: () => void;
  onFormSubmit: () => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  username,
  handleModalClick,
  handleChange,
  onFormSubmit,
}) => {
  const classes = useStyles();

  function renderTextField(
    id: string,
    label: string,
    disabled: boolean,
    value: string,
    fn?: () => void
  ): React.ReactNode {
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
          {renderTextField('first-name', 'First Name', true, user.first_name)}
          {renderTextField('last-name', 'Last Name', true, user.last_name)}
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
            user.review_count
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
