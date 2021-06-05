import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {loginRequestFromSelectAccountScreen} from '../slices/authSlice';

export default function SelectAccountScreen(){

    const haveDataPersist = useSelector((state) => state.auth.haveDataPersist);
    const avatarPersist = useSelector((state) => state.auth.avatarPersist);
    const usernamePersist = useSelector((state) => state.auth.usernamePersist);
    const emailPersist = useSelector((state) => state.auth.emailPersist);
    const passwordPersist = useSelector((state) => state.auth.passwordPersist);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onPressCreate = () => {
        navigation.navigate('CreateAccountScreen');
    }

    const onLogin = () => {
        if(emailPersist !== null){
            dispatch(loginRequestFromSelectAccountScreen({
                email: emailPersist,
                password: passwordPersist
            }))
        }
        
    }

    return(
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <FontAwesome5 name={'facebook-messenger'} solid size={55} color={'#2979FF'} />
            </View>
            <TouchableOpacity style={styles.secondRow} activeOpacity={0.8} onPress={onLogin}>
                <View style={styles.user}>
                    <Image source={{uri : avatarPersist}} style={styles.avatar} />
                    <Text style={styles.username}>{usernamePersist}</Text>
                </View>
                <FontAwesome5 name={'ellipsis-v'} solid size={23} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.thirdRow} onPress={() => navigation.navigate('SignInScreen')}>
                <FontAwesome5 name={'plus-square'} solid size={25} color={'#1565C0'} />
                <Text style={styles.text}>Đăng nhập bằng tài khoản khác</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lastRow} onPress={onPressCreate}>
                <Text style={styles.bottomText}>TẠO TÀI KHOẢN MỚI</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 35,
        paddingVertical: 15
    },
    firstRow: {
        alignItems: 'center',
    },  
    secondRow: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center'
    },  
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    username: {
        paddingLeft: 15,
        fontSize: 18,
        color: '#212121'
    },
    thirdRow: {
        flexDirection: 'row',
        marginTop: 15,
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    text: {
        color: '#1565C0',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    lastRow: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: '#E3F2FD',
        paddingVertical: 8,
        paddingHorizontal: 90,
        borderRadius: 10,
    },
    bottomText: {
        color: '#1565C0',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});