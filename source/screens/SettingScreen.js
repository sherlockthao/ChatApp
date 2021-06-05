import React, {useLayoutEffect} from 'react';
import {
    ActivityIndicator,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Switch
  } from 'react-native';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {logoutRequest} from '../slices/authSlice';

export default function SettingScreen(){

    const avatarMain = useSelector((state) => state.auth.avatarMain);
    const usernameMain = useSelector((state) => state.auth.usernameMain);
    const tokenMain = useSelector((state) => state.auth.tokenMain);
    // const emailMain = useSelector((state) => state.auth.emailMain);
    // console.log("setting"+emailMain);
    const loadingLogoutRequest = useSelector(
        (state) => state.auth.loadingLogoutRequest,
    );
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(
        logoutRequest({
            token: tokenMain,
        }),
        );
    };

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [isEnabledSecond, setIsEnabledSecond] = useState(false);
    const toggleSwitchSecond = () => setIsEnabledSecond(previousState => !previousState);

    return(
        <ScrollView style={styles.container}>
            <View style={styles.firstChild}>
                <Image source={{uri: avatarMain}}  style={styles.img} />
                <Text style={styles.name}>{usernameMain}</Text>
            </View>
            <View style={styles.otherChild}> 
                <TouchableOpacity style={styles.select} onPress={toggleSwitch} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#000000'}]}>
                            <FontAwesome5 name={'moon'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Chế độ tối</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#00B8D4'}]}>
                            <FontAwesome5 name={'comment-dots'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Chế độ tối</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.otherChild}>
                <Text style={styles.titleChild}>Trang cá nhân</Text>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#00C853'}]}>
                            <FontAwesome5 name={'globe-asia'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <View>
                            <Text style={styles.nameSelect}>Trạng thái hoạt động</Text>
                            <Text style={styles.noticeSelect}>Bật</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#E53935'}]}>
                            <FontAwesome5 name={'at'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <View>
                            <Text style={styles.nameSelect}>Tên người dùng</Text>
                            <Text style={styles.noticeSelect}>{usernameMain}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.otherChild}>
                <Text style={styles.titleChild}>Tùy chọn</Text>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#00B8D4'}]}>
                            <FontAwesome5 name={'shield-virus'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Quyền riêng tư</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#E040FB'}]}>
                            <FontAwesome5 name={'bell'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Thông báo & âm thanh</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#311B92'}]}>
                            <FontAwesome5 name={'database'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Trình tiết kiệm dữ liệu</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#2979FF'}]}>
                            <FontAwesome5 name={'newspaper'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Tin</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#E040FB'}]}>
                            <FontAwesome5 name={'sms'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>SMS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#00B8D4'}]}>
                            <FontAwesome5 name={'user-friends'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Danh bạ điện thoại</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#E040FB'}]}>
                            <FontAwesome5 name={'image'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Ảnh & Phương tiện</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8} onPress={toggleSwitchSecond}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#00C853'}]}>
                            <FontAwesome5 name={'circle'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Bong bóng chat</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabledSecond ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchSecond}
                        value={isEnabledSecond}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#311B92'}]}>
                            <FontAwesome5 name={'download'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Cập nhật ứng dụng</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.otherChild}>
                <Text style={styles.titleChild}>Tài khoản</Text>
                <TouchableOpacity style={styles.select} activeOpacity={0.8} onPress={onLogout}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#E040F8'}]}>
                            <FontAwesome5 name={'sign-out-alt'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Đăng xuất</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#2979FF'}]}>
                            <FontAwesome5 name={'cog'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Cài đặt tài khoản</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#EF5350'}]}>
                            <FontAwesome5 name={'exclamation-triangle'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Báo cáo vấn đề kỹ thuật</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#00B8D4'}]}>
                            <FontAwesome5 name={'question-circle'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Trợ giúp</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                    <View style={styles.leftSelect}>
                        <View style={[styles.iconContainer, {backgroundColor: '#757575'}]}>
                            <FontAwesome5 name={'sticky-note'} solid color={'#FFFFFF'} size={24} />
                        </View>
                        <Text style={styles.nameSelect}>Pháp lý & chính sách</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    firstChild: {
        alignItems: 'center',
        paddingTop: 55,
        paddingBottom: 20

    },
    img: {
        width: 90,
        height: 90,
        borderRadius: 90
    },
    name: {
        paddingTop: 15,
        fontWeight: 'bold',
        fontSize: 24
    },
    otherChild: {
        paddingHorizontal: 20
    },
    select: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameSelect: {
        paddingLeft: 15,
    },
    noticeSelect: {
        paddingLeft: 15,
        fontSize: 12,
        color: '#9E9E9E'
    },
    leftSelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleChild: {
        fontSize: 14,
        color: '#9E9E9E',
        paddingBottom: 5,
        paddingTop: 10,
    }
})