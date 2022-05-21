import { GET_USERS, GET_USERS_ERROR } from '../types'
import axios from 'axios'

export const getUsers = () => async dispatch => {

    try {
        const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    }
    catch (error) {
        dispatch({
            type: GET_USERS_ERROR,
            payload: error,
        })
    }

}