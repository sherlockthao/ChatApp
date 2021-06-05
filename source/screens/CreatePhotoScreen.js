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
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import {useEffect} from 'react';
import {saveTokenDataFromSignInAlertScreen} from '../slices/authSlice';

export default function CreatePhotoScreen() {
    
    const navigation = useNavigation();
    const currentUser = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref(currentUser + '/profilePicture/');

    const dispatch = useDispatch();
    const userName = useSelector(state => state.auth.usernameCreated)
    const password = useSelector(state => state.auth.passwordCreated);
    const email = useSelector(state => state.auth.emailCreated);
    const token = firebase.auth().currentUser.uid;
    // console.log("token: "+ token);

    useEffect(() => {
      dispatch(saveTokenDataFromSignInAlertScreen({
        token: token,
        username: userName,
        password: password,
        email: email
      }));
    },[]);

    const selectFromLibrary = () => {
        launchImageLibrary(
          {
            storageOptions: {
              path: 'images',
            },
            mediaType: 'photo',
          },
          (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else {
                const source = {uri: response.uri};
                navigation.navigate('SeeYourPhotoScreen', source);
            }
          },
        );
      };
    
    const selectFromCamera = () => {
        launchCamera(
            {
                storageOptions: {
                    path: 'images',
                },
                mediaType: 'photo',
                },
                (response) => {
                if (response.didCancel) {
                } else if (response.error) {
                } else {
                    const source = {uri: response.uri};
                    console.log('File size:', response.fileSize);
                    navigation.navigate('SeeYourPhotoScreen', source);
                }
            },
        );
    };


    return (
        <View style={styles.container}>
          <Text style={styles.text}>
            Hãy thêm ảnh đại diện để bạn bè dễ dàng tìm thấy bạn hơn
          </Text>
          <Image
            source={require('../../assets/images/addYourPhoto.jpg')}
            style={styles.image}
          />
          <View style={styles.bottom}>
            <TouchableOpacity onPress={selectFromLibrary}>
              <View style={styles.topButton}>
                <Text style={styles.topButtonText}>Chọn từ thư viện</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={selectFromCamera}>
              <View style={styles.bottomButton}>
                <Text style={styles.bottomButtonText}>Chụp ảnh</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      flex: 1,
      padding: 24,
    },
    text: {
      color: '#212121',
      fontSize: 22,
      textAlign: 'center',
    },
    image: {
      height: 140,
      marginTop: 36,
      width: 180,
    },
    bottom: {
      borderTopColor: '#9e9e9e',
      borderTopWidth: 0.5,
      bottom: 0,
      left: 0,
      padding: 20,
      position: 'absolute',
      right: 0,
    },
    topButton: {
      backgroundColor: '#2979ff',
      borderRadius: 4,
      padding: 10,
    },
    topButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    bottomButton: {
      backgroundColor: '#e3f2fd',
      borderRadius: 4,
      marginTop: 15,
      padding: 10,
    },
    bottomButtonText: {
      color: '#2979ff',
      fontWeight: 'bold',
      textAlign: 'center',
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
  });