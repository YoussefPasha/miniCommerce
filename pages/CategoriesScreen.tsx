import AppLoading from "expo-app-loading";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Platform,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as categoriesActions from "../store/actions/categories";
import * as productsActions from "../store/actions/products";
import Categories from "../components/categories";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ProductsComponent from "../components/products";

const CategoriesScreen = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesActions.fetchCategories());
    dispatch(productsActions.fetchProducts());
  }, []);

  const { categoriesState } = useSelector((state: any) => ({
    categoriesState: state.categories,
  }));

  const { productsState } = useSelector((state: any) => ({
    productsState: state.products,
  }));

  const { categories } = categoriesState;
  const { availableProducts } = productsState;

  const [selectedFilter, setSelectedFilter] = useState("All");

  let TouchableComponent: any;
  TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(availableProducts);
  }, [availableProducts]);

  const filter = (f: string) => {
    if (f === "All") {
      setFilteredProducts(availableProducts);
    } else {
      console.log(categories[parseInt(f) + 1].name);
      console.log(f);

      setFilteredProducts(
        availableProducts.filter((product: any) => {
          return (
            product.category.toLowerCase() ===
            categories[parseInt(f) + 1].name.toLowerCase()
          );
        })
      );
    }
  };

  const selectHandler = (item: any) => {
    props.navigation.navigate("ProductDetail", {
      product: item,
    });
  };

  return (
    <View>
      {categories ? (
        <Categories
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          categories={categories}
          filter={filter}
        />
      ) : (
        <AppLoading />
      )}
      <>
        <ScrollView>
          <Text
            style={{
              fontWeight: "bold",
              left: 16,
              top: 16,
              color: "#34283E",
              fontSize: 19,
              fontFamily: "regular",
              marginBottom: 10,
            }}
          >
            {filteredProducts.length} items
          </Text>
          {filteredProducts ? (
            <ProductsComponent
              availableProducts={filteredProducts}
              selectHandler={selectHandler}
            />
          ) : (
            <AppLoading />
          )}
        </ScrollView>
      </>
    </View>
  );
};

export default CategoriesScreen;
