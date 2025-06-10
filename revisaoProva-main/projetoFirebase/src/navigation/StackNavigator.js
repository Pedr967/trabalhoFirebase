import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

// Função para botão logout
const LogoutButton = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();  
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao sair.');
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
      <Text style={{ color: 'red', fontWeight: 'bold' }}>Logout</Text>
    </TouchableOpacity>
  );
};

const screenOptionsWithLogout = (navigation) => ({
  headerRight: () => <LogoutButton navigation={navigation} />,
});

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={({ navigation }) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="HomeTabs"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UserDetails"
      component={UserDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={({ navigation }) => ({
        ...screenOptionsWithLogout(navigation),
      })}
    />
  </Stack.Navigator>
);

export default StackNavigator;
