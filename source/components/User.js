import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, Alert, FlatList, Dimensions, Modal
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {addFriendFromSearchScreen} from '../slices/messSlice';

const { width } = Dimensions.get('window');


export default function User({item}){

    const dispatch = useDispatch();
    const emailMain = useSelector((state) => state.auth.emailMain);
    const onAddFriend = () => {
        dispatch(addFriendFromSearchScreen({
            myEmail: emailMain,
            emailFriend: item.email,
            nameFriend: item.name,
            avatarFriend: item.avatar
        }));
        Alert.alert(
            "Thêm thành công",
            "Đã thêm vào danh sách bạn bè",
            [
                {
                    text: 'Close'
                }
            ],
            { cancelable: true }
        )
    }

    const onDeleteFriend = () => {

    }

    const onClickChat = () => {

    }

    const onClick = () => {
        Alert.alert(
            item.name,
            "Bạn muốn kết nối với " + item.name + "?",
            [
                {
                    text: "Đóng",
                    onPress: () => console.log("quit")
                },
                {
                    text: "Gửi tin nhắn",
                    onPress: () => {onClickChat}
                },
                !item.isMySelf && {
                    text: item.isMyFriend ? "Xóa bạn" : "Thêm bạn",
                    onPress: () => {
                        if(!item.isMyFriend){
                            onAddFriend();
                        }
                        else{
                            onDeleteFriend();
                        }
                    }
                }
            ],
            { cancelable: true }
        )
    }


    return(

        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri: item.avatar}} style={styles.img} />
                <View style={styles.child}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                </View>
            </View>    
            <TouchableOpacity style={styles.buttonContainer} onPress={onClick} >
                <FontAwesome5Icon name={'ellipsis-v'} size={24} solid />
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        flexDirection : 'row',
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        paddingVertical: 20,
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        height: 70,
        width: 70,
        borderRadius: 70,
        
    },
    child: {
        paddingLeft: 15
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16
    },
    email: {
        fontSize: 12,
        color: '#9E9E9E'
    },
    buttonContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    
});