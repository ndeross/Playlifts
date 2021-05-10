import "firebase/auth";
import * as Yup from "yup";
import * as firebase from "firebase";

import {
  AppForm,
  ErrorMessage,
  FormField,
  SubmitButton,
} from "../Components/forms";
import { Icon, Layout } from "@ui-kitten/components";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext } from "react";

import AuthContext from "../Navigation/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export default function Login({ navigation, userToken }) {
  const { login } = useContext(AuthContext);

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const renderEyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <Layout style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Image
          source={require("../assets/FullLogo.png")}
          style={styles.image}
        ></Image>

        <AppForm
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            login(values);
          }}
          validationSchema={validationSchema}
        >
          <FormField
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            name="password"
            placeholder="Password"
            accessoryRight={renderEyeIcon}
            secureTextEntry={secureTextEntry}
          />
          <SubmitButton title="Login" />
        </AppForm>
      </KeyboardAwareScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 350,
    marginLeft: 15,
    marginBottom: 15,
  },
  form: {
    flex: 1,
  },
});
