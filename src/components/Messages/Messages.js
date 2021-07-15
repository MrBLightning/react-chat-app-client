import React, { useRef, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Message from './Message';

const useStyles = makeStyles(() => ({
  messages: {
    padding: '5% 0',
    overflow: 'auto',
    flex: 'auto'
  },
}));


const Messages = ({ messages, name }) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={classes.messages}>
      {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
      <div ref={messagesEndRef} />
    </div>
  )
};

export default Messages;