import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
    ActivityIndicator,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    RefreshControl
  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { cos } from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {getListFriend} from '../slices/messSlice';
import Friend from '../components/Friend';

const HeadComponent = () => {
    return(
        <View style={styles.headContainer}>
            <Text style={styles.headTitle}>Danh sách bạn bè của bạn</Text>
        </View>
    );
}

export default function FriendScreen(){

    const dispatch = useDispatch();
    const emailMain = useSelector((state) => state.auth.emailMain);
    const listFriend = useSelector(state => state.mess.listFriend);

    const renderItem = ({ item }) => {
        return(
          <Friend item={item} />
        );
    };

    const [isRefresh, setIsRefresh] = useState(false);
    const onRefresh = () => {
        setIsRefresh(true);
        setTimeout(() => {
            setIsRefresh(false);
        }, 1500);
    };

    useEffect(() => {
        dispatch(getListFriend({
            myEmail: emailMain
        }));
    });
    
    if(listFriend !== null ){
        if(listFriend.length === 0){
            return(
                <View style={styles.container}>
                    <HeadComponent />
                    <Text style={styles.headTitle}>Hiện bạn không có bạn bè.</Text>
                </View>
            );
        }
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={listFriend}
                renderItem={renderItem}
                keyExtractor={item => item.emailFriend}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={() => onRefresh()}
                    />
                }
                ListHeaderComponent={HeadComponent}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#9E9E9E'
    },
    headTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1
    }
});