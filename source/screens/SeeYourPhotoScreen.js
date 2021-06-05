import React, {useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import { Dimensions } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {changeInfoAfterSignUpRequest} from '../slices/authSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SeeYourPhotoScreen({navigation, route}) {
//   const tokenMain = useSelector((state) => state.auth.tokenMain);
//   const usernameCreated = useSelector((state) => state.auth.usernameCreated);
//   const loadingChangeInfoAfterSignUpRequest = useSelector(
//     (state) => state.auth.loadingChangeInfoAfterSignUpRequest,
//   );
    const dispatch = useDispatch();
    const userName = useSelector(state => state.auth.usernameCreated)
    const password = useSelector(state => state.auth.passwordCreated);
    const email = useSelector(state => state.auth.emailCreated);


  const onSave = () => {
    dispatch(
      changeInfoAfterSignUpRequest({
        nameMain: userName,
        passMain: password,
        emailMain: email,
        avatar: route.params.uri,
      }),
    );

  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSave}>
          <Text style={styles.stackButton}>LƯU</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Đến: <Ionicons name="earth" color={'#616161'} size={16} /> Công
        khai
      </Text>
      <Image style={styles.image} source={route.params} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSave} activeOpacity={0.8} >
          <Text style={styles.textButton}>Tiếp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 20,
  },
  text: {
    color: '#616161',
  },
  image: {
    alignSelf: 'center',
    height: windowWidth * 0.85,
    marginTop: 10,
    resizeMode: 'cover',
    width: windowWidth * 0.85,
  },
  stackButton: {
    color: '#616161',
    marginRight: 12,
  },
  modal: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
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

export default SeeYourPhotoScreen;
