import React from 'react';
import { ListItem, ListItemText } from "@material-ui/core";

function ChatMessage(props){
    const content = props.content;
    const name = props.name;
    return(
        <React.Fragment>
            <ListItem divider>
                <ListItemText primary={name + ': ' + content} />
            </ListItem>
        </React.Fragment>
    )
}

export default ChatMessage;