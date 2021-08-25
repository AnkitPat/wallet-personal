import produce from 'immer'
import {
    GET_HOST_SUCCESS,
    GET_PROJECT_SUCCESS,
    GET_PROJECTS,
    GET_PROJECTS_FAIL,
    GET_PROJECTS_SUCCESS,
    SET_BUTTON_LOADING
} from '../../actions/projects/actions'

// **  Initial State
const initialState = {
    projects: [],
    project: null,
    loading: false,
    buttonLoading: false,
    hosts: []
}

/* eslint-disable default-case, no-param-reassign */
const projectReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_BUTTON_LOADING:
                draft.buttonLoading = action.flag
                break
            case GET_PROJECTS:
                draft.loading = true
                break
            case GET_PROJECTS_SUCCESS:
                draft.projects = action.list
                draft.loading = false
                break
            case GET_PROJECTS_FAIL:
                draft.loading = false
                break
            case GET_PROJECT_SUCCESS:
                draft.project = action.data
                break
            case GET_HOST_SUCCESS:
                draft.hosts = action.data
                break
        }
    })

export default projectReducer
