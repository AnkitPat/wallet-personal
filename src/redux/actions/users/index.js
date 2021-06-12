import axios from "axios"
import { toast } from "react-toastify"
import { saveUsersListAction, setLoadingAction } from "./actions"

async function fetchUsersList(page, limit, searchTerm) {
    if (searchTerm.length > 0) return axios.get(`admin/all-users?page=${page}&limit=${limit}&search=${searchTerm}`)
    else return axios.get(`admin/all-users?page=${page}&limit=${limit}`)
}


async function blockUserApi(userId, block) {
    return axios.put(`/admin/block-user/`, {
        id: userId,
        block
    })
}

// ** fetch token info
export const fetchUsers = (page, limit, searchTerm = '') => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchUsersList(page, limit, searchTerm)
            if (response && response.data) {
                dispatch(saveUsersListAction(response.data))
            }
            dispatch(setLoadingAction(false))
        } catch (e) {
            dispatch(setLoadingAction(false))
            console.log(e)
            toast.error('Error in fetching')
        }
    }
}

export const blockUser = (userId, page, limit, block, searchTerm) => {
    return async (dispatch) => {

        try {
            const response = await blockUserApi(userId, block)
            toast.success('User blocked')
            dispatch(fetchUsers(page - 1, limit, searchTerm))
        } catch (e) {
            toast.error(e)
            console.log(e)
        }
    }
}