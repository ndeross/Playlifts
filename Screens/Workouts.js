import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

function Workouts(props) {
  return (
    <View style={styles.container}>
      <Text> Workout page! </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
});

export default Workouts;
