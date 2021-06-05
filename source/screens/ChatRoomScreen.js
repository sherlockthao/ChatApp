import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, TextInput, Animated, Easing, Image, FlatList, Dimensions, Alert } from 'react-native';
import {useRef , useState, useEffect} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getListMess} from '../slices/messSlice';
import {updateListMess, updateListConversation} from '../slices/messSlice';
import { toArray } from "react-emoji-render";

const { width } = Dimensions.get('window');
    

export default function ChatRoomScreen({route}){
    // chuyen doi sang bieu tuong cam xuc
    const parseEmojis = (value) => {
        const emojisArray = toArray(value);
       
        // toArray outputs React elements for emojis and strings for other
        const newValue = emojisArray.reduce((previous, current) => {
          if (typeof current === "string") {
            return previous + current;
          }
          return previous + current.props.children;
        }, "");
       
        return newValue;
    };
    const [checkGetListMess, setCheckGetListMess] = useState(false);
    const emailMain = useSelector(state => state.auth.emailMain);
    const {emailFriend, nameFriend, avatarFriend} = route.params;
    const nameMain = useSelector( state => state.auth.usernameMain);
    const avatarMain = useSelector(state => state.auth.avatarMain);
    const Item = ({ item, avatar }) => {

        const [colorMess, setColorMess] = useState('#0091EA');
        const [colorText, setColorText] = useState('#FFFFFF');

        if(item.emailSend !== emailMain){
        return (
            <View style={{flexDirection: 'row',  marginVertical: 5, flex: 1, justifyContent: 'flex-start', paddingLeft: 5,}}>
                <Image source={{uri: avatar }} style={{width: width/12, height: width/12, borderRadius: width/12, alignSelf: 'flex-end'}} />
                <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 15, marginLeft: 5, borderWidth: 0, borderRadius: 25, backgroundColor: '#EEEEEE'}} >
                    <Text style={{fontSize: 18, color: '#000000'}}>{item.contentMess}</Text>
                </TouchableOpacity>
            </View>
        );
        }
        //can dieu chinh lai
        else return(
        <View style={{flexDirection: 'row', marginVertical: 5,flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity activeOpacity={0.7} style={{paddingVertical: 5, paddingHorizontal: 15, marginRight: 15, borderWidth: 0, borderRadius: 25, backgroundColor: colorMess, }}>
                <Text style={{fontSize: 18, color: colorText}}>{item.contentMess}</Text>
            </TouchableOpacity>
        </View>
        );
    }

    const dispatch = useDispatch();  
    const navigation = useNavigation();
    const listMess=  useSelector(state => state.mess.listMess);
    const flatList = useRef(null);
    useEffect(()=>{
        navigation.setOptions({
            headerTitle: () => (
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent:'space-between'}}>    
                    <View style={{flexDirection: 'row', flex: 2, alignItems: 'center'}}>
                        <Image source={{uri: avatarFriend}} style={{width: width/11, height: width/11, borderRadius: width/11}} />
                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{nameFriend}</Text>
                            <Text>Online</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                        <TouchableOpacity>
                            <FontAwesome5 name={'phone-alt'} color={'#0091EA'} solid size={27}/>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            {/* <Ionicons name={'videocam'} size={27} color={'#0091EA'}  /> */}
                            <FontAwesome5 name={'video'} color={'#0091EA'} solid size={27}/>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            {/* <Ionicons name={'information-circle'} size={27} color={'#0091EA'} /> */}
                            <FontAwesome5 name={'info-circle'} color={'#0091EA'} solid size={27}/>
                        </TouchableOpacity>
                    </View>
                </View>
            ),
            headerTintColor: '#0091EA'
        });
        // flatList.current.scrollToEnd({animated: true});
        
        if(listMess !== null){
            setCheckGetListMess(true);
        }
        
        console.log("1");
    },[]);

    useEffect(() => {
        dispatch(getListMess({
            emailMain: emailMain,
            emailFriend: emailFriend
        }));
    })

    const renderItem = ({ item }) => {    
        return (
          <Item
            item={item}
            avatar={avatarFriend}
          />
        );
    };
    const [count, setCount] = useState(0);
    const [flexButton, setFlexButton] = useState(0.8);
    const [heightText, setHeightText] = useState(0);
    const [isHide, setIsHide] = useState(false);
    const [text, setText] = useState('');
    const onFocus = () => {
        if(count === 0){
            setCount(1);
            setFlexButton(0.15);
            setIsHide(true);
        }
    }
    const onBlur = () => {
        setCount(0);
        setFlexButton(0.8);
        setIsHide(false);
    } 

    const onExpand = () => {
        setIsHide(false);
        setFlexButton(0.8);
        inputComponent.current.blur();
    }
    const inputComponent = useRef(null);
    const onSend = () => {
        const timeCreate = Date.now();
        if(isHide && text !== ''){
            dispatch(updateListMess({
                mess: text,
                emailSend: emailMain,
                emailReceive: emailFriend,
                timeCreate: timeCreate,
                avatarFriend: avatarFriend,
                nameReceive: nameFriend,
                nameSend: nameMain,
                avatarMain: avatarMain
            }));

            dispatch(updateListConversation({
                mess: text,
                emailSend: emailMain,
                emailReceive: emailFriend,
                timeCreate: timeCreate,
                avatarFriend: avatarFriend,
                nameReceive: nameFriend,
                nameSend: nameMain,
                avatarMain: avatarMain
            }));
            setText('');
        }
    }

    const Buttons = () => {
        if(!isHide){
            return(
                <Animated.View style={[styles.buttonContainer, {flex: flexButton}]}>
                    <TouchableOpacity>
                        <FontAwesome5 name={'th-large'} color={'#0091EA'} solid size={24}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome5 name={'camera'} color={'#0091EA'} solid size={24}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome5 name={'image'} color={'#0091EA'} solid size={24}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome5 name={'microphone'} color={'#0091EA'} solid size={24}/>
                    </TouchableOpacity>                                  
                </Animated.View>
            );
        }
        else return(
            <Animated.View style={[styles.buttonContainer, {flex: flexButton, paddingLeft: 10,}]}>
                <TouchableOpacity onPress={onExpand} style={{paddingHorizontal: 10, paddingVertical: 5, flex: 1}}>
                    <FontAwesome5 name={'chevron-right'} color={'#0091EA'} solid size={24}/>
                </TouchableOpacity>                             
            </Animated.View>

        );
    }


    if(listMess === null){
        return null;
    }
    if(listMess.length === 0){
        return(
            <View style={styles.container}>
                <Text style={{color : '#9E9E9E', fontSize: 18}}>Bắt đầu cuộc trò chuyện với {nameFriend}</Text>
                <View style={styles.inputBottom}>
                    <View style={styles.firstChild}>
                        <Buttons />
                        <View style={[styles.txtInput, {height: Math.min(105, heightText)}]}>
                            <TextInput style={{flex: 1, paddingHorizontal: 15, height: Math.min(105, heightText)}}
                                placeholder='Aa'
                                onFocus={onFocus}
                                numberOfLines={10}
                                multiline={true}
                                onBlur={onBlur}
                                ref = {inputComponent}
                                onContentSizeChange={(event) => setHeightText(event.nativeEvent.contentSize.height)}
                                onChangeText={(text) => {
                                    setText(parseEmojis(text))
                                }}
                                value={text}
                            />
                            <TouchableOpacity>
                                <FontAwesome5 name={'smile-beam'} color={'#0091EA'} solid size={27}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.likeButton} onPress={onSend}>
                        <FontAwesome5 name={isHide ? 'paper-plane' :'thumbs-up'} color={'#0091EA'} solid size={27}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    return(
        <View style={styles.container}>
            <FlatList
                ref={flatList}
                data={listMess}
                renderItem={renderItem}
                keyExtractor={(item) => item.timeSend.toString()}
                ListHeaderComponent={() => (
                  <View style={{height: 60}}></View>
                )}
                inverted={true}
                // onContentSizeChange={() => {
                //     if(flatList.current !== null){
                //         flatList.current.scrollToStart();
                //     }
                // }}
            />
            <View style={styles.inputBottom}>
                <View style={styles.firstChild}>
                    <Buttons />
                    <View style={[styles.txtInput, {height: Math.min(105, heightText)} ]}>
                        <TextInput style={{flex: 1, paddingHorizontal: 15, height: Math.min(105, heightText) }}
                            placeholder='Aa'
                            onFocus={onFocus}
                            numberOfLines={10}
                            multiline={true}
                            onBlur={onBlur}
                            ref = {inputComponent}
                            onContentSizeChange={(event) => setHeightText(event.nativeEvent.contentSize.height)}
                            onChangeText={(text) => setText(parseEmojis(text))}
                            value={text}
                        />
                        <TouchableOpacity>
                            <FontAwesome5 name={'smile-beam'} color={'#0091EA'} solid size={27}/>
                        </TouchableOpacity>
                    </View>
                </View> 
                <TouchableOpacity style={styles.likeButton} onPress={onSend}>
                    <FontAwesome5 name={isHide ? 'paper-plane' :'thumbs-up'} color={'#0091EA'} solid size={27}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // justifyContent: 'center', 
        // alignItems: 'center', 
        backgroundColor: '#FFFFFF'
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    inputBottom:{
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1, 
        position: 'absolute', 
        zIndex: 2, 
        bottom: 0, 
        paddingTop: 5, 
        paddingRight: 5,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0.3
    },
    firstChild: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingTop: 5,
        paddingRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row' , 
        justifyContent: 'space-around',
        // flex: 0.8
    },
    txtInput: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flex: 0.9, 
        borderWidth: 0, 
        backgroundColor: '#EEEEEE', 
        height: 40, borderRadius: 40, 
        paddingHorizontal: 5, 
        marginBottom: 5,
    },
    likeButton: {
        // flex: 0.2, 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
    }
  });