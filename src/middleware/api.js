//环境配置
let API_ROOT = 'https://api.github.com/'
if(process.env.NODE_ENV === 'development'){
     API_ROOT = 'http://localhost:9000/'
}

// 使用fetch调用erp restful api接口
const callApi = (endpoint,req={}) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
    console.log(fullUrl);
    const fetchConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(req)
    };
    return fetch(fullUrl,fetchConfig)
        .then(response => response.json()
            .then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }
                return Object.assign({},
                    {...json}
                    )
            })
        )
}

// 定义action键值,用来标识api请求的action
export const CALL_API = 'Call API'

// 一个Redux中间件，它使用指定的CALL_API信息来解释操作
export default store => next => action => {
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint } = callAPI
    const { types } = callAPI

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType }))

    return callApi(endpoint).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    )
}
