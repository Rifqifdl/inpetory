import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Login from '../File/Login';
import Register from '../File/Register';
import Input from '../File/Input';
import CekStok from '../File/CekStok';
import StokMasuk from '../File/StokMasuk';
import StokKeluar from '../File/StokKeluar';
import Home from '../File/Home';
import Edit from '../File/Edit';
import About from '../File/About';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const StokStack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="EditStack"
          component={EditStack}
          options={{ title: 'Kembali', headerShown: true }}
        />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="MyTab" component={MyTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function StokStackScreen() {
  return (
    <StokStack.Navigator screenOptions={{ headerShown: false }}>
      <StokStack.Screen name="CekStok" component={CekStok} />
      <StokStack.Screen name="StokKeluar" component={StokKeluar} />
      <StokStack.Screen name="StokMasuk" component={StokMasuk} />
    </StokStack.Navigator>
  );
}

const EditStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function LogoutAlert({navigation}) {
  const logout = () => {
  // Perform logout logic here
  navigation.navigate('Login'); // Replace 'Login' with the appropriate screen name
  };
  
  return(
  Alert.alert('Logout', 'Anda yakin ingin keluar?', [
    {
      text: 'Batal',
      onPress: () => {{navigation.goBack()}},
      style: 'cancel',
    },
    {text: 'Ya', onPress: () => {logout()}},
  ])
  )
}

const MyTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#2991FF',
        inactiveTintColor: 'black',
        activeBackgroundColor: '#ccffff',
        labelStyle: { fontSize: 13, marginBottom: 10 },
        style: {
          backgroundColor: 'black',
          height: 40,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIconStyle: {backgroundColor: 'red'},
          tabBarActiveTintColor: '#00AE85',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />
       <Tab.Screen
        name="Input"
        component={Input}
        options={{
          tabBarLabel: 'Input',
          tabBarActiveTintColor: '#AE57D7',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-document-edit"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stok"
        component={StokStackScreen}
        options={{
          tabBarLabel: 'Stok',
          tabBarActiveTintColor: '#FF9501',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-table-box"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MyDrawer = () => (
  <Drawer.Navigator useLegacyImplementation>
    <Drawer.Screen name="Manage Data" component={MyTab} />
    <Drawer.Screen name="About" component={About}/>
    <Drawer.Screen name="Logout" component={LogoutAlert} options={{headerShown: false, drawerLabelStyle: { color: 'red' }}}/>
  </Drawer.Navigator>
);
