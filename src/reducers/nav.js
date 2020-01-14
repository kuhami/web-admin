/**
 * home.js
 * @param state
 * @param action
 * @returns {*}
 */
export function nav(state = [], action) {
    const { type, error } = action

    if (type === 'err') {
        return null
    } else if (error) {
        return error
    }

    return state
}
