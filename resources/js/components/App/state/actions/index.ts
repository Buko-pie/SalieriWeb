import { Action, ActionType } from "../types"
import { Dispatch } from 'redux'

export const depositMoney = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DEPOSIT,
      payload: amount
    })
  }
}

export const withdrawtMoney = (amount: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.WITHDRAW,
      payload: amount
    })
  }
}

export const bankrupt = (amount: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.BANKRUPT
    })
  }
}

export const artActive = (artIndex: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.ACTIVE,
      payload: artIndex
    })
  }
}

export const artDeactive = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DEACTIVE
    })
  }
}