import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../Reducer'
import rootSaga from '../Saga'

const sagaMiddleware = createSagaMiddleware()
let store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store