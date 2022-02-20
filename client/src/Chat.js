import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({socket, username, room}){

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            };

            await socket.emit('Send Message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }


    useEffect(() => {
        socket.on('Receive Message', (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        })
    }, [socket]);

    return(
        <div className='chatWindow'>
            <div className='chatHeader'>
                <p>Live Chat</p>
            </div>
            <div className='chatBody'>
                <ScrollToBottom className='messageContainer'>
                {messageList.map((messageContent) => {
                    return(
                        <div className='message'
                        id={username === messageContent.author ? "you" : "other"}>
                            <div>
                                <div className='messageContent'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='messageMeta'>
                                    <p>{messageContent.time}</p>
                                    <p>{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </ScrollToBottom>
            </div>
            <div className='chatFooter'>
                <input type='text'
                       value={currentMessage} 
                       placeholder='Hey...'
                       onChange={(i) => setCurrentMessage(i.target.value)}
                       onKeyPress={(event) => event.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat;