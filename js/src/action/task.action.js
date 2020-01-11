
import { HttpService } from '../services/service.http'
import { GET_TASK, CREATE_TASK } from '../constant/redux.reducer'

export const requestTask = (bool) => {
    return {
        type: GET_TASK.REQUEST,
        payload: bool
    }
}

export const successTask = (data) => {
    return {
        type: GET_TASK.SUCCESS,
        payload: data
    }
}


export const requestCreateTask = (bool) => {
    return {
        type: CREATE_TASK.REQUEST,
        payload: bool
    }
}

export const successCreateTask = (data) => {
    return {
        type: CREATE_TASK.SUCCESS,
        payload: data
    }
}

export const getAllTask = (url) => {
    const httpService = new HttpService()
    return (dispatch) => {
        dispatch(requestTask(true))

        httpService.get(url)
        .then((response) => {
            dispatch(requestTask(false))
            return response
        })
        .then((response) => {
            dispatch(successTask(response.data))
        })
        .catch((error) => {
            dispatch(successTask(error))
        })
    }    
}


export const createTask = (obj) => {
    // console.log(obj)
    const httpService = new HttpService()
    return (dispatch) => {
        dispatch(requestCreateTask(true))

        httpService.post(obj.url, obj.body)
        .then((response) => {
            dispatch(requestCreateTask(false))
            return response
        })
        .then((response) => {
            dispatch(successCreateTask(response.data))
        })
        .catch((error) => {
            dispatch(successCreateTask(error))
        })
    }    
}