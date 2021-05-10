import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
} from "@ui-kitten/components";

import ProfileScreen from "../Screens/ProfileScreen";
import Workouts from "../Screens/Workouts";
import Music from "../Screens/Music";
import NewWorkout from "../Screens/NewWorkout";

const Tab = createMaterialBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Profile" />
    <BottomNavigationTab title="Workouts" />
    <BottomNavigationTab title="Music" />
    <BottomNavigationTab title="New" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    barStyle={{ backgroundColor: "#ECAC67" }}
  >
    <Tab.Screen
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
      name="Profile"
      component={ProfileScreen}
    />
    <Tab.Screen
      options={{
        tabBarLabel: "Workouts",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="weight-lifter"
            color={color}
            size={26}
          />
        ),
      }}
      name="Workouts"
      component={Workouts}
    />
    <Tab.Screen
      options={{
        tabBarLabel: "Music",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="music" color={color} size={26} />
        ),
      }}
      name="Music"
      component={Music}
    />
    <Tab.Screen
      options={{
        tabBarLabel: "New Workout",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus" color={color} size={26} />
        ),
      }}
      name="New"
      component={NewWorkout}
    />
  </Tab.Navigator>
);

export default function MainTab() {
  return <TabNavigator style={styles.tab} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNavigation: {
    marginVertical: 8,
    position: "absolute",
    bottom: 0,
  },
  tab: {
    marginVertical: 10,
  },
});
