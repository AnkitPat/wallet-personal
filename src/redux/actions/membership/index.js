import axios from "axios"
import { toast } from "react-toastify"
import { savePlansActions, setLoadingAction } from "./actions"

function fetchPlansAPI() {
    return axios.get('subscriptions')
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
