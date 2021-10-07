import React from "react";
import {
  FlatList,
  ImageBackground,
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as actions from "../store/actions/Favorite";
import { useSelector, useDispatch } from "react-redux";

let TouchableComponent: any;
TouchableComponent = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const Products = (props: any) => {
  const dispatch = useDispatch();

  const { favoritesState } = useSelector((state: any) => ({
    favoritesState: state.favorite,
  }));

  const { favorites } = favoritesState;

  return (
    <FlatList
      style={{
        marginBottom: 150,
        top: 16,
      }}
      data={props.availableProducts}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <View>
          <TouchableComponent onPress={() => props.selectHandler(item)}>
            <View>
              <View
                style={{
                  margin: 20,
                  width: 150,
                  height: 150,
                }}
              >
                <ImageBackground
                  source={{ uri: item.image }}
                  style={{
                    width: 163,
                    height: 163,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    left: "70.5%",
                    right: "12.5%",
                    top: "92.83%",
                    bottom: "13.5%",
                    width: 35,
                    height: 35,
                    backgroundColor: "#FFF",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    elevation: 7,
                    borderRadius: 50,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 4,
                    }}
                  >
                    <TouchableComponent
                      onPress={() => {
                        if (
                          favorites.find(
                            (element: string) => element === item.id
                          )
                        ) {
                          dispatch(actions.DeleteFav(item.id));
                        } else {
                          dispatch(actions.AddFav(item.id));
                        }
                        console.log(favorites);
                      }}
                    >
                      {favorites.find(
                        (element: string) => element === item.id
                      ) ? (
                        <MaterialIcons
                          name="favorite"
                          size={24}
                          color="#E7B944"
                        />
                      ) : (
                        <MaterialIcons
                          name="favorite-outline"
                          size={24}
                          color="black"
                        />
                      )}
                    </TouchableComponent>
                  </View>
                </View>
              </View>
              <View>
                <Text
                  numberOfLines={2}
                  style={{
                    margin: 20,
                    width: 150,
                    fontSize: 14,
                    lineHeight: 19,
                    color: "#34283E",
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    marginLeft: 20,
                    width: 100,
                    fontSize: 17,
                    lineHeight: 22,
                    fontWeight: "bold",
                    color: "#34283E",
                  }}
                >
                  $ {item.price}
                </Text>
              </View>
            </View>
          </TouchableComponent>
        </View>
      )}
      horizontal={false}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Products;
