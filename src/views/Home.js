import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';
import styled from 'styled-components/native'
import Header from '../components/Header'
import FormInputTodo from '../components/FormInputTodo'
import Card from '../components/Card'
import style from '../../style'
import { fetchTodoList } from '../../store/action'
import { connect } from 'react-redux'
import Notification from '../components/Notification'

function Home({ navigation, fetchTodoList, todoList, isLoadingFetchTodoList, isFetchTodoListError }) {
    
    const [categoryButtonSelected, setCategoryButtonSelected] = useState('1')
    const [todoDataTemp, setTodoDataTemp] = useState(null)
    
    useEffect(()=> {
        {/**
            - first render Home component -
            Fetch todo list data through action and store data in redux
        */}
        fetchTodoList()

    }, [])

    const handleEditTodo = (payload) => {
        setTodoDataTemp(payload)
    }
    
    return (
        <SafeAreaView style={style.container}>
            <Header navigation={navigation}/>
            <View style={style.mainContent}>
                <FormInputTodo setTodoDataTemp={setTodoDataTemp} todoDataTemp={todoDataTemp}/>
                <ScrollView>
                    {
                        isLoadingFetchTodoList ? 
                            <Text>Fetching todo list data...</Text>
                            :
                            isFetchTodoListError ? 
                                <Text style={{color: 'red'}}>ERROR Fetching todo list data...</Text>
                                    :
                                        todoList.map(todo => {
                                            return (
                                                <Card key={todo.id} todoData={todo} handleEditTodo={handleEditTodo}/>
                                            )
                                        })
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const MapStateToProps = state => {
    return {
        todoList: state.todoList,
        isLoadingFetchTodoList: state.isLoadingFetchTodoList,
        isFetchTodoListError: state.isFetchTodoListError
    }
}
const mapDispatchtoProps = {
    fetchTodoList
}
export default connect(MapStateToProps, mapDispatchtoProps)(Home);