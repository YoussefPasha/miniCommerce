import { SET_FAV, DELETE_FAV } from "../actions/Favorite";

const initialState = {
  favorites: [],
};

function arrayRemoveEle(arr: any, value: any) {
  return arr.filter(function (ele: any) {
    return ele != value;
  });
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FAV:
      return {
        ...state,
        favorites: state.favorites.concat(action.fav),
      };
    case DELETE_FAV:
      return {
        ...state,
        favorites: arrayRemoveEle(state.favorites, action.fav),
      };
  }
  return state;
};
