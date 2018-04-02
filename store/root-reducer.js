import { combineReducers } from 'redux-immutable'
import { reducer as homeNav } from '../routers/HomeNav'
import { reducer as rootNav } from '../routers/Root'
import { reducer as tabNav } from '../routers/Tab'
import practice from '../redux-modules/practice'
import wordlist from '../redux-modules/wordlist'
import review from '../redux-modules/review'
import studyPlan from '../redux-modules/studyPlan'

import signIn from '../redux-modules/auth/signIn/'
import signUp from '../redux-modules/auth/signUp/'
import forgotPassword from '../redux-modules/auth/forgotPassword/'
import completeProfile from '../redux-modules/auth/completeProfile/'
import token from '../redux-modules/auth/token/'

const rootReducer = combineReducers({
  token,
  signIn,
  signUp,
  forgotPassword,
  completeProfile,
  homeNav,
  rootNav,
  tabNav,
  practice,
  wordlist,
  review,
  studyPlan
})

export default rootReducer
