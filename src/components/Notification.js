import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    Picker,
} from 'react-native';
import styled from 'styled-components/native'

const NotificationWrapper = styled.View`
    background: ${({type}) => type == 'error' ? 'red' : 'green'};
`
const NotificationText = styled.Text`
    color: white;
    text-align: center;
`
function Notification({ pushNotification, setPushNotification }) {
    
    useEffect(() => {
        setTimeout(() => {
            setPushNotification(null)
        }, 2000)
    }, [])

    
    return (
        <>
            {
                pushNotification && (
                    <NotificationWrapper type={pushNotification.type}>
                        <NotificationText>{pushNotification.msg}</NotificationText>
                    </NotificationWrapper>
                )
            }
        </>
    )
}


export default Notification