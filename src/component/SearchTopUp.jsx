import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FallBack } from "./FallBack";
import {
  mouseOverActiveSelect,
  keyPressActiveSelect,
} from "../redux/slice/SearchedDataSlice";
import { Card } from "./Card";

export const SearchTopUp = () => {
  const { sortedData, shimmer, active } = useSelector(
    (state) => state.searchedData
  );

  const [activeState, setActiveState] = useState({});
  const activeIndex = useRef(-1);
  const sortedDataLength = useRef(-1);
  sortedDataLength.current = sortedData.length;

  const dispatch = useDispatch();

  const onMouseIverHandler = (ele) => {
    dispatch(mouseOverActiveSelect(ele));
  };
  const onclickHandler = (ele) => {
    dispatch(mouseOverActiveSelect(ele));
  };

  useEffect(() => {
    setActiveState(active);
  }, [active]);

  const scrollChecker = useCallback((e, sortedData) => {
    console.count();
    if (e.keyCode === 38) {
      console.log(
        "up",
        activeIndex.current,
        sortedDataLength.current
      );
      activeIndex.current = activeIndex.current - 1;
      if (activeIndex.current == -1) activeIndex.current = 0;
      dispatch(keyPressActiveSelect(activeIndex.current));
    } else if (e.keyCode === 40) {
      console.log("down", activeIndex.current, sortedDataLength.current);
      activeIndex.current = activeIndex.current + 1;
      if (activeIndex.current == sortedDataLength.current)
        activeIndex.current = sortedDataLength.current - 1;
      dispatch(keyPressActiveSelect(activeIndex.current));
    }
  }, []); 

  useEffect(() => {
    document.addEventListener("keyup", (e) =>
      scrollChecker(e, activeIndex)
    );
    return () =>
      document.removeEventListener("keyup", (e) =>
        scrollChecker(e, activeIndex)
      );
  }, []);

  const hasData = sortedData.length;
  return (
    <div className="">
      {hasData && !shimmer ? (
        <div className="max-h-350 bt-1 pt-20 oy-auto ">
          {sortedData.map((ele, i) => {
            return (
              <Card
                activeState={activeState}
                i={i}
                onclickHandler={onclickHandler}
                onMouseIverHandler={onMouseIverHandler}
                activeIndex={activeIndex}
                ele={ele}
              />
            );
          })}
        </div>
      ) : (
        <FallBack />
      )}
    </div>
  );
};
