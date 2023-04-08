- REACT_APP_XXXX in .env to use environment variables
- const XXXX = process.env.REACT_APP_XXXX
- add basic auth for post
```
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
```
- clear message after 3 seconds
```
 .then(res => {
        setMessage(`Temporary password has been sent to ${email}`);
        setUserId('');
        setEmail('');

        setTimeout(() => {
          setMessage('');
        }, 3000);
      })
```