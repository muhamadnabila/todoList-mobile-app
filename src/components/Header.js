import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    AsyncStorage 
} from 'react-native';
import style from '../../style'
import axios from '../server/api'
import { connect } from 'react-redux'
import { updateTodoList } from '../../store/action'

function Header({ updateTodoList, navigation }) {
    
    const [inputSearch, setInputSearch] = useState('')
    
    const handleSearchInput = (value) => {
        axios.get(`todo/user?q=${value}&&filter=all`)
            .then(({ data: { data } }) => {
                updateTodoList(data.sort((a,b) => (a.isDone > b.isDone) ? 1 : ((b.isDone > a.isDone) ? -1 : 0)))
            })
            .catch(err => err)
    }
    const handleLogout = () => {
        navigation.navigate('login')
        removeToken()
        delete axios.defaults.headers.common["Authorization"];
    }

    const removeToken = async function() {
        try {
            await AsyncStorage.removeItem('user-token')
        }catch(err) {
            
        }
    }

    return (
        <View style={style.header}>
            <View style={style.wrapperTitle}>
                <Text style={style.title}>TodoList</Text>
                <Text style={style.logout} onPress={handleLogout}>Logout</Text>
            </View>
            <TextInput 
                onChangeText={handleSearchInput}
                placeholder='Find todo' 
                style={style.input__search} />
        </View>
    )
}

const mapDispatchtoProps = {
    updateTodoList
}

export default connect(null, mapDispatchtoProps)(Header);
