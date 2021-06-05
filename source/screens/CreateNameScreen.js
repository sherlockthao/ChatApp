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
import {useDispatch} from 'react-redux';
import {saveUsernameCreated} from '../slices/authSlice';

export default function CreateNameScreen(){

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isErr, setIsErr] = useState(false);
  const [errorMess, setErrorMess] = useState('');
  // let errorMess  = '';
  // let isErr = true;
  const onSubmit = () => {
    if(firstName === '' && lastName === ''){
      setIsErr(true);
      setErrorMess('Vui lòng nhập họ và tên của bạn.');
      console.log(isErr);
    }
    else if(firstName === ''){
      setIsErr(true);
      setErrorMess('Vui lòng nhập họ của bạn.');
    }
    else if(lastName === ''){
      setIsErr(true);
      setErrorMess('Vui lòng nhập tên của bạn.');
    }
    else{
      setIsErr(false);
      setErrorMess('');
      dispatch(saveUsernameCreated({
        usernameCreated: `${firstName} ${lastName}`,
      }),
      );
      navigation.navigate('CreateBirthdayScreen');
    }
  }
  
  
  return(
      <View style={styles.container}>
          <Text style={styles.title}>Bạn tên gì?</Text>
          <View style={styles.errContainer}>
            {isErr && <FontAwesome5 name={'exclamation-circle'} color={'#FF1744'} solid size={20} />}
            <Text style={styles.err}>{errorMess}</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <TextInput label="Họ" 
                style={{backgroundColor: '#FFFFFF'}}
                value={firstName}
                onChangeText={text => setFirstName(text)}
              >
              </TextInput>
            </View>
            <View style={styles.input}>
              <TextInput label="Tên" 
                style={{backgroundColor: '#FFFFFF'}}
                value={lastName}
                onChangeText={text => setLastName(text)}
                >
              </TextInput>
            </View>
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onSubmit} activeOpacity={0.8}>
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