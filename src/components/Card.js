import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import style from '../../style'
import styled from 'styled-components/native'
import axios from '../server/api'
import { connect } from 'react-redux'
import { updateTodoList } from '../../store/action'
import moment from 'moment'
import Notification from './Notification' 

const WrapperCard = styled.TouchableOpacity`
    border-left-color: ${({ prior }) => prior == 1 ? 'yellow' : prior == 2 ? 'green' : 'red' };
`
const TodoTitle = styled.Text`
    color: ${({isDone}) => isDone ? '#a9a9a9' : 'black' };
`
function Card({ todoData, todoList, updateTodoList, handleEditTodo }) {
    
    const [inputSearch, setInputSearch] = useState('Find Task')
    const [isOpenCardDetail, setIsOpenCardDetail] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isCompletedTodo, setIsCompletedTodo] = useState(todoData.isDone)
    const [pushNotification, setPushNotification] = useState(null)

    const handleDeleteTodo = ()=> {
        setIsLoading(true)
        axios.delete(`todo/${todoData.id}`)
        .then(() => {
            setIsLoading(false)
            updateTodoList(todoList.filter(todo => todo.id !== todoData.id))
        })
        .catch(() => {
            setIsLoading(false)
        })
    }
    const handleIsCompletedTodo = (value) => {
        axios({ 
            url: `todo/${todoData.id}`, 
            data: {isDone: value}, 
            method: 'PUT' })
        .then(({data: {data}}) => {
            let newTodo = todoList.map(todo => {
                    if(todo.id == todoData.id) {
                        return {
                            ...todo,
                            id: data.id,
                            title: data.title,
                            note: data.note,
                            isDone: data.isDone,
                            priority: data.priority,
                            user_id: data.user_id,
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt
                        }
                    }else return todo
                })
            updateTodoList(newTodo)
        })
        .catch(err => {
            setPushNotification({msg: 'Error Change Task Status', type: 'error'})
        })
        setIsCompletedTodo(value)

    } 
    return (
        <View>
            {pushNotification && <Notification pushNotification={pushNotification} setPushNotification={setPushNotification}/>}
            <WrapperCard 
                isDone={todoData.isDone} 
                prior={todoData.priority} 
                onPress={() => setIsOpenCardDetail(!isOpenCardDetail)} 
                style={style.card}
            >
                <CheckBox 
                    disabled={false}
                    value={isCompletedTodo}
                    onValueChange={handleIsCompletedTodo}
                />
                <TodoTitle isDone={todoData.isDone} style={style.text__todoTitle}>{todoData.title}</TodoTitle>
            </WrapperCard>
            {
                isOpenCardDetail && (
                    <View style={style.cardDetail}>
                        <Text>{todoData.note}</Text>
                        <Text style={style.text__grey}>Priority: {todoData.priority == 1 ? 'LOW' : todoData.priority == 2 ? 'MEDIUM' : 'HIGH'}</Text>
                        <Text style={style.text__grey}> Created At: {moment(todoData.createdAt).format('MMMM Do YYYY')}</Text>
                        {   
                            isLoading ? (<Text>LOADING...</Text>)
                                        : (
                                            <View style={style.wrapperButton}>
                                                <Text style={style.button__editTask} onPress={() => handleEditTodo(todoData)}>Edit</Text>
                                                <TouchableWithoutFeedback>
                                                    <Text style={style.button__deleteTask} onPress={handleDeleteTodo}>Delete</Text>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        )
                        }
                    </View>
                )
            }
        </View>
    )
}
const MapStateToProps = state => {
    return {
        todoList: state.todoList,
    }
}
const mapDispatchtoProps = {
    updateTodoList
}
export default connect(MapStateToProps, mapDispatchtoProps)(Card);