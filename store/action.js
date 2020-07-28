import axios from '../src/server/api'

export function fetchTodoList () {
    return (dispatch) => {
        dispatch({
            type: 'LOADING_FETCH_TODOLIST'
        })
        axios.get('todo/user?filter=all')
        .then(({ data : {data} }) => {
                dispatch({
                    type: 'FETCH_TODOLIST_SUCCESS',
                    data: data.sort((a,b) => (a.isDone > b.isDone) ? 1 : ((b.isDone > a.isDone) ? -1 : 0))
                })
            })
        .catch(err => {
            dispatch({
                type: 'FETCH_TODOLIST_ERROR',
                err
            })
        })
    };
}

export function updateTodoList (payload) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_TODOLIST',
            data: payload
        })
    };
}

export function setAuth (payload) {
    return (dispatch) => {
        dispatch({
            type: 'SET_AUTH',
            data: payload
        })
    };
}
