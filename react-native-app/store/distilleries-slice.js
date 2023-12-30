import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const distilleriesEndpoint = 'https://miniature-meme-7v9gwp66p9cp446-8000.preview.app.github.dev/api/distilleries/?format=json';

export const fetchDistilleries = createAsyncThunk(
  'distilleries/fetchDistilleries',
  async () => {
    const response = await fetch(distilleriesEndpoint);
    const json = await response.json();
    return json;
  }
);

const distilleriesSlice = createSlice({
  name: 'distilleries',
  initialState: {
    items: [],
    status: 'idle',
    isMenuVisible: false,
    searchTerm: '',
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuVisible = !state.isMenuVisible;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDistilleries.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { toggleMenu, setSearchTerm } = distilleriesSlice.actions;
export const distilleriesReducer = distilleriesSlice.reducer;
