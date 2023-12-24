import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    isLoading: false,
    companyList: [],
    companyObj: {},
    errorMessage: ''
}

export const getAllCompanys = createAsyncThunk(
    'company/getAllCompanys',
    async () => {
      try {
        const response = await axios.get('http://localhost:8000/company');
        const companyList = response.data;
        return companyList;
      } catch (error) {
        throw new Error(error.message || 'Failed to fetch content');
      }
    }
  );

export const companySlice = createSlice({
    name: "company",
    initialState: initialState,
    reducers: {
        addCompany : (state, action) => {
            state.companyList.push(action.payload)
        },
        deleteCompany : (state, action) => {
            state.companyList = state.companyList.filter(company => company.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllCompanys.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllCompanys.fulfilled, (state, action) => {
            state.isLoading = false;
            state.companyList = action.payload;
          })
          .addCase(getAllCompanys.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
          });
      }
});

export const { addCompany, deleteCompany } = companySlice.actions;
export const selectAllCompany = (state) => state.company.companyList
export const companyReducer = companySlice.reducer;