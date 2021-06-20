import produce from 'immer'
import { SAVE_BOUNTIES, SAVE_BOUNTY_DETAIL, SAVE_MY_BOUNTIES, SAVE_PROJECTS, SAVE_SOCIAL_MEDIUMS, SAVE_SUBMISSIONS, SET_BUTTON_LOADING, SET_LOADING } from '../../actions/bounty/actions'

// **  Initial State
const initialState = {
    bounties: [],
    loading: false,
    buttonLoading: false,
    bounty: null,
    projects: [],
    socialMediums: [],
    myBounties: [],
    submissions: []
}

/* eslint-disable default-case, no-param-reassign */
const bountyReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case SAVE_BOUNTIES:
                draft.bounties = action.bounties
                break

            case SET_LOADING:
                draft.loading = action.flag
                break

            case SET_BUTTON_LOADING:
                draft.buttonLoading = action.flag
                break


            case SAVE_BOUNTY_DETAIL:
                draft.bounty = action.bounty
                break

            case SAVE_PROJECTS:
                draft.projects = action.projects
                break

            case SAVE_SOCIAL_MEDIUMS:
                draft.socialMediums = action.socialMediums
                break

            case SAVE_MY_BOUNTIES:
                draft.myBounties = action.myBounties
                break

            case SAVE_SUBMISSIONS:
                draft.submissions = action.submissions
                break
        }
    })

export default bountyReducer
