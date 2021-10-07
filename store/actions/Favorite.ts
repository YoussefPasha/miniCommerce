export const SET_FAV = "SET_FAV";
export const DELETE_FAV = "DELETE_FAV";

export const AddFav = (id: string) => {
  console.log("AddFav", id);

  return async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: SET_FAV,
        fav: id,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const DeleteFav = (id: string) => {
  console.log(id);

  return async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: DELETE_FAV,
        fav: id,
      });
    } catch (error) {
      throw error;
    }
  };
};
