import { createStore } from 'redux'
import {updateDrawer} from './redux/reducers'

import data from './data/user'
import requests from './data/requests'



export const store = createStore(
	updateDrawer,
	initialState
)