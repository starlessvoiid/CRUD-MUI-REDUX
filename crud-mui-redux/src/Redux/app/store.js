import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { companyReducer } from '../features/CompanySlice';

const rootReducer = combineReducers({
    company: companyReducer
});

export const store = configureStore({
    reducer: rootReducer,
});