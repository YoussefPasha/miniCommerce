import React from "react";
import { Text, View } from "react-native";

const CategoriesScreen = (props: any) => {
  const product = props.route.params.product;

  return (
    <View>
      <Text
        style={{
          width: 340,
          top: 25,
          left: 16,
          fontSize: 19,
          lineHeight: 23,
          letterSpacing: -0.49,
          color: "#34283E",
        }}
      >
        {product.title}
      </Text>
      <Text
        style={{
          width: 340,
          top: 60,
          left: 16,
          fontSize: 25,
          lineHeight: 31,
          letterSpacing: 0.35,
          color: "#34283E",
          fontWeight: "bold",
        }}
      >
        $ {product.price}
      </Text>
    </View>
  );
};

export default CategoriesScreen;
