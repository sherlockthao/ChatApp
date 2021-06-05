import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import React, {useLayoutEffect} from 'react';
import FriendScreen from '../screens/FriendScreen';
import ChatScreen from '../screens/ChatScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import 'react-native-gesture-handler';
import SettingScreen from '../screens/SettingScreen';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, TextInput, Animated, Easing, Image, FlatList, Dimensions, Alert } from 'react-native';
const Tab = AnimatedTabBarNavigator();

export default function BotTabNavigator(){

    
    return (

        <Tab.Navigator 
          tabBarOptions={{
            activeTintColor: "#2F7C6E",
            inactiveTintColor: "#222222",
          }}
        >
            <Tab.Screen name="Chat" component={ChatScreen}
              options={{
                tabBarIcon: ({focused , color, size}) => (
                  <FontAwesome5 name="comment" size={size ? size : 27} focused={focused} color={focused ? color : "#222222"} />
                )
              }}
            />
            <Tab.Screen name="Friend" component={FriendScreen} 
              options={{
                tabBarIcon: ({focused , color, size}) => (
                  <FontAwesome5 name="user-friends" size={size? size : 27} focused={focused} color={focused ? color : "#222222"} />
                )
              }}
            />
            <Tab.Screen name="Setting" component={SettingScreen} 
              options={{
                tabBarIcon: ({focused , color, size}) => (
                  <FontAwesome5 name="cogs" size={size? size : 27} focused={focused} color={focused ? color : "#222222"} />
                )
              }}
            />
        </Tab.Navigator>
      );

}

// const Tab = createMaterialTopTabNavigator();
// export default function BotTabNavigator(){

//   return(
//     <Tab.Navigator
//     initialRouteName={'Chat'}
//     tabBarOptions={{
//       activeTintColor: '#2979ff',
//       inactiveTintColor: '#B0BEC5',
//       showIcon: true,
//       showLabel: false,
//     }}
//     tabBarPosition="bottom"
//     screenOptions={({route}) => ({
//       tabBarIcon: ({focused, color}) => {
//         let iconName;
//         if (route.name === 'Chat') {
//           iconName = 'facebook-messenger';
//           color = focused ? '#2979FF' : '#B0BEC5'; 
//         } else if (route.name === 'Friend') {
//           iconName = 'user-friends';
//           color = focused ? '#2979FF' : '#B0BEC5'; 
//         } else if (route.name === 'Setting') {
//           iconName = 'cogs';
//           color = focused ? '#2979FF' : '#B0BEC5'; 
//         }
//         return <FontAwesome5 name={iconName} size={27} color={color} style={{marginRight: -15, }} />;
//       },
//       tabBarLabel: ({focused, color}) => {
//         return <Text>{route.name}</Text>
//       }
//     })}
//     >
//       <Tab.Screen name={"Chat"} component={ChatScreen} />
//       <Tab.Screen name={"Friend"} component={FriendScreen} />
//       <Tab.Screen name={"Setting"} component={SettingScreen} />
//     </Tab.Navigator>
//   );
// }