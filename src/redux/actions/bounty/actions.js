export const SAVE_BOUNTIES = 'wallet/bounty/SAVE_BOUNTIES'
export const SET_BUTTON_LOADING = 'wallet/bounty/SET_BUTTON_LOADING'
export const SET_LOADING = 'wallet/bounty/SET_LOADING'
export const FETCH_BOUNTY_DETAIL = 'wallet/bounty/FETCH_BOUNTY_DETAIL'
export const SAVE_BOUNTY_DETAIL = 'wallet/bounty/SAVE_BOUNTY_DETAIL'
export const SAVE_PROJECTS = 'wallet/bounty/SAVE_PROJECTS'
export const SAVE_SOCIAL_MEDIUMS = 'wallet/bounty/SAVE_SOCIAL_MEDIUMS'
export const SAVE_MY_BOUNTIES = 'wallet/bounty/SAVE_MY_BOUNTIES'
export const SAVE_SUBMISSIONS = 'wallet/bounty/SAVE_SUBMISSIONS'
export const SAVE_FILTERS = 'wallet/bounty/SAVE_FILTERS'
export const SAVE_MY_PROJECTS = 'wallet/bounty/SAVE_MY_PROJECTS'

export const saveBountiesAction = (bounties) => {
    return {
        type: SAVE_BOUNTIES,
        bounties
    }
}

export const setButtonLoadingAction = (flag) => {
    return {
        type: SET_BUTTON_LOADING,
        flag
    }
}

export const setLoadingAction = (flag) => {
    return {
        type: SET_LOADING,
        flag
    }
}

export const fetchBountyAction = (id) => {
    return {
        type: FETCH_BOUNTY_DETAIL,
        id
    }
}

export const saveBountyAction = (bounty) => {
    return {
        type: SAVE_BOUNTY_DETAIL,
        bounty
    }
}

export const saveProjectsAction = (projects) => {
    return {
        type: SAVE_PROJECTS,
        projects
    }
}

export const saveMyProjectsAction = (myProjects) => {
    return {
        type: SAVE_MY_PROJECTS,
        myProjects
    }
}

export const saveSocialMediumsAction = (socialMediums) => {
    return {
        type: SAVE_SOCIAL_MEDIUMS,
        socialMediums
    }
}

export const saveMyBountiesAction = (myBounties) => {
    return {
        type: SAVE_MY_BOUNTIES,
        myBounties
    }
}

export const saveSubmissionsAction = (submissions) => {
    return {
        type: SAVE_SUBMISSIONS,
        submissions
    }
}

export const saveFiltersAction = (filters) => {
    return {
        type: SAVE_FILTERS,
        filters
    }
}
