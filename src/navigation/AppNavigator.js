
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Users from '../screens/Users'
import AddUser from '../screens/AddUser'
import Login from '../screens/Login'
import LoginScreen from '../screens/LoginScreen'
const Stack=createStackNavigator()
const AppNavigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Users' component={Users} />
        <Stack.Screen options={{ headerShown: false }} name='AddUser' component={AddUser} />
        
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default AppNavigator