import { toast } from "react-toastify"
import { saveTokenInfoAction, setLoadingAction } from "./actions"

async function fetchTokenInfoAPI() {
    const response = await fetch(`https://api.ethplorer.io/getTokenInfo/0x7c32DB0645A259FaE61353c1f891151A2e7f8c1e?apiKey=${process.env.REACT_APP_API_ETHPLORER}`, {method: "GET"})
    return response.json()
  }


// ** fetch token info
export const fetchTokenInfo = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchTokenInfoAPI()
            if (response) {
                dispatch(saveTokenInfoAction(response))
            }
            dispatch(setLoadingAction(false))
        } catch (e) {
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}
