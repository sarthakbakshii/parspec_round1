import { createSlice, current } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    shimmer: false,
    allData: [
      {
        id: "123-s2-546",
        name: "John Jacobs",
        items: ["bucket", "bottle"],
        address: "1st Cross, 9th Main, abc Apartment",
        pincode: "5xx012",
      },
      {
        id: "123-s3-146",
        name: "David Mire",
        items: ["Bedroom Set"],
        address: "2nd Cross, BTI Apartment",
        pincode: "4xx012",
      },
      {
        id: "223-a1-234",
        name: "Soloman Marshall",
        items: ["bottle"],
        address: "Riverbed Apartment",
        pincode: "4xx032",
      },
      {
        id: "121-s2-111",
        name: "Ricky Beno",
        items: ["Mobile Set"],
        address: "Sunshine City",
        pincode: "5xx072",
      },
      {
        id: "123-p2-246",
        name: "Sikander Singh",
        items: ["Air Conditioner"],
        address: "Riverbed Apartment",
        pincode: "4xx032",
      },
      {
        id: "b23-s2-321",
        name: "Ross Wheeler",
        items: ["Mobile"],
        address: "1st Cross, 9th Main, abc Apartement",
        pincode: "5xx012",
      },
      {
        id: "113-n2-563",
        name: "Ben Bish",
        items: ["Kitchen Set", "Chair"],
        address: "Sunshine City",
        pincode: "5xx072",
      },
      {
        id: "323-s2-112",
        name: "John Michael",
        items: ["Refrigerator"],
        address: "1st Cross, 9th Main, abc Apartement",
        pincode: "5xx012",
      },
      {
        id: "abc-34-122",
        name: "Jason Jordan",
        items: ["Mobile"],
        address: "Riverbed Apartment",
        pincode: "4xx032",
      },
    ],
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
      const sortedData = current(state.sortedData);
      let newActive;
      if (payload < 0) newActive = sortedData[0];
      else if (payload >= sortedData.length)
        newActive = sortedData[sortedData.length - 1];
      else newActive = sortedData[payload];

      const element = document.getElementById(newActive?.id);
      element &&
        element.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });

      state.active = newActive;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addAllData,
  searchData,
  mouseOverActiveSelect,
  keyPressActiveSelect,
} = counterSlice.actions;

export default counterSlice.reducer;
