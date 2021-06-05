import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SelectAccountScreen from '../screens/SelectAccountScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import CreateNameScreen from '../screens/CreateNameScreen';
import CreateBirthdayScreen from '../screens/CreateBirthdayScreen';
import CreateEmailScreen from '../screens/CreateEmailScreen';
import CreatePassScreen from '../screens/CreatePassScreen';
import CreateAccountLoadingScreen from '../screens/CreateAccountLoadingScreen';
import SignInAlertScreen from '../screens/SignInAlertScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import CreatePhotoScreen from '../screens/CreatePhotoScreen';
import SeeYourPhotoScreen from '../screens/SeeYourPhotoScreen';
import SignInScreen from '../screens/SignInScreen';

const Stack = createStackNavigator();

export default function AuthStackNavigation(){
    return(
        <Stack.Navigator initialRouteName="SelectAccountScreen">
            <Stack.Screen
                name="SelectAccountScreen"
                component={SelectAccountScreen}
                options={{
                headerShown: false,
                }}
            />
            <Stack.Screen
                name="CreateAccountScreen"
                component={CreateAccountScreen}
                options={{
                    headerTitle: 'Tạo tài khoản'
                }}
            />
            <Stack.Screen
                name="CreateNameScreen"
                component={CreateNameScreen}
                options={{
                    headerTitle: 'Tên'
                }}
            />
            <Stack.Screen
                name="CreateBirthdayScreen"
                component={CreateBirthdayScreen}
                options={{
                    headerTitle: 'Ngày sinh'
                }}
            />
            <Stack.Screen
                name="CreateEmailScreen"
                component={CreateEmailScreen}
                options={{
                    headerTitle: 'Email'
                }}
            />
            <Stack.Screen
                name="CreatePassScreen"
                component={CreatePassScreen}
                options={{
                    headerTitle: 'Mật khẩu'
                }}
            />
            <Stack.Screen
                name="VerifyCodeScreen"
                component={VerifyCodeScreen}
                options={{
                    headerTitle: 'Xác thực'
                }}
            />
            <Stack.Screen
                name="CreateAccountLoadingScreen"
                component={CreateAccountLoadingScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SignInAlertScreen"
                component={SignInAlertScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CreatePhotoScreen"
                component={CreatePhotoScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SeeYourPhotoScreen"
                component={SeeYourPhotoScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}