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
    TextInput,
    ActivityIndicator
  } from 'react-native';
import {useState, useRef} from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Conversation from '../components/Conversation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import User from '../components/User';
import {getListUser} from '../slices/messSlice';

function SearchPane(){

    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const emailMain = useSelector((state) => state.auth.emailMain);

    const onSearch = () => {
        dispatch(getListUser({
            name: value,
            emailMain: emailMain 
        }));
    }

    return(
        <View style={styles.searchPane}>
            <FontAwesome5 name={'search'} color={'#9E9E9E'} size={18} solid />
            <TextInput 
                // ref={txtInput}
                style={styles.textInput} 
                placeholder="Nhập tên của người mà bạn cần tìm"
                value={value}
                onChangeText={text => setValue(text)}
                autoFocus={true}
            />
            <TouchableOpacity style={styles.button} onPress={onSearch} activeOpacity={0.8}>
                <Text style={styles.textButton}>Tìm</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function SearchScreen(){

    const listUser = useSelector(state => state.mess.listUser);

    const renderItem = ({ item }) => {
        return(
          <User item={item} />
        );
    };

    const [isRefresh, setIsRefresh] = useState(false);
    const dispatch = useDispatch();
    const onRefresh = () => {
        setIsRefresh(true);
        setTimeout(() => {
            setIsRefresh(false);
        }, 1500);
    };



    if(listUser === 'false'){
        return(
            <View style={styles.container}>
                <SearchPane />
                <View style={styles.notice}>
                    <Text style={{fontSize: 28}}>Không có kết quả </Text>
                </View>
            </View>
        );
    }
    
    return(
        
        <View style={styles.container}>
            
            <FlatList
                data={listUser}
                renderItem={renderItem}
                keyExtractor={item => item.email}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={() => onRefresh()}
                    />
                }
                ListHeaderComponent={SearchPane}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingTop: 15,
    },
    searchPane: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 5,
        borderRadius: 20,
    },
    textInput: {
        paddingHorizontal: 20,
    },
    icon: {
        paddingRight: 15,
    },
    button: {
        borderRadius: 5,
        paddingVertical: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 16,
        color: '#2979FF'
    },
    notice: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },  
});