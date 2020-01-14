import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

import {home} from './home'
import {nav} from './nav'



const rootReducer = combineReducers({
    home,
    nav
})

export default rootReducer
