import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppContainer from './AppContainer';
import {Provider} from 'react-redux';
import store from './source/app/store';
import auth, { firebase } from '@react-native-firebase/auth';


export default function App(props){

  return(
    <Provider store={store}>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </Provider>

  );
}

//   const [source, setSource] = useState(null);

//   const selectFromLibrary = () => {
//     launchImageLibrary(
//       {
//         storageOptions: {
//           path: 'images',
//         },
//         mediaType: 'photo',
//       },
//       (response) => {
//         if (response.didCancel) {
//         } else if (response.error) {
//         } else {
//             setSource(response.uri);
//             // navigation.navigate('SeeYourPhotoScreen', source);
            
//             console.log("uri: " + response.uri);
//             var storageRef = firebase.storage().ref(`user/images`);
//             storageRef.putFile(response.uri)
//               .on(
//                 firebase.storage.TaskEvent.STATE_CHANGED,
//                 snapShot => {
//                   console.log("snapshot: " + snapShot.state);
//                   console.log("progress: " + (snapShot.bytesTransferred / snapShot.totalBytes) * 100);

//                   if (snapShot.state === firebase.storage.TaskState.SUCCESS) {
//                     console.log("Success");
//                   }
//                 },
//                 error => {
//                   unsubscribe();
//                   console.log("image upload error: " + error.toString());
//                 },
//                 () => {
//                   storageRef.getDownloadURL()
//                     .then((downloadUrl) => {
//                       console.log("File available at: " + downloadUrl);
//                     })
//                 }
//               )
//         }
//       },
//     );
//   };

// const selectFromCamera = () => {
//     launchCamera(
//         {
//             storageOptions: {
//                 path: 'images',
//             },
//             mediaType: 'photo',
//             },
//             (response) => {
//             if (response.didCancel) {
//             } else if (response.error) {
//             } else {
//                 setSource(response.uri);
//                 console.log('File size:', response.fileSize);
//                 // navigation.navigate('SeeYourPhotoScreen', source);
//                 console.log("uri: " + response.uri);
//                 var storageRef = firebase.storage().ref(`users/images`);
//                 storageRef.putFile(response.uri)
//                   .on(
//                     firebase.storage.TaskEvent.STATE_CHANGED,
//                     snapShot => {
//                       console.log("snapshot: " + snapShot.state);
//                       console.log("progress: " + (snapShot.bytesTransferred / snapShot.totalBytes) * 100);

//                       if (snapShot.state === firebase.storage.TaskState.SUCCESS) {
//                         console.log("Success");
//                       }
//                     },
//                     error => {
//                       unsubscribe();
//                       console.log("image upload error: " + error.toString());
//                     },
//                     () => {
//                       storageRef.getDownloadURL()
//                         .then((downloadUrl) => {
//                           console.log("File available at: " + downloadUrl);
//             })})
//             }
//         },
//     );
// };


// return (
//     <View style={styles.container}>
//       <Text style={styles.text}>
//         Hãy thêm ảnh đại diện để bạn bè dễ dàng tìm thấy bạn hơn
//       </Text>
//       <Image
//         source={{uri : source}}
//         style={styles.image}
//       />
//       <View style={styles.bottom}>
//         <TouchableOpacity onPress={selectFromLibrary}>
//           <View style={styles.topButton}>
//             <Text style={styles.topButtonText}>Chọn từ thư viện</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={selectFromCamera}>
//           <View style={styles.bottomButton}>
//             <Text style={styles.bottomButtonText}>Chụp ảnh</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
// );
// }

// const styles = StyleSheet.create({
// container: {
//   alignItems: 'center',
//   backgroundColor: '#FFFFFF',
//   flex: 1,
//   padding: 24,
// },
// text: {
//   color: '#212121',
//   fontSize: 22,
//   textAlign: 'center',
// },
// image: {
//   height: 140,
//   marginTop: 36,
//   width: 180,
// },
// bottom: {
//   borderTopColor: '#9e9e9e',
//   borderTopWidth: 0.5,
//   bottom: 0,
//   left: 0,
//   padding: 20,
//   position: 'absolute',
//   right: 0,
// },
// topButton: {
//   backgroundColor: '#2979ff',
//   borderRadius: 4,
//   padding: 10,
// },
// topButtonText: {
//   color: '#FFFFFF',
//   fontWeight: 'bold',
//   textAlign: 'center',
// },
// bottomButton: {
//   backgroundColor: '#e3f2fd',
//   borderRadius: 4,
//   marginTop: 15,
//   padding: 10,
// },
// bottomButtonText: {
//   color: '#2979ff',
//   fontWeight: 'bold',
//   textAlign: 'center',
// },
// stackButton: {
//   color: '#616161',
//   marginRight: 12,
// },
// modal: {
//   alignItems: 'center',
//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   flex: 1,
//   justifyContent: 'center',
// },
// });
