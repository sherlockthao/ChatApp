import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signUpRequest} from '../slices/authSlice';
import {resetCreateAccountStatus} from '../slices/authSlice';

const scaleValue = new Animated.Value(0);

const AnimatedIcon = new Animated.createAnimatedComponent(FontAwesome5);

export default function CreateAccountLoadingScreen(){

    const navigation = useNavigation();

    const scaleIconFirst = () => {
        scaleValue.setValue(0);
        Animated.timing(scaleValue, {
          toValue: 4,
          duration: 6000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      };
    
    const iconSize = scaleValue.interpolate({
        inputRange: [0, 1.5, 2.5, 4],
        outputRange: [30, 80, 50, 70],
    });
    

    const name = useSelector(state => state.auth.usernameCreated);
    const email = useSelector(state => state.auth.emailCreated);
    const pass = useSelector(state => state.auth.passwordCreated);

    const loadingSignUpRequest = useSelector(
        (state) => state.auth.loadingSignUpRequest,
    );
    const createAccountStatus = useSelector(
        (state) => state.auth.createAccountStatus,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(
          signUpRequest({
            email: email,
            password: pass,
            uuid: `${Math.trunc(1000 + 9000 * Math.random())}`,
          }),
        );
        scaleIconFirst();
    }, []);

    useEffect(() => {
        if (createAccountStatus === 'SUCCESS') {
          setTimeout(() => {
            navigation.navigate('VerifyCodeScreen');
            }, 1500);
        }
        else if (createAccountStatus === 'FAILED') {
            dispatch(resetCreateAccountStatus());
            Alert.alert(
                "Tạo tài khoản không thành công",
                "Email đã được đăng ký.",
                [
                    {
                        text: 'Cancel',
                        onPress: () => navigation.navigate('CreateEmailScreen'),
                        style: 'Hủy'
                    },
                ],
                { cancelable: false }
            )
          }
        }
    );

    if (createAccountStatus === 'SUCCESS') {
        return (
            <View style={styles.container}>
                <AnimatedIcon
                    name={'thumbs-up'}
                    color={'#0091EA'}
                    solid
                    size={iconSize}
                />
            </View>
        );
    }
    if (!loadingSignUpRequest) {
        return <View style={styles.container} />;
      } else {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={'#616161'} />
            <Text style={styles.text}>Đang tạo tài khoản...</Text>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      color: '#0778EB',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });