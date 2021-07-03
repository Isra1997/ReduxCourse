
//Library Code
function creatStore(reducer){
    // The store should have four parts:
    // 1. The State
    // 2. Getting the state 
    // 3. Updating the state 
    // 4. Listening to the changes of the state

    let state 
    let listeners = []

    // returns the current state of the store
    const getState = () => state

    // takes in the function that will be called when the state is updted
    const subscribe = (listener) =>{
        listeners.push(listener)
        return ()=> {
            listeners = listeners.filter((l) => l!== listener)
        }
    }

    //update the state inside the store
    const dispatch = (action) =>{
        state  = reducer(state, action)
        listeners.forEach((listener)=> listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }

}

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL ='ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

//Action creators
function addTodoAction(todo){
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction(id){
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction(id){
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction(goal){
    return {
        type: ADD_GOAL,
        goal
    }

}

function removeGoalAction(id){
    return{
        type: REMOVE_GOAL,
        id
    }
}

//App Code

// The =[] added is ES6 sytnax that 
// defines state if the function todo's is called 
// without the function being defined

// The reducer must be a pure function
function todos(state = [],action){
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo)=> todo.id !== action.id)
        case TOGGLE_TODO:
            return  state.map((todo)=> todo.id !== action.id ? todo: Object.assign({},todo,{complete: !todo.complete}))
        default:
            return state
    }
    
}

//Goals reducer
function goals (state =[] , action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal)=> goal.id !== action.id)
        default:
            return state
    }
}

//root reducer
function app(state = {},action){
    return {
        todos: todos(state.todos,action),
        goals: goals(state.goals,action)
    }
}
const store = creatStore(app)

store.subscribe(()=>{
    console.log("The new state is :", store.getState())
})

store.dispatch({
    type:'ADD_TODO',
    todo:{id:0,
        name:'Learn Redux'}
})


