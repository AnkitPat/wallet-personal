import axios from "axios"
import { toast } from "react-toastify"
import { handleUserInformation } from "../auth"
import { saveEarningsAction, saveSpentHistoryAction, saveWalletHistoryAction, setLoadingAction } from "./actions"

function fetchWalletAPI() {
    return axios.get('order/list')
}

function fetchEarningsAPI() {
    return axios.get('bounty/earnings')
}

function fetchSpentsAPI() {
    // return axios.get('bounty/earnings')
    return null
}

function createPaymentAPI(data) {
    return axios.post('/order/createPayment', data)
  }  

// ** fetch history list
export const fetchWalletHistories = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchWalletAPI()
            if (response && response.data) {
                dispatch(saveWalletHistoryAction(response.data))
            }
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}


// ** create payment
export const createPayment = (id) => {
    return async (dispatch) => {
        try {
           await createPaymentAPI({session_id: id})
           dispatch(handleUserInformation())
        } catch (e) {
            console.log(e)
            toast.error('Error in creating payment, try again!!')
        }
    }
}

// ** fetch earnings
export const fetchEarnings = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchEarningsAPI()
            if (response && response.data) {
                dispatch(saveEarningsAction(response.data))
            }
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}

// ** fetch spents
export const fetchSpents = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchSpentsAPI()
            if (response && response.data) {
                dispatch(saveSpentHistoryAction(response.data))
            }
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}
