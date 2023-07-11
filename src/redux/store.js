import {combineReducers, configureStore} from '@reduxjs/toolkit'
import CategorySlice from './CategorySlice'
import QuantitySlice from './CartSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer , persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
    key: 'root',
    storage,
  }
  
  const rootReducer = combineReducers({ 
    CategoryReducer : CategorySlice,
    QuantityReducer:QuantitySlice
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)

// here -------     CategoryReducer : CategorySlice, QuantityReducer:QuantitySlice
 // it is not imported as CartReducer gives error: CartSlice,although imported the file correcly so we have to write  CartReducer: CartSlice as :-  QuantityReducer:QuantitySlice