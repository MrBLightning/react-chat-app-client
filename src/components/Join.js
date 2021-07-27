import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";

import { Button, Paper, InputBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ItemAvatar from './ProfilePic/ItemAvatar';
import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
    width: 300,
    height: 45,
    boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.14)",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  input: {
    borderRadius: '0',
    width: '100%'
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    height: "100vh",
    alignItems: "center",
    backgroundColor: "#1A1A1D"
  },
  button: {
    color: "#fff !important",
    background: "#2979FF",
    fontWeight: 600,
    padding: "20px",
    borderRadius: "5px",
    display: "inline-block",
    border: "none",
    width: "10%",
    minWidth: '200px',
    marginTop: "15px",
    "&:hover": {
      backgroundColor: "coral",
    },
  },
  title: {
    color: "white",
    textAlign: "center",
    padding: "0px 0px 20px 0px",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [croppedImage, setCroppedImage] = React.useState(null);

  const goToChat = async () => {
    let problem = false;
    if (!name) {
      alert('A user name is required to join the chat');
      problem = true;
    }
    if (name && name === 'admin') {
      alert(`You may not use the nickname 'admin' to enter the chat`);
      problem = true;
    }
    if (pic && pic !== '' && !croppedImage) {
      if (pic.substring(0, 7) !== 'http://' && pic.substring(0, 8) !== 'https://') {
        alert('image link should be a valid URL');
        problem = true;
      }
      if (pic.match(/\.(jpeg|jpg|gif|png)$/) === null) {
        alert('image link should be jpg, png or gif file only');
        problem = true;
      }
    }
    if (croppedImage) {
      const formData = new FormData();
      formData.append('profile-pic', croppedImage);
      await axios
        .post(REACT_APP_ENDPOINT + `images`, formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then(({ data }) => {
          localStorage.setItem('pic', data.s3url);
        })
        .catch((error) => {
          const errorMsg =
            error?.response?.data?.message || error?.response?.status === 413
              ? 'File is too large'
              : error;
          alert('Something went wrong uploading your picture: ', errorMsg);
          problem = true;
        });
    }
    if (!problem) {
      if (!croppedImage) {
        saveToStorage();
      }
      history.push(`/chat?name=${name.trim().toLowerCase()}`);
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('pic', pic);
  }

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h4" classes={{ root: classes.title }}>
          <StarIcon /> Join the Chat <StarIcon />
        </Typography>
      </div>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Enter your Nickname"
          inputProps={{ "aria-label": "enter user name" }}
          onChange={(event) => setName(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? goToChat() : null}
        />
      </Paper>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Enter user Image URL"
          inputProps={{ "aria-label": "enter user image URL" }}
          onChange={(event) => setPic(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? goToChat() : null}
        />
      </Paper>
      <ItemAvatar croppedImage={croppedImage} setCroppedImage={(e) => setCroppedImage(e)} />
      <Button variant="contained" className={classes.button} onClick={() => goToChat()}>
        Join The Chat
      </Button>
      {/* <img src='http://localhost:5000/images/35e769159ec72cff096ee4d5a5fb87e5' ></img> */}
    </div>
  );
}