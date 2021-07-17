export const SET_BUTTON_LOADING = 'wallet/project/SET_BUTTON_LOADING'
export const GET_PROJECTS = 'wallet/project/GET_PROJECTS'
export const GET_PROJECT = 'wallet/project/GET_PROJECT'
export const GET_PROJECTS_SUCCESS = 'wallet/project/GET_PROJECTS_SUCCESS'
export const GET_PROJECTS_FAIL = 'wallet/project/GET_PROJECTS_FAIL'
export const GET_PROJECT_SUCCESS = 'wallet/project/GET_PROJECT_SUCCESS'
export const GET_HOST_SUCCESS = 'wallet/project/GET_HOST_SUCCESS'

export const setButtonLoadingAction = (flag) => {
    return {
        type: SET_BUTTON_LOADING,
        flag
    }
}

export const getProjects = () => {
    return {
        type: GET_PROJECTS
    }
}

export const getProjectSuccess = (data) => {
    return {
        type: GET_PROJECT_SUCCESS,
        data
    }
}

export const getProjectsSuccess = (list) => {
    return {
        type: GET_PROJECTS_SUCCESS,
        list
    }
}

export const getProjectFail = () => {
    return {
        type: GET_PROJECTS_FAIL
    }
}

export const getHostSuccess = (data) => {
    return {
        type: GET_HOST_SUCCESS,
        data
    }
}
