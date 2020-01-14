import { CALL_API } from '../middleware/api'
import {assignRouterState} from "react-router/lib/RouterUtils";
/**
 * 请求当前页初始化数据
 * @param options
 * @param api_uri
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
    console.log('actions0-0-0-0-',options)
    return (dispatch, getState) => {
        return dispatch(fetch(options))
    }
}
