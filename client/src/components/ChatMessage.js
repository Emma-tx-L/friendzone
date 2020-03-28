import React from 'react';

function ChatMessage(props){
    const time = props.time;
    const content = props.content;
    const name = props.name;
    return(
        <React.Fragment>
            <p>{name}</p>
            <p>{time}</p>
            <p>{content}</p>
        </React.Fragment>
    )
}

export default ChatMessage;