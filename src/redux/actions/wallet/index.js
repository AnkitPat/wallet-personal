import { toast } from "react-toastify"
import { axiosInstance } from "../../../utility/api"
import { handleUserInformation } from "../auth"
import { saveWalletHistoryAction, setLoadingAction } from "./actions"

function fetchWalletAPI() {
    return axiosInstance().get('order/list')
}

function createPaymentAPI(data) {
    return axiosInstance().post('/order/createPayment', data)
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