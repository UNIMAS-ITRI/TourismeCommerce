import 'rxjs'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { counterReducer } from "./reducer/gitReducer"; //reducers
import { gitEpic } from "./epic/gitEpic"; //epics

const rootEpic = combineEpics(
  gitEpic.User_Login,
  gitEpic.User_Logout,
  gitEpic.User_Register,
  gitEpic.User_ProfileByID,
  gitEpic.User_ViewPage,
  gitEpic.User_ViewProductCartItem,

  gitEpic.User_ViewProductCart,
  gitEpic.User_DeleteProductCart,
  gitEpic.User_AddProductCart,
  gitEpic.User_UpdateProductCart,

  gitEpic.User_ViewProductListing


);

const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({ counterReducer });
const middleware = [
  thunk,
  epicMiddleware
]
const initialState = {};
const store = createStore(rootReducer,initialState, applyMiddleware(...middleware))
epicMiddleware.run(rootEpic);
export default store
