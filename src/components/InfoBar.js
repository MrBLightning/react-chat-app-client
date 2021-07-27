import React from 'react';

import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const { REACT_APP_ENDPOINT } = process.env;

const useStyles = makeStyles(() => ({
  infoBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px 4px 0 0',
    height: '65px',
    width: '100%',
  },
  leftInnerContainer: {
    flex: '0.5',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5%',
  },
  rightInnerContainer: {
    flex: '0.5',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '5%',
  },
  onlineIcon: {
    marginRight: '5%',
    backgroundColor: '#009688',
    borderRadius: '50%',
    height: '10px',
    width: '10px'
  },
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
  headerInfoText: {
    fontFamily: 'Helvetica',
    color: '#828282',
    letterSpacing: '0.3px'
  }
}));

const InfoBar = ({ name, pic }) => {
  const classes = useStyles();
  const history = useHistory();

  if (pic && pic !== '' && pic.substring(0, 7) !== 'http://' && pic.substring(0, 8) !== 'https://') {
    pic = REACT_APP_ENDPOINT + pic;
  }

  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
  }

  const intToRGB = (i) => {
    let c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  return (
    <div className={classes.infoBar}>
      {name && name !== '' &&
        <>
          <div className={classes.leftInnerContainer}>
            <div className={classes.onlineIcon} alt="online icon"></div>
            <div className={classes.headerInfoText}>Logged in as {name}</div>
            {pic !== '' ? <img className={classes.userImg} src={pic} alt={name + " image"} />
              : <div className={classes.userTag} style={{ backgroundColor: "#" + intToRGB(hashCode(name)) }}
              >{name.toUpperCase().charAt(0)}</div>}
          </div>
          <div className={classes.rightInnerContainer}>
            <CloseIcon alt="close icon" fontSize="small" onClick={() => history.push('/')} />
          </div>
        </>
      }
    </div>
  );
}

export default InfoBar;