import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

function NewWorkout(props) {
  return (
    <View style={styles.container}>
      <Text> New workout page works! </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
});

export default NewWorkout;
