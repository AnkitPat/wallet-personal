import axios from "axios"
import { toast } from "react-toastify"
import { setLoadingAction } from "./actions"

function transferCreditsAPI(credits) {
    return axios.get('')
}

// ** Transfer credit to PTM
export const transferCredits = (credits) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await transferCreditsAPI(credits)
            toast.success("Successfully Transfered!!")
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}
