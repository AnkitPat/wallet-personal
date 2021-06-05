import { toast } from "react-toastify"
import { axiosInstance } from "../../../utility/api"
import { saveWalletHistoryAction, setLoadingAction } from "./actions"

function fetchWalletAPI() {
    return axiosInstance().get('order/list')
}

// ** fetch bounty list
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