import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FallBack } from "./FallBack";
import { mouseOverActiveSelect, keyPressActiveSelect } from "../redux/slice/SearchedDataSlice";

export const SearchTopUp = ({ cancelClickHandler }) => {
  const { sortedData, shimmer, active } = useSelector(
    (state) => state.searchedData
  );

  const [activeState , setActiveState] = useState({})
  const dispatch = useDispatch();
console.log("activeState", activeState);
  const onMouseIverHandler = (ele) => {
    dispatch(mouseOverActiveSelect(ele));
  };
  const onclickHandler = (ele) => {
    //  cancelClickHandler();
    dispatch(mouseOverActiveSelect(ele));
   
  };

  useEffect( () =>{
    console.log("active useeffect")
    setActiveState(active)
  },[active])



  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      console.log("how??", console.log(activeState));
      // if (Object.keys(activeState).length) {
      if (e.keyCode === 38) {
        console.log("up");
        dispatch(keyPressActiveSelect("up"));
      } else if (e.keyCode === 40) {
        console.log("down");
        dispatch(keyPressActiveSelect("down"));
      }
      // }
    });
  }, []);

  const hasData = sortedData.length;
  return (
    <div className="">
      {hasData && !shimmer ? (
        <div
          className="max-h-350 bt-1 pt-20 oy-auto "
          onKeyDown={() => {
            console.log("up 2");
          }}
          onKeyUp={() => {
            console.log("down 2");
          }}
        >
          {sortedData.map((ele) => {
            const { id, name, address, pincode, items } = ele;
            return (
              <div
                className={` pl-20 pt-5 pb-10 bs-bb item ${
                  activeState.id == id ? "bg-grey-primary" : ""
                }`}
                onMouseOver={() => {
                  onMouseIverHandler(ele);
                }}
                onClick={() => {
                  onclickHandler(ele);
                }}
                onKeyUp={(e) => {
                  console.log("inside fun my");
                }}
              >
                <div className="fw-500">{name}</div>
                <div className="fs-12">
                  {address}, {pincode}
                </div>
                <div className="fs-12">IP add : {id}</div>
                <div className="fs-12">
                  items :{" "}
                  {items.map((el) => {
                    return <span> {el}, </span>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <FallBack />
      )}
    </div>
  );
};
