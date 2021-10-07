import React from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

interface compProps {
  selectedFilter: String;
  categories: [id: String, name: String];
  setSelectedFilter: Function;
  filter: Function;
}

let TouchableComponent: any;
TouchableComponent = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const Categories = (props: compProps) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <FlatList
        data={props.categories}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor:
                props.selectedFilter === item.id ? "#E7B944" : "#FFFFFF",
              borderRadius: 40,
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 12,
              paddingRight: 12,
              margin: 6,
              marginBottom: 12,
              top: 12,
              height: 26,
              alignItems: "center",
            }}
          >
            <TouchableComponent
              onPress={() => {
                props.setSelectedFilter(item.id);
                props.filter(item.id);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "regular",
                  color:
                    props.selectedFilter === item.id ? "#FFFFFF" : "#605A65",
                }}
              >
                {item.name}
              </Text>
            </TouchableComponent>
          </View>
        )}
        horizontal={true}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;
