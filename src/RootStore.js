import { createStore, combineReducers } from 'redux'
import { updateDrawer, updateNewGift } from './redux/reducers'


const initialState = {
	updateDrawer: {
		donationDrawerOpen: false,
		donationValue: undefined,
		selectedCharity: {},
	},
	updateNewGift: {
		giftData: {},
	},
}

export const store = createStore(
	combineReducers({
		updateDrawer,
		updateNewGift,
	}),
	initialState
)