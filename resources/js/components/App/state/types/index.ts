export enum ActionType{
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  BANKRUPT = 'BANKRUPT',
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE'
}

interface DepositAction{
  type: ActionType.DEPOSIT
  payload: number
}

interface WithdrawAction{
  type: ActionType.WITHDRAW
  payload: number
}

interface BankruptAction{
  type: ActionType.BANKRUPT
}

interface ArtActive{
  type: ActionType.ACTIVE
  payload: number
}

interface ArtDeactive{
  type: ActionType.DEACTIVE
}

export type Action = DepositAction | WithdrawAction | BankruptAction

export type HoverAction = ArtActive | ArtDeactive