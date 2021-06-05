import queryString from 'query-string';
import axiosClient from './axiosClient';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';


const authApi = {
  signUp: (params) => {
    // const url = `/signup?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // phonenumber o
    // password o
    // uuid o
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       code: '1000',
    //     });
    //   }, 1000);
    // });
    
  },
  login: (params) => {
    // const url = `/login?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // phonenumber o
    // password o
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       code: '1000',
    //       data: {
    //         id: '1',
    //         username: 'Tường Vy', // null
    //         token: 'token',
    //         avatar: 'https://picsum.photos/id/1027/2848/4272', // null
    //       },
    //     });
    //   }, 1000);
    // });
  },
  getVerifyCode: (params) => {
    
    // const url = `/get_verify_code?${queryString.stringify(params)}`;
    // return axiosClient.get(url);
    // phonenumber o
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       code: '1000',
    //       data: {
    //         code: 'code',
    //       },
    //     });
    //   }, 1000);
    // });
    // 120s 1010, 1009
    // sdt actived 1010
    // sdt chua dk 1004 9995

  
  },
  checkVerifyCode: (params) => {
    // const url = `/check_verify_code?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // phonenumber o
    // code_verify o
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (params.code_verify === 'truthy') {
    //       resolve({
    //         code: '1000',
    //         data: {
    //           id: '1',
    //           token: 'token',
    //         },
    //       });
    //     } else {
    //       resolve({
    //         code: '1004',
    //       });
    //     }
    //   }, 1000);
    // });
  },
  changeInfoAfterSignUp: (params) => {
    // const url = `/change_info_after_signup?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // token o
    // username o
    // avatar x file
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       code: '1000',
    //       data: {
    //         id: '1',
    //         username: 'Tường Vy',
    //         phonenumber: '0868123456', // x
    //         created: '1605275104',
    //         avatar: 'https://picsum.photos/id/1027/2848/4272', //
    //         is_blocked: '', // No
    //         online: '', // No
    //       },
    //     });
    //   }, 1000);
    // });
  },
  logout: (params) => {
    // const url = `/logout?${queryString.stringify(params)}`;
    // return axiosClient.post(url);
    // token o
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       code: '1000',
    //     });
    //   }, 1000);
    // });
  },
};

export default authApi;
