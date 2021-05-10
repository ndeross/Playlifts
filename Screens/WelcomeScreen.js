import { Button, Layout, Text } from "@ui-kitten/components";
import { Image, StyleSheet } from "react-native";

import React from "react";

function WelcomeScreen({ navigation }) {
  return (
    <Layout style={styles.container}>
      <Image
        source={require("../assets/FullLogo.png")}
        style={styles.image}
      ></Image>

      <Button
        style={styles.buttons}
        size="large"
        onPress={() => navigation.navigate("Login")}
      >
        Login
      </Button>

      <Text style={styles.text} category="s1">
        Don't have a Playlifts account?
      </Text>
      <Button
        style={styles.buttons}
        size="large"
        onPress={() => navigation.navigate("Join")}
      >
        Join Playlifts!
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  text: {
    marginTop: 20,
    textAlign: "center",
  },
  buttons: {
    marginTop: 20,
  },
});

export default WelcomeScreen;
