import { createSlice } from "@reduxjs/toolkit";

type Language = "en" | "hi";

interface LanguageState {
    lang: Language;
}

const initialState: LanguageState = {
    lang: "en",
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        toggleLanguage: (state) => {
            state.lang = state.lang === "en" ? "hi" : "en";
        },
        setLanguage: (state, action) => {
            state.lang = action.payload;
        },
    },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
