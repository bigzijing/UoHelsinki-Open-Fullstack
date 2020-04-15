import React from 'react'

const Notification = ({ message }) => {
    const messageStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 15,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        ...messageStyle,
        color: 'red'
    }

    if (message === null) {
        return null
    }

    if (message.includes("removed from server")) {
        return (
            <div style={errorStyle} className="message">
                {message}
            </div>
        )
    }

    else return (
        <div style={messageStyle} className="message">
            {message}
        </div>
    )
}

export default Notification