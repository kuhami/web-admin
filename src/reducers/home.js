/**
 * home.js
 * @param state
 * @param action
 * @returns {*}
 */
export function home(state = [], action) {
    const { type, error } = action
    if (type === 'USERINFO_SUCCESS') {
        return action.response
    } else if (error) {
        return error
    }

    return state
}
