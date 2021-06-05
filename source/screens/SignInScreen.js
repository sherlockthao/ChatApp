import React, {useLayoutEffect} from 'react';
import {
    ActivityIndicator,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Switch,
    Dimensions,
    Alert
  } from 'react-native';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-paper';
import {loginRequestFromSignInScreen} from '../slices/authSlice';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default function SignInScreen(){

    const dispatch = useDispatch();
    const isFailse = useSelector(state => state.auth.loginRequestFromSignInScreenStatus);

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [isErr, setIsErr] = useState(false);
    const [errorMess, setErrorMess] = useState('');
    
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const onSubmit = () => {
        if(email === '' && pass === ''){
            setIsErr(true);
            setErrorMess('Vui lòng nhập email và mật khẩu của bạn.');
        }
        else if(email === ''){
            setIsErr(true);
            setErrorMess('Vui lòng nhập email của bạn.');
        }
        else if(reg.test(email) === false){
            setIsErr(true);
            setErrorMess('Vui lòng nhập đúng định dạng email. (VD: abc@gmail.com)');
        }
        else if( pass === ''){
            setIsErr(true);
            setErrorMess('Vui lòng nhập mật khẩu của bạn.');
        }
        else{
            setIsErr(false);
            setErrorMess('');
            // dispatch(saveEmailCreated({
            //     emailCreated: `${email}`,
            // }),);
            // navigation.navigate('CreatePassScreen');
            dispatch(loginRequestFromSignInScreen({
                email: email,
                password: pass
            }))
            
        }
    }

    useLayoutEffect(() => {
        
        if(isFailse === false){
            Alert.alert(
                "Đăng nhập thất bại",
                "Tên đăng nhập hoặc mật khẩu không chính xác",
            )
        }
    });

    return(
        <View style={styles.container}>
            <Image source={require('../../assets/images/signInBackground.jpg')} style={styles.img} resizeMode={'cover'} />
            <View style={styles.errContainer}>
                {isErr && <FontAwesome5 name={'exclamation-circle'} color={'#FF1744'} solid size={20} />}
                <Text style={styles.err}>{errorMess}</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <TextInput label="Email" 
                        style={{backgroundColor: '#FFFFFF'}}
                        value={email}
                        keyboardType="email-address"
                        onChangeText={text => setEmail(text)}
                    >
                    </TextInput>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <TextInput label="Mật khẩu" 
                        style={{backgroundColor: '#FFFFFF'}}
                        value={pass}
                        secureTextEntry={true}
                        onChangeText={text => setPass(text)}
                    >
                    </TextInput>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onSubmit} activeOpacity={0.8} >
                    <Text style={styles.textButton}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    img: {
        width: WINDOW_WIDTH,
        height: WINDOW_WIDTH*3/5
    },
    inputContainer: {
        flexDirection: 'row',
        paddingHorizontal: 30,
    },
    input: {
        paddingVertical: 10,
        flex: 1,
        paddingHorizontal: 3,
    },
    err: {
        fontSize: 14,
        color: '#FF1744',
        marginLeft: 10,
        textAlign: 'center',
    },
    errContainer: {
        paddingTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 30
    },
    button: {
        flex: 1,
        backgroundColor: '#2979FF',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 50,
        
    },
    textButton: {
        fontSize: 16,
        color: '#FFFFFF'
    },

})