import axios from "axios"
import {toast} from "react-toastify"
import {savePlansActions, setLoadingAction} from "./actions"
import { history } from "../../../utility/Utils"


function fetchPlansAPI() {
    return axios.get('subscriptions')
}

function saveSubscription(data) {
    return axios.post('subscriptions/createPayment', data)
}

// ** fetch plans list
export const fetchPlans = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchPlansAPI()
            if (response && response.data) {
                dispatch(savePlansActions(response.data))
            }
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}

export const saveSubscriptionPayment = (id) => {
    return async (dispatch) => {
        try {
            await saveSubscription({session_id: id})
            toast('Successfully Subscribed')
            history.push('/home')
        } catch (e) {
            toast.error('Something went wrong')
        }
    }
}
