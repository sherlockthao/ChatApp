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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker'

export default function CreateBirthdayScreen(){
    
    const navigation = useNavigation();

    const [date, setDate] = useState(new Date(940499990000));
    const [maxDate, setMaxDate] = useState(new Date(1298021730000));
    const [minDate, setMinDate] = useState(new Date(640499990000));

    const onSubmit = () => {
        navigation.navigate('CreateEmailScreen');
    }
    
    return(

        <View style={styles.container}>
            <Text style={styles.title}>Sinh nhật của bạn là khi nào?</Text>
            <View style={styles.date}>
                <DatePicker
                    date={date}
                    onDateChange={setDate}
                    mode="date"
                    androidVariant="nativeAndroid"
                    maximumDate={maxDate}
                    minimumDate={minDate}
                />
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onSubmit}>
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
    date: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
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