import React from "react";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./theme.json";

import {
  ApplicationProvider,
  Layout,
  TextIconRegistry,
  IconRegistry,
} from "@ui-kitten/components";
import WelcomeScreen from "../PlayLifts/Screens/WelcomeScreen";
import AppNavigator from "./Navigation/AppNavigator";

export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
    <IconRegistry icons={EvaIconsPack} />
    <AppNavigator />
  </ApplicationProvider>
);
