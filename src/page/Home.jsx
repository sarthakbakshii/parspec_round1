import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search, Cross } from "../assets";
import { Logo, SearchTopUp } from "../component";
import { searchText } from "../constants";
import { debounceHandler } from "../utils/debounce";

import { useDispatch } from "react-redux";
import {
  addAllData,
  searchData,
} from "../redux/slice/SearchedDataSlice";
import { getApiResponse } from "../utils/apiResponse";
import { SearchResultPopUp } from "../component/SearchTopUp";

const Home = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const debounceRef = useRef(null);

  const cancelClickHandler = useCallback(() => setText(""), []); ;

  const inputHandler = useCallback((e) => {
    const { value } = e.target;
    setText(value);

    debounceHandler(
      () => {
        dispatch(searchData(value));
      },
      300,
      debounceRef
    );
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getApiResponse(process.env.REACT_APP_BASE_API);
      dispatch(addAllData(data));
    })();
  }, []);

  return (
    <div className=" h-100vh flex flex-middle flex-coloum">
      <Logo />
      <div
        className={`w-550  mt-30 b-1-gray focus c-pointer o-hidden ${
          text ? " br-10" : " br-20 "
        } `}
      >
        <div className="flex o-hidden h-40  flex-start flex-middle">
          <span className="h-30 flex flex-center flex-middle w-40 ml-5">
            <Search height={25} width={25} />
          </span>
          <input
            type="text"
            value={text}
            className="h-100p w-450 b-0 fs-16 "
            placeholder={searchText.DEFAULT_TEXT}
            autoFocus={true}
            onChange={inputHandler}
          />
          {text && (
            <span
              className="h-30 flex flex-center flex-middle w-40 ml-5"
              onClick={cancelClickHandler}
            >
              <Cross height={25} width={25} />
            </span>
          )}
        </div>
        {text && <SearchResultPopUp cancelClickHandler={cancelClickHandler} />}
      </div>
    </div>
  );
};

export default Home;
