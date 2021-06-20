import axios from "axios"
import { toast } from "react-toastify"
import { history } from "../../../utility/Utils"
import { saveBountiesAction, saveBountyAction, saveMyBountiesAction, saveProjectsAction, saveSocialMediumsAction, saveSubmissionsAction, setButtonLoadingAction, setLoadingAction } from "./actions"

function fetchBountyAPI(selectedProjects, selectedSocialMedium, selectedPriceRange, searchTerm) {
    let url = 'bounty'

    if (selectedSocialMedium && selectedSocialMedium !== '') {
        url = `${url}?socialMedium=${selectedSocialMedium}`
    } else {
        url = `${url}?socialMedium=`
    }


    if (searchTerm && searchTerm !== '') {
        url = `${url}&text=${searchTerm}`
    }
    
    if (selectedPriceRange && selectedPriceRange !== '') {
        url = `${url}&${selectedPriceRange}`
    }

    if (selectedProjects.length > 0) {
        url = `${url}&${selectedProjects.map((project, index) => `projects[${index}]=${project.id}`).join('&')}`
    }
    return axios.get(url)
}

function fetchBountyDetailsAPI(id) {
    return axios.get(`bounty/${id}`)
}

function submitBountyAPI(data) {
    return axios.post(`/bounty/submission`, data)
}


function fetchProjectsAPI() {
    return axios.get(`/bounty/projects`)
}

function fetchSocialMediumsAPI() {
    return axios.get(`/bounty/socialMediums`)
}

function fetchMyBountiesAPI() {
    return axios.get(`/bounty/myBounties`)
}


function fetchAllSubmissionAPI() {
    return axios.get(`/bounty/submissions`)
}

function claimMyBountyAPI(id) {
    return axios.post(`/bounty/claim`, { id })
}

function verifyBountyAPI(id, status) {
    return axios.post(`/bounty/verify`, { id, verified: status })
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
export const fetchBounties = (selectedProjects = [], selectedSocialMedium = '', selectedPriceRange = '', searchTerm = '') => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchBountyAPI(selectedProjects, selectedSocialMedium, selectedPriceRange, searchTerm)
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
            history.push('/bounties')
        } catch (error) {
            dispatch(setButtonLoadingAction(false))
            toast.error(error.response.data.message)
        }
    }
}

// ** fetch projects
export const fetchProjectsAndSocialMediums = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            let response = await fetchProjectsAPI()
            if (response && response.data) dispatch(saveProjectsAction(response.data))
            response = await fetchSocialMediumsAPI()
            if (response && response.data) dispatch(saveSocialMediumsAction(response.data))
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}

// ** fetch my Bounties
export const fetchMyBounties = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchMyBountiesAPI()
            if (response && response.data) dispatch(saveMyBountiesAction(response.data))
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}

// ** fetch all submission
export const fetchSubmission = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const response = await fetchAllSubmissionAPI()
            if (response && response.data) dispatch(saveSubmissionsAction(response.data))
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in fetching')
        }
    }
}


// ** Claim my Bounties
export const claimMyBounty = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setButtonLoadingAction(true))
            const response = await claimMyBountyAPI(id)
            toast.success("Bounty Claimed!!")
            dispatch(fetchMyBounties())
            dispatch(setButtonLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Failed to claim it')
        }
    }
}


// ** Claim my Bounties
export const verifyBounty = (id, status) => {
    return async (dispatch) => {
        try {
            dispatch(setButtonLoadingAction(true))
            const response = await verifyBountyAPI(id, status)
            toast.success("Bounty task status changed!!")
            dispatch(fetchSubmission())
            dispatch(setButtonLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Failed to verify it')
        }
    }
}

