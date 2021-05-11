import "react-native-gesture-handler";

import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firebase-firestore";
import firebaseConfig from "../Firebase/firebaseConfig";

import initWorkout from "../Firebase/initWorkout";

import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import AuthContext from "./AuthContext";

import WelcomeScreen from "../Screens/WelcomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SplashScreen from "../Screens/SplashScreen";
import Join from "../Screens/Join";
import Login from "../Screens/Login";
import MainTab from "./MainTab";

const Stack = createStackNavigator();

export default function AppNavigator({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "LOG_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  async function createUserData(userData) {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  }

  const authContext = useMemo(
    () => ({
      login: async (userValues) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        const { email, password } = userValues;
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            const uid = response.user.uid;
            const userToken = response.user;
            const userData = { userToken };

            createUserData(userData);

            const usersRef = firebase.firestore().collection("users");

            dispatch({ type: "LOG_IN", token: JSON.stringify(userToken) });

            usersRef
              .doc(uid)
              .get()
              .then((firestoreDocument) => {
                if (!firestoreDocument.exists) {
                  alert("User does not exist anymore.");
                  return;
                }

                const user = firestoreDocument.data();
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            alert(error);
          });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),

      join: async (userValues) => {
        const { email, password, userName } = userValues;

        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)

          .then((response) => {
            //const uid = response.user.uid;
            const userToken = response.user;

            const userData = { userToken };

            var user = firebase.auth().currentUser;
            user
              .updateProfile({
                displayName: userValues.userName,
                photoURL: userValues.profilePicture,
              })
              .then(function () {
                // Update successful.
              })
              .catch(function (error) {
                // An error happened.
              });

            createUserData(userData);

            const data = {
              id: userToken.uid,
              userName: userValues.userName,
              email: userToken.email,
              accountCreated: "Today",
            };

            const usersRef = firebase.firestore().collection("users");

            const workoutsRef = firebase
              .firestore()
              .collection("users")
              .doc(userToken.uid)
              .collection("workouts")
              .doc("user workouts");

            dispatch({
              type: "LOG_IN",
              token: JSON.stringify(userToken),
            });

            usersRef
              .doc(userToken.uid)
              .set(data)
              .then(() => {})
              .catch((error) => {
                alert(error);
              });
            workoutsRef.set(initWorkout);
          })
          .catch((error) => {
            alert(error);
          });

        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode={false}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Join" component={Join} />
              <Stack.Screen name="Login" component={Login} />
            </>
          ) : (
            <>
              <Stack.Screen name="Profile" component={MainTab} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "green",
    marginBottom: 900,
  },
});
