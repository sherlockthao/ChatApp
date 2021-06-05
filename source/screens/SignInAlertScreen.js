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

export default function SignInAlertScreen(){
    return(
        <View>
            <Text>abc</Text>
        </View>
    );
}