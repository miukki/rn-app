import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createLogicMiddleware } from 'redux-logic'
import logics from 'eic-vocab-app-redux-logic'
import vocabModels from 'eic-vocab-app-models'
import Immutable from 'immutable'

import rootReducer from './root-reducer'
import Storage from '../lib/Storage'
import { customerIamApiSdkJs, vocabAppServiceJsSdk } from '../lib/API'
import studyPlanReduxLogic from '../redux-modules/studyPlan/logic'
import signInReduxLogic from '../redux-modules/auth/signIn/logic'
import signUpReduxLogic from '../redux-modules/auth/signUp/logic'
import forgotPasswordReduxLogic from '../redux-modules/auth/forgotPassword/logic'
import completeProfile from '../redux-modules/auth/completeProfile/logic'

const logicMiddleware = createLogicMiddleware(
  [
    ...logics,
    ...studyPlanReduxLogic,
    ...signInReduxLogic,
    ...signUpReduxLogic,
    ...forgotPasswordReduxLogic,
    ...completeProfile
  ],
  {
    Practice: vocabModels.Practice,
    Storage,
    customerIamApiSdkJs,
    vocabAppServiceJsSdk
  }
)

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = (rootReducer, initialState) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(logicMiddleware, thunkMiddleware, loggerMiddleware)
    )
  )
}

const configureStore = function(initialState = Immutable.Map({})) {
  return createStoreWithMiddleware(rootReducer, initialState)
}

export default configureStore
