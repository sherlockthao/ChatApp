import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AuthStackNavigator from './source/navigation/AuthStackNavigation';
import MainStackNavigator from './source/navigation/MainStackNavigation'
import SplashScreen from './source/screens/SplashScreen';
import {bootstrapAsync} from './source/slices/authSlice';



export default function AppContainer(){

    const showSplash = useSelector((state) => state.auth.showSplash);
    const inApp = useSelector((state) => state.auth.inApp);
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(bootstrapAsync());
    }, []);

    // if (!showSplash) {
    //     return <SplashScreen />;
    // }
    
    if (inApp) {
        return <MainStackNavigator />;
    } else {
    
        return <AuthStackNavigator />;
    }

    // return <MainStackNavigator />
}
