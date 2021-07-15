import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

// import './TextContainer.css';

const useStyles = makeStyles(() => ({
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: "88vh",
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginBottom: '50%'
  },
  userWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5px'
  },
  activeItem: {
    fontFamily: 'Helvetica',
    color: '#828282',
    letterSpacing: '0.3px'
  },
  mainTitle: {
    fontFamily: 'Helvetica',
    color: '#828282',
    letterSpacing: '0.3px',
    marginBottom: '5px',
    fontSize: 24
  },
  onlineIcon: {
    marginRight: '5%',
    backgroundColor: '#009688',
    borderRadius: '50%',
    height: '10px',
    width: '10px'
  },
}));

const CurrUserContainer = ({ users }) => {
  const classes = useStyles();

  return (
    <div className={classes.textContainer}>
      {
        users
          ? (
            <div>
              <div className={classes.mainTitle}>The following users are currently online:</div>
              <div className={classes.activeContainer}>
                {Array.isArray(users) && users.map(({ name }) => (
                  <div key={Math.random()} className={classes.userWrapper}  >
                    <div key={Math.random()} className={classes.onlineIcon} alt="online icon"></div>
                    <div key={name + '_' + Math.random()} className={classes.activeItem}>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
          : null
      }
    </div>
  );
}

export default CurrUserContainer;