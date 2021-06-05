import AsyncStorage from '@react-native-community/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import authApi from '../apis/authApi';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { ActionSheetIOS } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { TabElementDisplayOptions } from 'react-native-animated-nav-tab-bar';
import { useNavigationBuilder } from '@react-navigation/native';


export const getListUser = createAsyncThunk(
    'mess/getListUser',
    async (params) => {
        try{
            let data = [];
            const tmp = params.name.trim().toLowerCase();

            await firestore()
            .collection('listUser')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach( (documentSnapshot) => {
                    const name = documentSnapshot.data().name;
                    const email = documentSnapshot.data().email;
                    const avatar = documentSnapshot.data().avatar;
                    const temp = documentSnapshot.data().name;
                    const index = temp.toLowerCase().search(tmp);
                    let isMySelf = false;
                    let isMyFriend = false;
                    if(index !== -1){
                        if(documentSnapshot.data().email === params.emailMain){
                            isMySelf = true;
                            isMyFriend = false;
                        }
                        else{
                            firestore().collection('listFriend')
                                .doc(params.emailMain.replace('.com', ''))
                                .onSnapshot(document => {
                                    if(document.data() === undefined){
                                        isMyFriend = false;
                                    }
                                    else{
                                        if(document.data()[email] === undefined ){
                                            isMyFriend = false;
                                        }
                                        else isMyFriend = true;
                                    }
                                    
                                })
                        }
                        // if(isMyFriend !== '1'){
                            data = [
                                ...data,
                                {
                                    name: name,
                                    email: email,
                                    avatar: avatar,
                                    isMySelf: isMySelf,
                                    isMyFriend: isMyFriend
                                }
                            ];
                        // }
                        
                    }
                });
            });
            if(data.length === 0){
                return new Promise((resolve, reject) => {
                    resolve({
                      code: 'false',
                    });
                })
            }
            return new Promise((resolve, reject) => {
                resolve({
                  data: data,
                  code: 'OK',
                });
            })

        }catch (error){
            return new Promise((resolve, reject) => {
                resolve({
                  code: 'false',
                });
            })
        }
    }
);

export const addFriendFromSearchScreen = createAsyncThunk(
    'mess/addFriendFromSearchScreen',
    async(params) => {
        try{
            const email = params.emailFriend;
            const name  = params.nameFriend;
            const avatar = params.avatarFriend;
            let count = 0;
            firestore().collection('listFriend')
            .doc(params.myEmail.replace('.com',''))
            .onSnapshot(documentSnapshot => {
                if(documentSnapshot.data() === undefined){
                    if(count !== 1){
                        
                        count += 1;
                        firestore().collection('listFriend')
                            .doc(params.myEmail.replace('.com',''))
                            .set({
                                    [email.replace('.com','')]: 
                                        {
                                            email: email, 
                                            name: name, 
                                            avatar: avatar
                                        }
                            });
                    }
                }
                else{
                    if(count !== 1){
                        count += 1;
                        firestore().collection('listFriend')
                        .doc(params.myEmail.replace('.com',''))
                        .update({
                                [email.replace('.com','')]: 
                                    {
                                        email: email, 
                                        name: name, 
                                        avatar: avatar
                                    }
                            });
                    }
                }
            });
            return new Promise((resolve, reject) => {
                resolve({
                    code: 'OK',
                })
            })
            
        }
        catch(error){
            return new Promise((resolve, reject) => {
                resolve({
                    code: 'FALSE',
                })
            })
        }
    }
);

export const getListFriend = createAsyncThunk(
    'mess/getListFriend',
    async(params) => {
        try{
            let data = [];
            await firestore().collection('listFriend')
                .get()
                .then(querrySnapshot => {
                    querrySnapshot.forEach(documentSnapshot => {
                        if(documentSnapshot.id === params.myEmail.replace('.com','')){
                            for(const [key, value] of Object.entries(documentSnapshot.data())){
                                data = [
                                    ...data,
                                    {
                                        emailFriend: value.email,
                                        nameFriend: value.name,
                                        avatarFriend: value.avatar
                                    }
                                ]
                            }
                        }
                    })
                });
            return new Promise((resolve, reject) => {
                resolve({
                    code: 'OK',
                    data: data,
                });
            })
                
        }
        catch(error){
            console.log("error " + error );
            return new Promise((resolve, reject) => {
                resolve({
                    code: 'FALSE',
                })
            })
        }
    }
);

export const getListConversation = createAsyncThunk(
    'mess/getListConversation',
    async(params) => {
        try{
            let data = [];
            await firestore().collection('listConversation')
                .get()
                .then(querrySnapshot => {
                    querrySnapshot.forEach(documentSnapshot => {
                        if(documentSnapshot.id === params.myEmail.replace('.com','')){
                            for(const [key, value] of Object.entries(documentSnapshot.data())){
                                data = [
                                    ...data,
                                    {
                                        avatarFriend: value.avatarFriend,
                                        nameFriend: value.nameFriend,
                                        emailFriend: value.emailFriend,
                                        lastMess: value.lastMess,
                                        isSeen: value.isSeen
                                    }
                                ]
                            }
                        }
                        
                    })
                })
            return new Promise((resolve, reject) => {
                resolve({
                    code: 'OK',
                    data: data,
                });
            })
                
        }
        catch(error){
            
        }
    }
);

export const getListMess = createAsyncThunk(
    'mess/getListMess',
    async (params) => {
        try {
            const emailMain = params.emailMain;
            const emailFriend = params.emailFriend;
            let count = 0;
            let isEmpty = false;
            let data = [];
            await firestore().collection('listMess')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        if(documentSnapshot.id === emailMain.replace('.com','')){
                            if(documentSnapshot.data()[emailFriend.replace('.com','')] !== undefined){
                                count = count + 1;
                                for(const [key, value] of Object.entries(documentSnapshot.data()[emailFriend.replace('.com','')])){
                                    data = [
                                        ...data,
                                        {
                                            emailSend: value.emailSend,
                                            timeSend: value.timeSend,
                                            contentMess: value.contentMess,
                                            emailReceive: value.emailReceive
                                        }
                                    ]
                                }
                            }
                        }
                    })
                })
            data.sort(function( a, b){
                return b.timeSend - a.timeSend;
            })
            if(count !== 1){
                return new Promise((resolve, reject) => {
                    resolve({
                        code: 'FALSE'
                    })
                })
            }
            else{
                return new Promise((resolve, reject) => {
                    resolve({
                        code: 'OK',
                        data: data,
                    })
                })
            }

        } catch (error) {
            
        }
    }
); 

export const updateListMess = createAsyncThunk(
    'mess/updateListMess',
    async(params) => {
        try {
            let count = 0;
            
            const emailSend = params.emailSend;
            const emailReceive = params.emailReceive;
            const timeCreate = params.timeCreate;
            const mess = params.mess;
            let data = new Object();
            await firestore().collection('listMess')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        if(documentSnapshot.id === emailSend.replace('.com','')){
                            count = 1;
                            if(documentSnapshot.data()[emailReceive.replace('.com','')] !== undefined){
                                for(const [key, value] of Object.entries(documentSnapshot.data()[emailReceive.replace('.com','')])){
                                    data[value.timeSend] = {
                                        emailSend: value.emailSend,
                                        timeSend: value.timeSend,
                                        contentMess: value.contentMess,
                                        emailReceive: value.emailReceive
                                    }                                    
                                }
                            }
                        }
                    })
                })
            data[timeCreate] = {
                emailSend: emailSend,
                timeSend: timeCreate,
                contentMess: mess,
                emailReceive: emailReceive
            }
            
            if(count === 1){
                firestore().collection('listMess')
                    .doc(emailSend.replace('.com',''))
                    .update({
                        [emailReceive.replace('.com','')]: data,
                    });
                firestore().collection('listMess')
                    .doc(emailReceive.replace('.com',''))
                    .update({
                        [emailSend.replace('.com','')]: data,
                    });
                   
            }
            else{
                firestore().collection('listMess')
                    .doc(emailSend.replace('.com',''))
                    .set({
                        [emailReceive.replace('.com','')]: data,
                    });
                firestore().collection('listMess')
                    .doc(emailReceive.replace('.com',''))
                    .set({
                        [emailSend.replace('.com','')]: data,
                    });

            }
            return new Promise((resolve, reject) => {
                resolve({
                    code: 'OK'
                })
            })
        } catch (error) {
            
        }
    }
);

export const updateListConversation = createAsyncThunk(
    'mess/updateListConversation',
    async(params) => {
        try {
            let haveConversation = 0;
            const emailSend = params.emailSend;
            const emailReceive = params.emailReceive;
            // kiem tra xem da co conversation chua
            await firestore().collection('listConversation')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        if(documentSnapshot.id === emailSend.replace('.com','')){
                            haveConversation = 1;
                        }
                    })
                });
            //update listConversation

            if(haveConversation === 1){
                firestore().collection('listConversation')
                    .doc(emailSend.replace('.com',''))
                    .update({
                        [emailReceive.replace('.com','')]: {
                            nameFriend: params.nameReceive,
                            emailFriend: params.emailReceive,
                            avatarFriend: params.avatarFriend,
                            lastMess: params.mess,
                            isSeen: '1'
                        }
                    });
                
                firestore().collection('listConversation')
                .doc(emailReceive.replace('.com',''))
                .update({
                    [emailSend.replace('.com','')]: {
                        nameFriend: params.nameSend,
                        emailFriend: params.emailSend,
                        avatarFriend: params.avatarMain,
                        lastMess: params.mess,
                        isSeen: '1'
                    }
                }); 
            }
            else if(haveConversation === 0){
                firestore().collection('listConversation')
                    .doc(emailSend.replace('.com',''))
                    .set({
                        [emailReceive.replace('.com','')]: {
                            nameFriend: params.nameReceive,
                            emailFriend: params.emailReceive,
                            avatarFriend: params.avatarFriend,
                            lastMess: params.mess,
                            isSeen: '1'
                        }
                    });
                
                firestore().collection('listConversation')
                .doc(emailReceive.replace('.com',''))
                .set({
                    [emailSend.replace('.com','')]: {
                        nameFriend: params.nameSend,
                        emailFriend: params.emailSend,
                        avatarFriend: params.avatarMain,
                        lastMess: params.mess,
                        isSeen: '1'
                    }
                }); 
            }
            return new Promise((resolve, reject) => {
                resolve({
                    code: 'OK'
                })
            })
        } catch (error) {
            
        }
    }
)

const mess = createSlice({
    name: 'mess',
    initialState: {
        listUser: null,
        listFriend: null,
        listConversation: null,
        listMess: null,
    },
    extraReducers: {
        [getListUser.pending]: () => {},
        [getListUser.rejected]: () => {},
        [getListUser.fulfilled]: (state, action) => {
            if(action.payload.code === 'OK'){
                state.listUser = action.payload.data;
            }
            else{
                state.listUser = 'false';
            }
        },

        [addFriendFromSearchScreen.pending]: () => {},
        [addFriendFromSearchScreen.rejected]: () => {},
        [addFriendFromSearchScreen.fulfilled]: (state, action) => {
        },

        [getListFriend.pending]: () => {},
        [getListFriend.rejected]: () => {},
        [getListFriend.fulfilled]: (state, action) => {
            if(action.payload.code === 'OK'){
                state.listFriend = action.payload.data;
            }
        },

        [getListConversation.pending]: () => {},
        [getListConversation.rejected]: () => {},
        [getListConversation.fulfilled]: (state, action) => {
            if(action.payload.code === 'OK'){
                state.listConversation = action.payload.data;
            }
        },

        [getListMess.pending]: () => {},
        [getListMess.rejected]: () => {},
        [getListMess.fulfilled]: (state, action) => {
            if(action.payload.code === 'OK'){
                state.listMess = action.payload.data;
            }
            else if(action.payload.code === 'FALSE'){
                state.listMess = [];
            }
        },

        [updateListMess.pending]: () => {},
        [updateListMess.rejected]: () => {},
        [updateListMess.fulfilled]: (state, action) => {
        },

        [updateListConversation.pending]: () => {},
        [updateListConversation.rejected]: () => {},
        [updateListConversation.fulfilled]: (state, action) => {},
    }
});


const {reducer, actions} = mess;

export default reducer;
