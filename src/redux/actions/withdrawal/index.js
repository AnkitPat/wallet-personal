import axios from "axios"
import { toast } from "react-toastify"
import { setAllWithdrawalHistoryAction, setLoadingAction, setPageLoadingAction, setWithdrawalHistoryAction } from "./actions"
import { history } from "../../../utility/Utils"

function transferCreditsAPI(data) {
    return axios.post('withdrawal', data)
}

function fetchWithdrawalList() {
    return axios.get('withdrawal/my')
}

function fetchAllWithdrawalList() {
    return axios.get('withdrawal/all')
}

function approveWithdrawalAPI(id) {
    return axios.post('withdrawal/approve', { id })
}

function rejectWithdrawalAPI(body) {
    return axios.post('withdrawal/decline', body)
}
// ** Transfer credit to PTM
export const transferCredits = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            await transferCreditsAPI(data)
            toast.success("Withdrawal request placed successfully")
            history.push('/wallet/transactions')
            dispatch(setLoadingAction(false))
        } catch (e) {
            dispatch(setLoadingAction(false))
            toast.error(e.response.data.message)
        }
    }
}

// ** fetch history list
export const fetchWithdrawalHistories = () => {
    return async (dispatch) => {
        try {
            dispatch(setPageLoadingAction(true))
            const response = await fetchWithdrawalList()
            if (response && response.data) {
                dispatch(setWithdrawalHistoryAction(response.data))
            }
            dispatch(setPageLoadingAction(false))
        } catch (e) {
            dispatch(setPageLoadingAction(false))
            toast.error(e.response.data.message)
        }
    }
}

// ** fetch history list
export const fetchAllWithdrawalRequests = () => {
    return async (dispatch) => {
        try {
            dispatch(setPageLoadingAction(true))
            const response = await fetchAllWithdrawalList()
            if (response && response.data) {
                dispatch(setAllWithdrawalHistoryAction(response.data))
            }
            dispatch(setPageLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setPageLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}

// ** fetch history list
export const approveWithdrawal = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await approveWithdrawalAPI(id)
            dispatch(fetchAllWithdrawalRequests())
            dispatch(setLoadingAction(false))
            toast.success('Request Approved')

        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in approving')
        }
    }
}

// ** fetch history list
export const rejectWithdrawal = (body) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await rejectWithdrawalAPI(body)
            dispatch(fetchAllWithdrawalRequests())
            toast.success('Rejected request')
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in rejecting')
        }
    }
}
