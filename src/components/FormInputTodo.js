import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Button,
    Modal,
    Picker,
} from 'react-native';
import styled from 'styled-components/native'
import style from '../../style'
import axios from '../server/api'
import { connect } from 'react-redux'
import { updateTodoList } from '../../store/action'
import Notification from './Notification' 

function FormInputTodo({ todoList, updateTodoList, todoDataTemp, setTodoDataTemp }) {
    const [inputSearch, setInputSearch] = useState('Find Task')
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedPriority, setSelectedPriority] = useState(null)
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [pushNotification, setPushNotification] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    useEffect(() => {
        if(todoDataTemp) {
            setModalVisible(true)
            setTitle(todoDataTemp.title)
            setNote(todoDataTemp.note)
            setSelectedPriority(todoDataTemp.priority)
        }
    },[todoDataTemp])

    const handleSubmit = ()=> {
            setIsLoading(true)
            
            let url = 'todo'
            let method = 'POST'
            if(todoDataTemp) {
                url += `/${todoDataTemp.id}`
                method = 'PUT'
            }
            axios({ 
                url, 
                data: { 
                        title, 
                        note,
                        priority: selectedPriority 
                    }, 
                method })
            .then(({data: {data}}) => {
                setModalVisible(false)
                setIsLoading(false)
                if(todoDataTemp) {
                    let newTodo = todoList.map(todo => {
                            if(todo.id == todoDataTemp.id) {
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
                    
                }else {
                    let newTodo = [...todoList]
                    setPushNotification({msg: 'New Task Added', type: 'success'})
                    newTodo.push(data)
                    updateTodoList(newTodo)
                    setTitle('')
                    setNote('')
                    setSelectedPriority(null)
                }

            })
            .catch(err => {
                setIsLoading(false)
                setPushNotification({msg: 'Error Add New Task', type: 'error'})
            })
    }
    const handleClickButtonCancel = () => {
        setModalVisible(false)
        setTodoDataTemp(null)
        setTitle('')
        setNote('')
        setSelectedPriority(null)
    }
    return (
        <View>
            {
                !modalVisible && (
                    <Button 
                        title="+ Add new todo" 
                        onPress={() => setModalVisible(true)}
                    />
                )
            }
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    >
                    <View style={style.modalView}>
                        <View style={style.form}>
                            <TextInput 
                                style={style.form__input} 
                                placeholderTextColor="#ffff" 
                                placeholder="What is to be done ?"
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                                />
                            <TextInput 
                                style={style.form__input} 
                                placeholderTextColor="#ffff" 
                                placeholder="Do you have any note for it ?"
                                value={note}
                                onChangeText={(text) => setNote(text)}
                                />
                            <Text style={{marginLeft: 10, marginTop: 5, color: '#ffff'}}>Set priority</Text>
                            <Picker
                                selectedValue={selectedPriority}
                                style={{ height: 50, width: 150, padding: 10, color: '#ffff' }}
                                onValueChange={(itemValue, itemIndex) => setSelectedPriority(itemValue)}
                                >
                                <Picker.Item label="Low" value="1" />
                                <Picker.Item label="Medium" value="2" />
                                <Picker.Item label="High" value="3" />
                            </Picker>
                            {pushNotification && <Notification pushNotification={pushNotification} setPushNotification={setPushNotification}/>}
                            {
                                isLoading ? (<Text style={{color: 'white'}}>LOADING...</Text>)
                                            : (
                                                <>
                                                    <TouchableHighlight style={style.button__submitTask}>
                                                        <Button color={todoDataTemp && 'green'} onPress={handleSubmit} title={todoDataTemp ? "Edit task" : "Submit task" }/>
                                                    </TouchableHighlight>
                                                    <Button color="red" style={style.button__cancel} onPress={handleClickButtonCancel} title="Cancel"/>
                                                </>
                                            )
                            }
                        </View>
                    </View>
                </Modal>
            </View>
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
export default connect(MapStateToProps, mapDispatchtoProps)(FormInputTodo);
