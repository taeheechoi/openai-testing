import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const baseURL = process.env.REACT_APP_BASE_URL;
const epicorUserID = process.env.REACT_APP_EPICOR_USERID;
const epicorPassword = process.env.REACT_APP_EPICOR_PASSWORD;

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(4),
  },

  submitButton: {

    marginTop: theme.spacing(2),
  },
  message: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!userId || !email) {
      setMessage('Please enter your User ID and Email.');
      return;
    }

    axios.post(`${baseURL}/Ice.BO.UserFileSvc/ResetPassword`, {
      "userID": userId,
      "setToBlank": "false",
      "email": email
    }, {
      auth: {
        username: epicorUserID,
        password: epicorPassword
      }
    })

      .then(res => {
        setMessage(`Temporary password has been sent to ${email}`);
        setUserId('');
        setEmail('');

        setTimeout(() => {
          setMessage('');
        }, 3000);
      })
      .catch(err => {
        setMessage(err.response.data);
      });
  }

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Reset Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              label="User ID"
              type="text"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <div className={classes.submitButton}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Reset Password
              </Button>
            </div>
          </form>

          {message && (
            <Typography variant="body1" className={classes.message}>
              {message}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
