import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

// Create the redux logging middleware
const loggerMiddleware = createLogger()

// Configuring the Store
// eslint-disable-next-line
export default function configureStore(initialState={})  {

  // Add redux tools to browser dev tools
  // NOTE - its important to install Redux tools to browser in order to work
  if (process.env && process.env.NODE_ENV === 'development') {
    return createStore(rootReducer, initialState, composeWithDevTools (

      applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware,
      ),
    ))
  }
  return createStore(
    rootReducer,
    initialState,

    // Apply the middleware usign the Redux's provided applymiddleware function
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
