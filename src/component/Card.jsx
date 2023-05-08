import React from "react";

const CardChild = ({
  activeState,
  i,
  onclickHandler,
  onMouseIverHandler,
  activeIndex,
  ele,
}) => {
  const { id, name, address, pincode, items } = ele;
  return (
    <div id={id}
      className={` pl-20 pt-5 pb-10 bs-bb item ${
        activeState.id === id ? "bg-grey-primary" : ""
      }`}
      onMouseOver={() => {
        onMouseIverHandler(ele);
        activeIndex.current = i;
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
        items :
        {items.map((el) => {
          return <span> {el}, </span>;
        })}
      </div>
    </div>
  );
};

export const Card = React.memo(CardChild)