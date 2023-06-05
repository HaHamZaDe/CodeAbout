import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

import ChatRoom from './Pages/ChatRoom/ChatRoom';
import Rooms from './Pages/Rooms/Rooms';
import Login from './Pages/Auth/Login/Login';
import Sign from './Pages/Auth/Sign/Sign';

import colors from './styles/colors';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [userSessison, setUserSession] = useState();
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="SignScreen" component={Sign} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{statusBarColor: colors.lightblue}}>
        {!userSessison ? (
          <Stack.Screen
            name="AuthScreen"
            component={AuthStack}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="RoomsScreen"
              component={Rooms}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RoomsChatScreen"
              component={ChatRoom}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;
