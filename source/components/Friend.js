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

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const emailMain = useSelector((state) => state.auth.emailMain);

    const onClick = () => {
        navigation.navigate('ChatRoom', {
            emailFriend: item.emailFriend,
            nameFriend: item.nameFriend,
            avatarFriend: item.avatarFriend
        });
    }


    return(
        <TouchableOpacity style={styles.container} onPress={onClick} activeOpacity={0.6}>
            <View style={styles.leftContainer}>
                <Image source={{uri: item.avatarFriend}} style={styles.img} />
                <View style={styles.child}>
                    <Text style={styles.name}>{item.nameFriend}</Text>
                </View>
            </View>    
        </TouchableOpacity>
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
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
        paddingLeft: 25,
        paddingVertical: 10,
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    child: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },

    
});