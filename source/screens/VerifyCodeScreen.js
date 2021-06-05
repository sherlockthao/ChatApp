import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {getVerifyCodeRequest, checkVerifyCodeRequest} from '../slices/authSlice';


export default function VerifyCodeScreen(){

    // const email = useSelector(state => state.auth.emailCreated);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // const currentUser = firebase.auth().currentUser;

    // const [isConfirm,setIsConfirm] = useState(false);

    const isConfirm = useSelector(state => state.auth.isEmailVerified);

    useEffect(() => {
        //firebase.auth().currentUser.sendEmailVerification();
        dispatch(getVerifyCodeRequest());
    },[]);

    const getVerify = () => {
        dispatch(getVerifyCodeRequest());
    }


    const confirmEmail = async () => {
        // await firebase.auth().currentUser.reload();
        // if(firebase.auth().currentUser.emailVerified){
        //     setIsConfirm(true);
        //     // setTimeout(() => {
        //     //     navigation.navigate('CreatePhotoScreen');
        //     // }, 2000);
        // }
        dispatch(checkVerifyCodeRequest());
    }

    if(!isConfirm){
        return(
            <View style={styles.container}>
                <Text style={styles.textNotice}>Chúng tôi đã gửi email xác thực cho bạn. Vui lòng kiểm tra hòm thư để tiếp tục.</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={getVerify}>
                        <Text style={styles.textButton}>Gửi lại</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={confirmEmail}>
                        <Text style={styles.textButton}>Xác thực</Text>
                    </TouchableOpacity>
                </View>        
            </View>
        );
    }
    else{
        return(
            <View style={styles.container}>
                <Text style={styles.textTitle}>Chào mừng bạn đến với chúng tôi</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreatePhotoScreen')}>
                        <Text style={styles.textButton}>Tiếp</Text>
                    </TouchableOpacity>
                </View>  
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingTop: 50
    },
    buttonContainer: {
        flexDirection: 'row',
      },
    button: {
        flex: 1,
        backgroundColor: '#2979FF',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 50
    },
    textButton: {
        fontSize: 16,
        color: '#FFFFFF'
    },
    textTitle: {
        fontSize: 40,
        textAlign: 'center',
        justifyContent: 'center'
    },
    textNotice: {
        fontSize: 20,
    }
});