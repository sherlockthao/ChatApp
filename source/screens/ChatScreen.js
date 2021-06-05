import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator
  } from 'react-native';
import {useState} from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Conversation from '../components/Conversation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {getListConversation} from '../slices/messSlice';
import { useEffect } from 'react/cjs/react.development';

const SearchPaneComponent = () => {

    const navigation = useNavigation();
    const onSearch = () => {
        navigation.navigate('SearchScreen');
    }

    return(
        <TouchableOpacity style={styles.searchPane} activeOpacity={0.8} onPress={onSearch}>
            <FontAwesome5 name={'search'} size={18} color={'#9E9E9E'} solid />
            <Text style={styles.text}>Tìm kiếm</Text>
        </TouchableOpacity>
    );
}

export default function ChatScreen(){

    const username = useSelector(state => state.auth.usernameMain);
    const password = useSelector(state => state.auth.passwordMain);
    const email = useSelector(state => state.auth.emailMain);
    const avatar = useSelector(state => state.auth.avatarMain);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListConversation({
            myEmail: email
        }))
    })

    const listConversation = useSelector(state => state.mess.listConversation);


    const renderItem = ({ item }) => {
        return(
          <Conversation item={item} />
        );
    };

    const [isRefresh, setIsRefresh] = useState(false);

    const onRefresh = () => {
        setIsRefresh(true);
        setTimeout(() => setIsRefresh(false), 3000);
    };


    if(listConversation === null){
        return (
            <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }

    if(listConversation.length === 0){
        return(
            <View style={styles.container}>
                <SearchPaneComponent />
                <View style={styles.noticeContainer}>
                    <Text style={styles.txtNotice}>Hiện bạn chưa có cuộc trò chuyện nào.</Text>
                    <Text style={styles.txtNotice}>Hãy bắt đầu bằng cách thêm bạn bè vào danh bạ của bạn.</Text>
                </View>
            </View>
        );
    }

    return(

        <View style={styles.container}>
            <FlatList
                data={listConversation}
                renderItem={renderItem}
                keyExtractor={item => item.emailFriend}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={() => onRefresh()}
                    />
                }
                ListHeaderComponent={SearchPaneComponent}
                ListHeaderComponentStyle={{paddingHorizontal: 7, paddingTop: 15,}}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 15,
    },
    searchPane: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center'
    },
    text: {
        paddingLeft: 15,
        color: '#757575',
        fontSize: 16,
    },
    noticeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtNotice: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 5,
    }
});