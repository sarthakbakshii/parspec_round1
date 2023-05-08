import { createSlice, current } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    shimmer: false,
    allData: [],
    sortedData: [],
    active: {},
  },
  reducers: {
    addAllData: (state, { payload }) => {
      state.allData = payload;
    },
    searchData: (state, { payload }) => {
      state.shimmer = true;
      const arr = current(state.allData);
      if (!payload) {
        state.sortedData = [];
        state.active = {};
        return;
      }
      if (payload === "all") {
        //=== fallback to show all data
        state.sortedData = arr;
        state.shimmer = false;
        return;
      }
      const data = arr.filter((item) => {
        const { id, name, address, pincode, items } = item;
        if (
          name.toLowerCase().indexOf(payload) !== -1 ||
          id.indexOf(payload) !== -1 ||
          pincode.indexOf(payload) !== -1 ||
          address.toLowerCase().indexOf(payload) !== -1
        )
          return item;
      });
      state.shimmer = false;
      state.sortedData = data;
    },

    mouseOverActiveSelect: (state, { payload }) => {
      state.active = payload;
    },

    keyPressActiveSelect: (state, { payload }) => {
      const active = current(state.active);
      const sortedData = current(state.sortedData);

      const newActive = sortedData.filter( (ele,i) =>{
        if( ele.id === active.id){
          if(payload === "up"){
            console.log(sortedData[i-1])
            return sortedData[i-1]
          }else if( payload === "down"){
             console.log(sortedData[i + 1]);
            return sortedData[i+1]
          }
        }
      })
      state.active = newActive[0]
      state.sortedData = sortedData
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAllData, searchData, mouseOverActiveSelect, keyPressActiveSelect } =
  counterSlice.actions;

export default counterSlice.reducer;
