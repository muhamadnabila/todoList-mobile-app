import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage 
} from 'react-native';
import style from '../../style'
import styled from 'styled-components/native'
import axios from '../server/api'
import { connect } from 'react-redux'
import Notification from './Notification' 
import { setAuth } from '../../store/action'

function Login({ navigation, setAuth }) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isPageActive, setIsPageActive] = useState('login')
    const [pushNotification, setPushNotification] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAuthStorage()
    }, [])

    async function getAuthStorage() {
        const token = await AsyncStorage.getItem('user-token')
        if(token) {
            axios.defaults.headers.common['Authorization'] = token
            navigation.navigate('home')
        }
    }

    const handleSubmit = () => {
        let url = ''
        let param = {}
        if(isPageActive == 'login') {
            url = 'auth/login';
            param = { email, password }
        }else {
            url = 'auth/register'
            param = { name, email, password }
        }
        setIsLoading(true)
        axios.post(url, param)
            .then( ({data: {data}}) => {
                setIsLoading(false)
                navigation.navigate('home')
                axios.defaults.headers.common['Authorization'] = data.token
                setAuthStorage(data.token)
            })
            .catch(err => {
                setIsLoading(false)
                setPushNotification({msg: 'Username / password invalid', type: 'error'})
            })
    }
    const setAuthStorage = async function(token) {
        try {
            await AsyncStorage.setItem('user-token', token)
        }catch(err) {
            
        }
    } 
    return (
        <View style={style.containerLogin}>

            <Text style={style.text__welcome}>WELCOME</Text>
            {pushNotification && <Notification pushNotification={pushNotification} setPushNotification={setPushNotification}/>}
            {
                isLoading && (
                    <Text>Loading...</Text>
                )
            }
            <View style={style.form__login}>
                <Text style={style.text__login}>{isPageActive === 'login' ? 'Login' : 'Sign Up' }</Text>
                {
                    isPageActive === 'signup' && (
                        <>
                            <Text style={style.text__white}>Name</Text>
                            <TextInput 
                                placeholderTextColor="#000" 
                                placeholder="You Name"
                                value={name}
                                autoFocus={true}
                                style={style.login__input}
                                onChangeText={(text) => setName(text)}
                                />
                        </>
                    )
                }
                <Text style={style.text__white}>Email</Text>
                <TextInput 
                    placeholderTextColor="#000" 
                    placeholder="user@example.com"
                    value={email}
                    autoFocus={true}
                    style={style.login__input}
                    onChangeText={(text) => setEmail(text)}
                    />
                <Text style={style.text__white}>Password</Text>
                <TextInput 
                    secureTextEntry={true}
                    placeholderTextColor="#000" 
                    placeholder="Password"
                    style={style.login__input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button onPress={handleSubmit} title={isPageActive === 'login' ? 'LOGIN': 'SIGN UP' }/>
                <Text onPress={() => setIsPageActive(isPageActive === 'login' ? 'signup' : 'login')} style={style.text__signup}>{isPageActive === 'login' ? 'Sign Up' : 'Login' }</Text>
            </View>
        </View>
    )
}
const mapDispatchtoProps = {
    setAuth
}
export default connect(null, mapDispatchtoProps)(Login);