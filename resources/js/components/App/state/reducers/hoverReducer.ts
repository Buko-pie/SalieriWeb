import { HoverAction, ActionType } from '../types'

const initialState = null;

const reducer = ( state: null | number = initialState, action: HoverAction ) => {
  switch (action.type) {
    case ActionType.ACTIVE:
      return action.payload

    case ActionType.DEACTIVE:
      return null

    default:
      return state
  }
}

export default reducer