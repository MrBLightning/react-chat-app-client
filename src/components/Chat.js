import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CurrUserContainer from './CurrUsersContainer';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar';
import Input from './Input';

const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        margin: '0',
        backgroundColor: '#d9dbd4',
        minWidth: '500px'
    },
    headerBackGreen: {
        backgroundColor: '#009688',
        position: 'fixed',
        height: '110px',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: 10
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        boxShadow: '0 3px 4px 0 rgba(0, 0, 0, 0.14)',
        padding: '0',
        margin: '20px',
        borderRadius: '5px',
        width: '100%'
    },
    containerRight: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#e5ddd5',
        padding: '0',
        minWidth: '80%',
        zIndex: 100
    },
    containerLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#e5ddd5',
        padding: '0',
        zIndex: 100,
        borderRight: '1px solid lightgray',
        '@media screen and (min-width: 0px) and (max-width: 800px)': {
            display: 'none'
        }
    },
    scroll: {
        height: '80.3vh',
        width: '100%',
        overflowY: 'scroll',
    },
}));

let socket;
const room = 'default';

const Chat = ({ location }) => {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const ENDPOINT = 'localhost:5000'; // For local testing
    const ENDPOINT = 'https://barak-react-chat-app.herokuapp.com/'; // for prod

    useEffect(() => {
        const { name } = queryString.parse(location.search);
        const newName = name ? name.trim().toLowerCase() : name; 
        
        if (!newName || newName === '' || newName === 'admin') {
            history.push('/');
        }

        const pic = localStorage.getItem('pic');

        socket = io(ENDPOINT);

        setName(newName);
        setPic(pic);

        socket.emit('join', { name: newName, room }, (error) => {
            if (error) {
                alert(error);
                history.push('/');
            }
        });
    }, [ENDPOINT, location.search, history]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            console.log('roomData',users.length);
            setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', { name, message }, () => setMessage(''));
        }
    }

    return (
        <Container className={classes.wrapper}>
            <div className={classes.headerBackGreen}></div>
            <Container className={classes.topContainer}>
                <Container className={classes.containerLeft}>
                    <InfoBar />
                    <CurrUserContainer users={users} />
                </Container>
                <Container className={classes.containerRight}>
                    <InfoBar name={name} pic={pic} />
                    <div className={classes.scroll}>
                        <Messages messages={messages} name={name} />
                    </div>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </Container>
            </Container>
        </Container>
    );
}

export default Chat;