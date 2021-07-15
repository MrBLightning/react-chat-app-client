import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import ReactEmoji from 'react-emoji';

const useStyles = makeStyles(() => ({
  userImg: {
    borderRadius: '50%',
    height: '40px',
    width: '40px',
    margin: '5px'
  },
  userTag: {
    borderRadius: '50%',
    height: '40px',
    width: '40px',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: 2.4,
    color: 'white',
    margin: '5px'
  },
  messageContainerEnd: {
    display: 'flex',
    alignItems: "center",
    padding: '0 5%',
    marginTop: '3px',
    justifyContent: 'flex-end'
  },
  messageContainerStart: {
    display: 'flex',
    alignItems: "center",
    padding: '0 5%',
    marginTop: '3px',
    justifyContent: 'flex-start'
  },
  messageBoxBlue: {
    background: '#2979FF',
    borderRadius: '20px',
    padding: '5px 20px',
    color: 'white',
    display: 'inline-block',
    maxWidth: '80%'
  },
  messageBoxLight: {
    background: '#F3F3F3',
    borderRadius: '20px',
    padding: '5px 20px',
    color: 'white',
    display: 'inline-block',
    maxWidth: '80%'
  },
  messageTextDark: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    color: '#353535',
    letterSpacing: '0.3px'
  },
  messageTextWhite: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    color: 'white',
    letterSpacing: '0.3px'
  },
  sentTextPR:{
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    color: '#828282',
    letterSpacing: '0.3px',
    paddingRight: '10px'
  },
  sentTextPL:{
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    color: '#828282',
    letterSpacing: '0.3px',
    paddingLeft: '10px'
  },
}));

const Message = ({ message: { text, user, pic }, name }) => {
  const classes = useStyles();
  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false);
  const [usePic, setUsePic] = useState(pic);
  const trimmedName = name.trim().toLowerCase();

  useEffect(() => {
    if (user === trimmedName) {
      setIsSentByCurrentUser(true);
    }
  }, [user, trimmedName]);

  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
  }

  useEffect(() => {
    if (isSentByCurrentUser) {
      const savedPic = localStorage.getItem('pic');
      if ((!usePic || usePic === '') && savedPic && savedPic !== '') {
        setUsePic(savedPic);
      }
    }
  }, [isSentByCurrentUser, usePic]);

  const intToRGB = (i) => {
    let c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  return (
    <>
      {
        isSentByCurrentUser
          ? (
            <div className={classes.messageContainerEnd} >
              {usePic && usePic !== ''
                ? <img src={usePic} alt={name + " image"} className={classes.userImg} />
                : <div className={classes.userTag} style={{ backgroundColor: "#" + intToRGB(hashCode(user)) }}
                >{trimmedName.toUpperCase().charAt(0)}</div>
              }
              <p className={classes.sentTextPR}>{trimmedName}</p>
              <div className={classes.messageBoxBlue}>
                <p className={classes.messageTextWhite}>{ReactEmoji.emojify(text)}</p>
              </div>
            </div>
          )
          : (
            <div className={classes.messageContainerStart}>
              <div className={classes.messageBoxLight}>
                <p className={classes.messageTextDark}>{ReactEmoji.emojify(text)}</p>
              </div>
              <p className={classes.sentTextPL}>{user}</p>
              {usePic && usePic !== ''
                ? <img src={usePic} alt={name + " image"} className={classes.userImg} />
                : <div className={classes.userTag} style={{ backgroundColor: "#" + intToRGB(hashCode(user)) }}
                >{user.toUpperCase().charAt(0)}</div>
              }
            </div>
          )
      }
    </>
  );
}

export default Message;