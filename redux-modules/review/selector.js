export const selectItems = state => state.toJS().items
export const selectIsOver = state => state.toJS().items.length === 0
export const selectWarning = state => state.toJS().warning
export const selectPlanAmount = state => state.toJS().planAmount
export const selectRemain = state => state.toJS().remain
