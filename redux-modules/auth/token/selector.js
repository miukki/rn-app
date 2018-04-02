import jwtDecode from 'jwt-decode'

export const selectUser = state => {
  return jwtDecode(state.toJS().jwt).user
}
