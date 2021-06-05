import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, Alert, FlatList, Dimensions
  } from 'react-native';

import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {useState} from 'react'
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');


export default function Conversation({item}){

    const [data, setData] = useState(item);

    const [ShowComment, setShowModelComment] = useState(false);
    const [animateModal, setanimateModal] = useState(false);

    const navigation = useNavigation();
    const onClick = () => {
        navigation.navigate('ChatRoom', {
            emailFriend: item.emailFriend,
            nameFriend: item.nameFriend,
            avatarFriend: item.avatarFriend
        });
    }

    return(
        <View>
            <TouchableOpacity onPress={onClick} activeOpacity={0.8}>
                <View style={styles.container}>
                    <View style={styles.bigAvatar}>
                        <Image 
                            source={{uri: item.avatarFriend}}
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.nameFriend}</Text>
                        <Text numberOfLines={1} style={{fontSize: 15, color: '#000000', fontWeight: item.isSeen === '0' ? 'bold' : 'normal', paddingRight: 30}}>{item.lastMess}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingVertical: 5,
        marginTop: 10,
        // marginRight: 10,
    },
    bigAvatar: {
        flex: 2
    },
    avatar:{
        width: width*15/100,
        height: width*15/100,
        borderRadius: width*10/100,
    },
    info: {
        flex: 8,
        flexDirection: 'column',
        paddingRight: 10,
        justifyContent: 'center'
    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 17,
        paddingBottom: 3
    },
    bigSeen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,        
    },
    avatarSeen: {
        width: width/20,
        height: width/20,
        borderRadius: width/20,
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    Modal: {
        backgroundColor: '#fff',
        marginTop: width*2/3,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    containerContent: {

    },
    topContent: {
        alignItems: 'center',
        paddingTop: 5,
    },
    midContent: {
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        alignItems: 'center',
        paddingVertical: 11,
    },
    textButton: {
        fontSize: 16,
        marginLeft: 20,
    }
});