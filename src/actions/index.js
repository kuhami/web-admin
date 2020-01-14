import { CALL_API } from '../middleware/api'

/**
 * 请求当前页初始化数据
 * @param options
 * @returns {{}}
 */
export const USERINFO_REQUEST = 'USERINFO_REQUEST'
export const USERINFO_SUCCESS = 'USERINFO_SUCCESS'
export const USERINFO_FAILURE = 'USERINFO_FAILURE'
// 初始化参数
const InitOptions = { data: {}, url: '', action: '' }

const fetch = options => {
    const { url } = options
    return {
        [CALL_API]: {
            types: [ USERINFO_REQUEST, USERINFO_SUCCESS, USERINFO_FAILURE ],
            endpoint: url
        }
    }
}

export const postInner = (options) => {
    return (dispatch, getState) => {
        return dispatch(fetch(options))
    }
}
