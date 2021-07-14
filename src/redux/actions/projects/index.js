import {toast} from "react-toastify"
import {history} from "../../../utility/Utils"
import axios from "axios"
import {getProjectFail, getProjects, getProjectsSuccess, getProjectSuccess, setButtonLoadingAction} from "./actions"

function addProjectAPI(data) {
    return axios.post('projects', data)
}

function editProjectAPI(data) {
    return axios.put('projects', data)
}

function getProjectsAPI() {
    return axios.get('projects')
}

function getProjectAPI(id) {
    return axios.get(`projects/${id}`)
}

function deleteProjectAPI(id) {
    return axios.delete(`projects/${id}`)
}

function uploadProjectLogo(data, name) {
    const base64 = data
    return fetch(base64)
        .then(res => res.blob())
        .then(blob => {
            const fd = new FormData()
            const file = new File([blob], `${name}.jpeg`)
            fd.append('avatar', file)

            return axios.post('projects/upload', fd)
        })
}

export const addProject = data => {
    return async (dispatch) => {
        try {
            dispatch(setButtonLoadingAction(true))
            const response = await uploadProjectLogo(data.avatar, data.title)
            const projectData = {
                ...data,
                logoKey: response.data.imageKey,
                logo: response.data.location
            }
            delete projectData.avatar
            await addProjectAPI(projectData)
            toast.success("Project added successfully!!")
            dispatch(setButtonLoadingAction(false))
            history.replace('/projects')
        } catch (e) {
            dispatch(setButtonLoadingAction(false))
            toast.error('Error in adding project')
        }
    }
}

export const editProject = data => {
    return async (dispatch) => {
        try {
            dispatch(setButtonLoadingAction(true))
            if (data.avatar && data.avatar !== '') {
                const response = await uploadProjectLogo(data.avatar, data.title)
                data = {
                    ...data,
                    logoKey: response.data.imageKey,
                    logo: response.data.location
                }
                delete data.avatar
            }
            await editProjectAPI(data)
            toast.success("Project updated successfully!!")
            dispatch(setButtonLoadingAction(false))
            history.replace('/projects')
        } catch (e) {
            dispatch(setButtonLoadingAction(false))
            toast.error('Error in updating project')
        }
    }
}

export const fetchProjects = () => {
    return async (dispatch) => {
        try {
            dispatch(getProjects())
            const result = await getProjectsAPI()
            dispatch(getProjectsSuccess(result.data))
        } catch (e) {
            dispatch(getProjectFail())
            toast.error('Error in getting projects')
        }
    }
}

export const deleteProjectAction = (id) => {
    return async (dispatch) => {
        try {
            await deleteProjectAPI(id)
            dispatch(fetchProjects())
            toast.success('Project deleted successfully')
        } catch (e) {
            toast.error(e.response.data.message)
        }
    }
}

export const getProject = (id) => {
    return async (dispatch) => {
        try {
            //dispatch(getProjects())
            const result = await getProjectAPI(id)
            dispatch(getProjectSuccess(result.data))
        } catch (e) {
            dispatch(getProjectFail())
            toast.error('Error in getting projects')
        }
    }
}
