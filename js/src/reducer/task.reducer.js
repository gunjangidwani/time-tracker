import { GET_TASK, CREATE_TASK } from '../constant'
const initalState = {}

export const taskReducer = (state = initalState, action) => {
    switch(action.type) {
        case GET_TASK.REQUEST:
            return action.payload
        case GET_TASK.SUCCESS:
            return action.payload
        case CREATE_TASK.SUCCESS:
            // console.log(state)
            // console.log(action)
            return {
                state: action.payload.state,
                value: state.value.push(action.payload.value)
            }
        default:
            return state
    }
}