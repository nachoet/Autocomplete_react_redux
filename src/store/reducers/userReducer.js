import { GET_USERS, GET_USERS_ERROR } from '../types'

const initialState = {
    users: [],
}

export default function userReducer(state = initialState, action) {

    switch (action.type) {

        case GET_USERS:
            return {
                ...state,
                users: action.payload,

            }
        case GET_USERS_ERROR:
            return {
                error: action.payload
            }
        default: return state
    }

}