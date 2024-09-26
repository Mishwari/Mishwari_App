import { Profile } from "@/types/profileDetails";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: Profile = {
    user: {
        id: null,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
    },
    full_name: "" ,
    gender: "male" ,
    birth_date: "",
    address: ""
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileDetails(state, action:PayloadAction<Profile>) {
            console.log("hello from profile slice",action.payload)
            return { ...state, ...action.payload };
        },
        resetUserState: () => initialState
    }
})


export const {setProfileDetails, resetUserState} = profileSlice.actions
export default profileSlice.reducer

