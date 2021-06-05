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
import auth, { firebase } from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {saveEmailCreated} from '../slices/authSlice';

export default function CreateEmailScreen(){

  const navigation = useNavigation();
  const dispatch = useDispatch();

  
  const [email, setEmail] = useState('');


  const [isErr, setIsErr] = useState(false);
  const [errorMess, setErrorMess] = useState('');
  
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const onSubmit = () => {
    if(email === ''){
      setIsErr(true);
      setErrorMess('Vui lòng nhập email của bạn.');
    }
    else if(reg.test(email) === false){
      setIsErr(true);
      setErrorMess('Vui lòng nhập đúng định dạng email. (VD: abc@gmail.com)');
    }
    else{
      setIsErr(false);
      setErrorMess('');
      dispatch(saveEmailCreated({
        emailCreated: `${email}`,
      }),);
      navigation.navigate('CreatePassScreen');
    }
  }

  return(
      <View style={styles.container}>
          <Text style={styles.title}>Nhập Email của bạn</Text>
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
    textAlign: 'center',
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