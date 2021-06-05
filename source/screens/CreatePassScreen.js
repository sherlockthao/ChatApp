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
import { TextInput } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {savePasswordCreated} from '../slices/authSlice';


export default function CreatePassScreen(){
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const email = useSelector(state => state.auth.emailCreated);

  
  const [pass, setPass] = useState('');


  const [isErr, setIsErr] = useState(false);
  const [errorMess, setErrorMess] = useState('');
  


  const onSubmit = () => {
    if(pass === ''){
      setIsErr(true);
      setErrorMess('Vui lòng nhập mật khẩu của bạn.');
    }
    else if (pass.length < 6 || pass.length > 32){
        setIsErr(true);
        setErrorMess('Mật khẩu có độ dài từ 6 đến 32 kí tự');
    }
    else{
      setIsErr(false);
      setErrorMess('');
      dispatch(savePasswordCreated({
          passwordCreated: `${pass}`,
      }),);
      navigation.navigate('CreateAccountLoadingScreen');
    }
  }

  return(
      <View style={styles.container}>
          <Text style={styles.title}>Nhập mật khẩu của bạn</Text>
          <View style={styles.errContainer}>
            {isErr && <FontAwesome5 name={'exclamation-circle'} color={'#FF1744'} solid size={20} />}
            <Text style={styles.err}>{errorMess}</Text>
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
                <Text style={styles.textButton}>Tiếp</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
      paddingTop: 84,
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
    },
    inputContainer: {
      flexDirection: 'row',
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
    },
    errContainer: {
      paddingTop: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
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
    }
  });