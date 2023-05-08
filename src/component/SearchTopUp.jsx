import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FallBack } from "./FallBack";
import {
  mouseOverActiveSelect,
  keyPressActiveSelect,
} from "../redux/slice/SearchedDataSlice";
import { Card } from "./Card";

const SearchTopUp = () => {
  const { sortedData, shimmer, active } = useSelector(
    (state) => state.searchedData
  );

  const [activeState, setActiveState] = useState({});
  const activeIndex = useRef(-1);
  const sortedDataLength = useRef(-1);
  sortedDataLength.current = sortedData.length;

  const dispatch = useDispatch();

  const onMouseOverHandler = useCallback(
    (ele) => {
      dispatch(mouseOverActiveSelect(ele));
    },
    [dispatch]
  );

  const onclickHandler = useCallback(
    (ele) => {
      dispatch(mouseOverActiveSelect(ele));
    },
    [dispatch]
  );

  useEffect(() => {
    setActiveState(active);
  }, [active]);

  const scrollChecker = useCallback((e) => {
    console.count();
    if (e.keyCode === 38) {
      activeIndex.current = activeIndex.current - 1;
      if (activeIndex.current == -1) activeIndex.current = 0;
      dispatch(keyPressActiveSelect(activeIndex.current));
    } else if (e.keyCode === 40) {
      activeIndex.current = activeIndex.current + 1;
      if (activeIndex.current == sortedDataLength.current)
        activeIndex.current = sortedDataLength.current - 1;
      dispatch(keyPressActiveSelect(activeIndex.current));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", (e) => scrollChecker(e, activeIndex));
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
                onMouseIverHandler={onMouseOverHandler}
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

export const SearchResultPopUp = React.memo(SearchTopUp);
