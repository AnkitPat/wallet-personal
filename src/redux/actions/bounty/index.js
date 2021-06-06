import axios from "axios"
import { toast } from "react-toastify"
import { history } from "../../../utility/Utils"
import { saveBountiesAction, saveBountyAction, setButtonLoadingAction, setLoadingAction } from "./actions"

function fetchBountyAPI() {
    return axios.get('bounty')
}

function fetchBountyDetailsAPI(id) {
    return axios.get(`bounty/${id}`)
}

function submitBountyAPI(data) {
    return axios.post(`/bounty/submission`, data)
}

function addBountyAPI(data) {
    return axios.post('bounty', data)
}

function editBountyAPI(data) {
    return axios.put('bounty', data)
}
// ** fetch bounty list
export const addBounty = data => {
    return async (dispatch) => {
        try {
            dispatch(setButtonLoadingAction(true))
            await addBountyAPI(data)
            toast.success("Bounty added successfully!!")
            dispatch(setButtonLoadingAction(false))
            history.goBack()
        } catch (e) {
            console.log(e)
            dispatch(setButtonLoadingAction(false))
            toast.error('Error in adding bounty')
        }
    }
}


// ** fetch bounty list
export const editBounty = data => {
    return async (dispatch) => {
        try {
            dispatch(setButtonLoadingAction(true))
            await editBountyAPI(data)
            toast.success("Bounty Edited successfully!!")
            dispatch(setButtonLoadingAction(false))
            history.goBack()
        } catch (e) {
            console.log(e)
            dispatch(setButtonLoadingAction(false))
            toast.error('Error in edited bounty')
        }
    }
}

// ** fetch bounty list
export const fetchBounties = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchBountyAPI()
            if (response && response.data) {
                dispatch(saveBountiesAction(response.data))
            }
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}


// ** fetch bounty details
export const fetchBountyDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchBountyDetailsAPI(id)
            if (response && response.data) {
                dispatch(saveBountyAction(response.data))
            }
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}

// ** bounty submission
export const submitBounty = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setButtonLoadingAction(true))
            await submitBountyAPI(data)
            toast.success("Submitted successfully!!")
            dispatch(setButtonLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setButtonLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}