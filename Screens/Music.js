import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

function Music(props) {
  return (
    <View style={styles.container}>
      <Text> Music page works! </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
});

export default Music;
