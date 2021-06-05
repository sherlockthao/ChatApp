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

export default function CreateAccountScreen(){

    const navigation = useNavigation();

    const onPressNext = () => {
        navigation.navigate('CreateNameScreen');
    }

    return(
        <View style={styles.container}>
            <Image source={require('../../assets/images/joinFacebook.jpg')} style={styles.img} />
            <Text style={styles.textFirst}>Tham gia Messenger</Text>
            <Text style={styles.textSecond}>
                Chúng tôi sẽ giúp bạn tạo tài khoản mới sau vài bước dễ dàng
            </Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPressNext}>
                <Text style={styles.lastText}>Tiếp</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 35
    },
    img: {
        alignSelf: 'center',
        height: 200,
        width: 280,
    },
    textFirst: {
        alignSelf: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 22
    },
    textSecond: {
        alignSelf: 'center',
        marginTop: 20,
        color: '#616161',
        fontSize: 15,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2979FF',
        marginTop: 40,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 10,
    },  
    lastText: {
        color: '#FFFFFF',
    }
});