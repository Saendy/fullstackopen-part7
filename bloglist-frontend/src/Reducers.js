export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { mode: action.mode, value: action.value }
    case 'CLEAR':
      return { mode: 'none', value: '' }
    default:
      return state
  }
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.user
    case 'CLEAR':
      return null
    default:
      return state
  }
}
