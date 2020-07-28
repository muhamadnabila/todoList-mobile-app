const initialState = {
    todoList: [],
    isLoadingFetchTodoList: false,
    isFetchTodoListError: false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_TODOLIST_SUCCESS":
            return {
                ...state,
                todoList: action.data,
                isLoadingFetchTodoList: false
            };
        case "LOADING_FETCH_TODOLIST":
            return {
                ...state,
                isLoadingFetchTodoList: true
            };
        case "FETCH_TODOLIST_ERROR":
            return {
                ...state,
                isFetchTodoListError: true
            };
        case "UPDATE_TODOLIST":
            return {
                ...state,
                todoList: action.data
            }
            default:
                return state;
            }
  };
  