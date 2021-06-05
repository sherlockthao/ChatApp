import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BotTabNavigator from './BotTabNavigator';
import SearchScreen from '../screens/SearchScreen';
import ChatRoom from '../screens/ChatRoomScreen';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="BotTabNavigator">
      <Stack.Screen name="BotTabNavigator" component={BotTabNavigator} options={{
        headerShown: false
      }} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{
        headerShown: true,
        headerTitle: 'Tìm kiếm'
      }} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} options={{
        headerShown: true,
      }} />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
