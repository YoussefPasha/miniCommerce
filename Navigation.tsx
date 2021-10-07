import React, { useState } from "react";
import { Alert, Platform, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useSelector } from "react-redux";

import Categories from "./pages/CategoriesScreen";
import Detailed from "./pages/DetailedScreen";
import Favorite from "./pages/Fav";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import { Ionicons } from "@expo/vector-icons";

const ShopStack = createStackNavigator();

const Navigator = () => {
  const [loaded, error] = useFonts({
    regular: require("./assets/fonts/font.ttf"),
  });

  if (error) {
    Alert.alert("error");
  }
  const Tab: any =
    Platform.OS === "android"
      ? createMaterialBottomTabNavigator()
      : createBottomTabNavigator();

  const ShopStackNavigator = () => {
    return (
      <ShopStack.Navigator
        screenOptions={({ route }: any) => ({
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "700",
          },
          headerTintColor: "#F4F3F4",
          headerBackground: () => (
            <LinearGradient
              colors={["#845FA2", "#34283E"]}
              start={[1, 0]}
              end={[0, 1]}
            >
              <Text
                style={{
                  height: "100%",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#FFFFFF",
                  top: "50%",
                  fontSize: 19,
                  fontFamily: "regular",
                }}
              >
                {route.name === "ProductsOverview" ? "Clothing" : ""}
              </Text>
            </LinearGradient>
          ),
          cardStyle: { backgroundColor: "#F4F3F4" },
        })}
      >
        <ShopStack.Screen
          name="ProductsOverview"
          component={Categories}
          options={{
            headerTitle: "",
          }}
        ></ShopStack.Screen>
        <ShopStack.Screen
          name="ProductDetail"
          component={Detailed}
          options={{
            headerTitle: "",
          }}
        ></ShopStack.Screen>
      </ShopStack.Navigator>
    );
  };

  const MainTab = () => {
    const { favoritesState } = useSelector((state: any) => ({
      favoritesState: state.favorite,
    }));

    const { favorites } = favoritesState;
    return (
      <Tab.Navigator
        initialRouteName="Catalogue"
        activeColor="#34283E"
        inactiveColor="#fff"
        labelStyle={{
          fontSize: 12,
        }}
        barStyle={{ backgroundColor: "#fff" }}
        screenOptions={({ route }: any) => ({
          tabBarIcon: ({ focused, color }: any) => {
            let iconName: any;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            }
            if (route.name === "Catalogue") {
              iconName = focused ? "apps" : "apps-outline";
            }
            if (route.name === "Favorite") {
              iconName = focused ? "heart" : "heart-outline";
            }
            if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={20} color={"#000000"} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Catalogue" component={ShopStackNavigator} />
        <Tab.Screen
          name="Favorite"
          options={{
            tabBarBadge: favorites.length,
            tabBarBadgeStyle: { backgroundColor: "#E7B944" },
          }}
          component={Favorite}
        />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };

  return <>{loaded ? <MainTab /> : <AppLoading />}</>;
};

export default Navigator;
