import React from 'react'
import { image, searchText } from '../constants'

export const FallBack = () => {
  return (
    <div className="h-300 flex flex-center flex-middle flex-coloum">
      <div> {searchText.NOT_FOUND} </div>
      <img
        alt=""
        class="bg jc jd c"
        className="w-400"
        loading="eager"
        role="presentation"
        src={image.NO_DATA_FOUND}
      />
    </div>
  );
}
