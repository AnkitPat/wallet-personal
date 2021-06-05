export const SAVE_USER_DETAILS = 'wallet/auth/SAVE_USER_DETAILS'

export const saveUserDetailsAction = (userDetails) => {
    return {
        type: SAVE_USER_DETAILS,
        userDetails
    }
}