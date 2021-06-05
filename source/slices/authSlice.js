import AsyncStorage from '@react-native-community/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import authApi from '../apis/authApi';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

// import * as responses from './../constants/responses';

export const bootstrapAsync = createAsyncThunk(
  'auth/bootstrapAsync',
  async () => {
    try {
      let token, data;
      token = await AsyncStorage.getItem('tokenPersist');
      const jsonData = await AsyncStorage.getItem('dataPersist');
      data = jsonData !== null ? JSON.parse(jsonData) : null;
      if (token) {
        return {
          key: 'TD',
          token,
          data,
        };
      } else {
        if (data) {
          return {
            key: 'nTD',
            data,
          };
        } else {
          return {
            key: 'nTnD',
          };
        }
      }
    } catch (error) {
      console.log('Error at bootstrapAsync:', error.message);
    }
  },
);

export const signUpRequest = createAsyncThunk(
  'auth/signUpRequest',
  async (params) => {
    try {
      // const response = await authApi.signUp(params);
      // console.log('signUpRequest response:', response);
      // return response;
      await firebase.auth().createUserWithEmailAndPassword(params.email,params.password);
      return new Promise((resolve, reject) => {
        resolve({
          code: 'OK',
        });
      });
    } catch (error) {
        return new Promise((resolve, reject) => {
          resolve({
            code: 'FALSED'
          });
        });
    }
  },
);

export const loginRequestFromSignInAlertScreen = createAsyncThunk(
  'auth/loginRequestFromSignInAlertScreen',
  async (params) => {
    try {
      const response = await authApi.login(params);
      console.log('loginRequestFromSignInAlertScreen response:', response);
      return response;
    } catch (error) {
      console.log('Error at loginRequestFromSignInAlertScreen:', error.message);
    }
  },
);

export const saveTokenDataFromSignInAlertScreen = createAsyncThunk(
  'auth/saveDataFromSignInAlertScreen',
  async (params) => {
    try {
      await AsyncStorage.setItem('tokenPersist', params.token);
      let data;
      // if (params.savePassword) {
      //   data = {
      //     id: params.token,
      //     username: params.username,
      //     email: params.email,
      //     password: params.password,
      //   };
      // } else {
      //   data = {
      //     id: params.id,
      //     username: params.username,
      //     email: params.email,
      //   };
      // }
      data = {
        id: params.token,
        username: params.username,
        email: params.email,
        password: params.password,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('dataPersist', jsonData);
      // if (params.savePassword) {
      //   return {
      //     key: true,
      //     data: {
      //       id: params.id,
      //       username: params.username,
      //       email: params.email,
      //       password: params.password,
      //     },
      //   };
      // } else {
      //   return {
      //     key: false,
      //     data: {
      //       id: params.id,
      //       username: params.username,
      //       email: params.email,
      //     },
      //   };
      // }
      return {
        key: true,
        data: {
          id: params.token,
          username: params.username,
          email: params.email,
          password: params.password,
        },
      };
    } catch (error) {
      console.log(
        'Error at saveTokenDataFromSignInAlertScreen:',
        error.message,
      );
    }
  },
);

export const getVerifyCodeRequest = createAsyncThunk(
  'auth/getVerifyCodeRequest',
  async (params) => {
    // try {
    //   const response = await authApi.getVerifyCode(params);
    //   console.log('getVerifyCodeRequest response:', response);
    // } catch (error) {
    //   console.log('Error at getVerifyCodeRequest:', error.message);
    // }
    try {
      await firebase.auth().currentUser.sendEmailVerification();
      return new Promise((resolve, reject) => {
        resolve({
          code: 'OK',
        });
      });
    } catch (error){
      console.log('Error at getVerifyCode:', error.message);
      return new Promise((resolve, reject) => {
        resolve({
          code: 'FAILSE',
        });
      });
    }
  },
);

export const checkVerifyCodeRequest = createAsyncThunk(
  'auth/checkVerifyCodeRequest',
  async (params) => {
    try {
      // const response = await authApi.checkVerifyCode(params);
      // if (response.code === responses.OK) {
      //   await AsyncStorage.setItem('tokenPersist', response.data.token);
      //   // const jsonData = await AsyncStorage.getItem('dataPersist');
      //   // const data = JSON.parse(jsonData);
      //   // const newData = {
      //   //   ...data,
      //   //   id: response.data.id,
      //   // };
      //   // const newJsonData = JSON.stringify(newData);
      //   // await AsyncStorage.setItem('dataPersist', newJsonData);
      // }
      // console.log('checkVerifyCodeRequest response:', response);
      // return response;
      await firebase.auth().currentUser.reload();
      if(firebase.auth().currentUser.emailVerified){
        return new Promise((resolve, reject) => {
          resolve({
            code: 'OK',
          });
        });
      }
    } catch (error) {
      return new Promise((resolve, reject) => {
        resolve({
          code: 'FAILSE',
        });
      });
    }
  },
);

// is_blocked online
export const changeInfoAfterSignUpRequest = createAsyncThunk(
  'auth/changeInfoAfterSignUpRequest',
  async (params) => {
    try {

      console.log("1");
      const jsonData = await AsyncStorage.getItem('dataPersist');
      console.log("2");
      const data = JSON.parse(jsonData);
      console.log("email " + params.emailMain);
      const emailAfterReplace = params.emailMain.replace('.com','');
      console.log("name: " + emailAfterReplace);
      var storageRef = firebase.storage().ref(`user/avatar/${emailAfterReplace}`);
      console.log("3");

      await storageRef.putFile(params.avatar);
      const avatar = await storageRef.getDownloadURL();
      console.log("url: " + avatar);

      const newData = {
        ...data,
        avatar: avatar,
      };
      const update = {
        displayName: params.nameMain,
        photoURL: avatar
      }
      const newJsonData = JSON.stringify(newData);
      console.log("4");
      await Promise.all([
        AsyncStorage.setItem('dataPersist', newJsonData), 
        firebase.auth().currentUser.updateProfile(update), 
        firestore().collection('listUser').doc(emailAfterReplace).set({
          name: params.nameMain,
          avatar: avatar,
          email: params.emailMain
        })
      ]);
      console.log("5");
      return new Promise((resolve, reject) => {
        resolve({
          nameMain: params.nameMain,
          passMain: params.passMain,
          emailMain: params.emailMain,
          avatar: avatar,
          code: 'OK',
        });
      })
    } catch (error) {
      // console.log('Error at changeInfoAfterSignUpRequest:', error.message);
      return new Promise((resolve, reject) => {
        resolve({
          code: 'FAILSE',
          nameMain: null,
          passMain: null,
          emailMain: null,
          avatar: null,
        });
      });
    }
  },
);

export const loginRequestFromSelectAccountScreen = createAsyncThunk(
  'auth/loginRequestFromSelectAccountScreen',
  async (params) => {
    try {
      // const response = await authApi.login(params);
      // if (response.code === responses.OK) {
      //   await AsyncStorage.setItem('tokenPersist', response.data.token);
      // }
      // console.log('loginRequestFromSelectAccountScreen response:', response);
      // return response;
      await firebase.auth().signInWithEmailAndPassword(params.email, params.password);
      const currentUser = firebase.auth().currentUser;
      if(currentUser){
        return {
          code: 'OK',
          data: {
            id: currentUser.uid,
            token: currentUser.uid,
            username: currentUser.displayName,
            avatar: currentUser.photoURL,
          }
        }
      }
    } catch (error) {
      console.log(
        'Error at loginRequestFromSelectAccountScreen:',
        error.message,
      );
    }
  },
);

export const loginRequestFromSignInPersistScreen = createAsyncThunk(
  'auth/loginRequestFromSignInPersistScreen',
  async (params) => {
    try {
      const response = await authApi.login(params);
      console.log('loginRequestFromSignInPersistScreen response:', response);
      if (response.code === responses.OK) {
        await AsyncStorage.setItem('tokenPersist', response.data.token);
        const jsonData = await AsyncStorage.getItem('dataPersist');
        const data = JSON.parse(jsonData);
        const newData = {
          ...data,
          password: params.password,
        };
        const newJsonData = JSON.stringify(newData);
        await AsyncStorage.setItem('dataPersist', newJsonData);
        return {
          ...response,
          password: params.password,
        };
      }
      return response;
    } catch (error) {
      console.log(
        'Error at loginRequestFromSignInPersistScreen:',
        error.message,
      );
    }
  },
);

export const loginRequestFromSignInScreen = createAsyncThunk(
  'auth/loginRequestFromSignInScreen',
  async (params) => {
    try {
      // const response = await authApi.login(params);
      // console.log('loginRequestFromSignInScreen response:', response);
      await firebase.auth().signInWithEmailAndPassword(params.email, params.password);
      await firebase.auth().currentUser.reload();
      const currentUser = firebase.auth().currentUser;
      if(firebase.auth().currentUser){
        await AsyncStorage.setItem('tokenPersist', firebase.auth().currentUser.uid);
        const data = {
          id: firebase.auth().currentUser.uid,
          username: firebase.auth().currentUser.displayName,
          email: params.email,
          password: params.password,
          avatar: firebase.auth().currentUser.photoURL
        };
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem('dataPersist', jsonData);
        return {
          code: 'OK',
          data: {
            id: firebase.auth().currentUser.uid,
            username: firebase.auth().currentUser.displayName,
            email: params.email,
            password: params.password,
            avatar: firebase.auth().currentUser.photoURL,
          }
        }
      }
      else {
        return {
          code: 'OK'
        }
      }
      // if (response.code === responses.OK) {
      //   await AsyncStorage.setItem('tokenPersist', response.data.token);
      //   const data = {
      //     id: response.data.id,
      //     username: response.data.username,
      //     email: params.email,
      //     password: params.password,
      //     avatar: response.data.avatar,
      //   };
      //   const jsonData = JSON.stringify(data);
      //   await AsyncStorage.setItem('dataPersist', jsonData);
      //   return {
      //     ...response,
      //     email: params.email,
      //     password: params.password,
      //   };
      // }
      // return response;
    } catch (error) {
      console.log('Error at loginRequestFromSignInScreen', error.message);
    }
  },
);

export const logoutRequest = createAsyncThunk(
  'auth/logoutRequest',
  async (params) => {
    try {
      await AsyncStorage.removeItem('tokenPersist');
      // const response = await authApi.logout(params);
      // console.log('logoutRequest response:', response);
      // return response;
      await firebase.auth().signOut();
      return;
    } catch (error) {
      console.log('Error at logoutRequest:', error.message);
    }
  },
);

const auth = createSlice({
  name: 'auth',
  initialState: {
    showSplash: true,
    inApp: false,
    isSignUp: false,

    idMain: null,
    usernameMain: null,
    emailMain: null,
    passwordMain: null,
    avatarMain: null,

    tokenPersist: null,
    tokenMain: null,

    haveDataPersist: false,
    idPersist: null,
    usernamePersist: null,
    emailPersist: null,
    passwordPersist: null,
    avatarPersist: null,

    usernameCreated: null,
    birthdayCreated: null,
    emailCreated: null,
    passwordCreated: null,
    avatarCreated: null,

    loadingSignUpRequest: false,
    createAccountStatus: null,

    loadingLoginRequestFromSignInAlertScreen: true,

    loadingCheckVerifyCodeRequest: false,
    checkVerifyCodeRequestStatus: null,

    loadingChangeInfoAfterSignUpRequest: false,

    loadingLoginRequestFromSelectAccountScreen: false,

    loadingLoginRequestFromSignInPersistScreen: false,
    loginRequestFromSignInPersistScreenStatus: null,

    loadingLoginRequestFromSignInScreen: false,
    loginRequestFromSignInScreenStatus: null,

    loadingLogoutRequest: false,

    isSentEmailVerify: false,
    isEmailVerified: false,
  },
  reducers: {
    saveUsernameCreated: (state, action) => {
      state.usernameCreated = action.payload.usernameCreated;
    },
    saveEmailCreated: (state, action) => {
      state.emailCreated = action.payload.emailCreated;
    },
    savePasswordCreated: (state, action) => {
      state.passwordCreated = action.payload.passwordCreated;
    },
    resetCreateAccountStatus: (state) => {
      state.createAccountStatus = null;
    },
  },
  extraReducers: {
    [bootstrapAsync.pending]: () => {},
    [bootstrapAsync.rejected]: () => {},
    [bootstrapAsync.fulfilled]: (state, action) => {
      state.showSplash = false;
      if (action.payload.key === 'TD') {
        state.inApp = true;

        state.tokenMain = action.payload.token;
        state.idMain = action.payload.data.id;
        state.usernameMain = action.payload.data.username;
        state.emailMain = action.payload.data.email;
        state.passwordMain = action.payload.data.password;
        state.avatarMain = action.payload.data.avatar;

        state.haveDataPersist = true;
        state.tokenPersist = action.payload.token;
        state.idPersist = action.payload.data.id;
        state.usernamePersist = action.payload.data.username;
        state.emailPersist = action.payload.data.email;
        state.passwordPersist = action.payload.data.password;
        state.avatarPersist = action.payload.data.avatar;
      } else if (action.payload.key === 'nTD') {
        state.haveDataPersist = true;
        state.idPersist = action.payload.data.id;
        state.usernamePersist = action.payload.data.username;
        state.emailPersist = action.payload.data.email;
        state.passwordPersist = action.payload.data.password;
        state.avatarPersist = action.payload.data.avatar;
      } // else if (action.payload.key === 'nTnD') {
      // nothing
      // }
    },

    [signUpRequest.pending]: (state) => {
      state.loadingSignUpRequest = true;
    },
    [signUpRequest.rejected]: () => {},
    [signUpRequest.fulfilled]: (state, action) => {
      state.loadingSignUpRequest = false;
      // if (action.payload.code === responses.OK) {
      //   state.createAccountStatus = 'SUCCESS'; // logout
      // } else {
      //   state.createAccountStatus = 'FAILED';
      // }
      if(action.payload.code === 'OK'){
        state.createAccountStatus = 'SUCCESS';
      }
      else{
        state.createAccountStatus = 'FAILED';
      }
    },

    [loginRequestFromSignInAlertScreen.pending]: () => {},
    [loginRequestFromSignInAlertScreen.rejected]: () => {},
    [loginRequestFromSignInAlertScreen.fulfilled]: (state, action) => {
      state.loadingLoginRequestFromSignInAlertScreen = false; // logout
      if (action.payload.code === responses.OK) {
        state.idMain = action.payload.data.id;
        state.tokenMain = action.payload.data.token;
      }
    },

    [saveTokenDataFromSignInAlertScreen.pending]: () => {},
    [saveTokenDataFromSignInAlertScreen.rejected]: () => {},
    [saveTokenDataFromSignInAlertScreen.fulfilled]: (state, action) => {
      state.haveDataPersist = true;
      state.idPersist = action.payload.data.id;
      state.usernamePersist = action.payload.data.username;
      state.emailPersist = action.payload.data.email;
      state.passwordMain = state.passwordCreated;
      //
      state.usernameMain = action.payload.data.username;
      state.emailMain = action.payload.data.email;
      if (action.payload.key) {
        state.passwordPersist = action.payload.data.password;
      } else {
        state.passwordPersist = null;
      }
    },

    [getVerifyCodeRequest.pending]: () => {},
    [getVerifyCodeRequest.rejected]: () => {},
    [getVerifyCodeRequest.fulfilled]: (state, action) => {
      if(action.payload.code === 'OK'){
        state.isSentEmailVerify = true
      }
    },


    [checkVerifyCodeRequest.pending]: (state) => {
      state.loadingCheckVerifyCodeRequest = true;
    },
    [checkVerifyCodeRequest.rejected]: () => {},
    [checkVerifyCodeRequest.fulfilled]: (state, action) => {
      // state.loadingCheckVerifyCodeRequest = false;
      // if (action.payload.code === responses.OK) {
      //   state.checkVerifyCodeRequestStatus = 'SUCCESS'; // logout
      //   state.tokenPersist = action.payload.data.token;
      //   state.idPersist = action.payload.data.id;
      //   state.tokenMain = action.payload.data.token;
      //   state.idMain = action.payload.data.id;
      // } else {
      //   state.checkVerifyCodeRequestStatus = 'FAILED';
      // }

      if(action.payload.code === 'OK'){
        state.isEmailVerified = true;
      }
    },

    [changeInfoAfterSignUpRequest.pending]: (state) => {
      state.loadingChangeInfoAfterSignUpRequest = true;
    },
    [changeInfoAfterSignUpRequest.rejected]: () => {},
    [changeInfoAfterSignUpRequest.fulfilled]: (state, action) => {
      state.loadingChangeInfoAfterSignUpRequest = false;
      // console.log("action payload: " + action.payload.code);
      if (action.payload.code === 'OK') {
        state.inApp = true;
        // state.avatarMain = action.payload.data.avatar;
        state.avatarPersist = action.payload.avatar;
        // state.usernameMain = action.payload.data.username;
        // state.phoneNumberMain = action.payload.data.phonenumber;
        // created
        // is_blocked No
        // online No
        state.usernameMain = action.payload.nameMain,
        state.passwordMain = action.payload.passMain,
        state.emailMain = action.payload.emailMain,
        state.avatarMain = action.payload.avatar
      }
      
    },

    [loginRequestFromSelectAccountScreen.pending]: (state) => {
      state.loadingLoginRequestFromSelectAccountScreen = true;
    },
    [loginRequestFromSelectAccountScreen.rejected]: () => {},
    [loginRequestFromSelectAccountScreen.fulfilled]: (state, action) => {
      state.loadingLoginRequestFromSelectAccountScreen = false;
      if (action.payload.code === 'OK') {
        state.inApp = true;
        state.tokenMain = action.payload.data.token;
        state.idMain = action.payload.data.id;
        state.usernameMain = action.payload.data.username;
        state.emailMain = state.emailPersist;
        state.passwordMain = state.passwordPersist;
        state.avatarMain = action.payload.data.avatar;
        state.tokenPersist = action.payload.data.token;
      }
    },

    [loginRequestFromSignInPersistScreen.pending]: (state) => {
      state.loadingLoginRequestFromSignInPersistScreen = true;
    },
    [loginRequestFromSignInPersistScreen.rejected]: () => {},
    [loginRequestFromSignInPersistScreen.fulfilled]: (state, action) => {
      state.loadingLoginRequestFromSignInPersistScreen = false;
      if (action.payload.code === responses.OK) {
        state.inApp = true;
        state.tokenMain = action.payload.data.token;
        state.idMain = action.payload.data.id;
        state.usernameMain = action.payload.data.username;
        state.emailMain = state.emailPersist;
        state.passwordMain = action.payload.password;
        state.avatarMain = action.payload.data.avatar;
        state.tokenPersist = action.payload.data.token;
        state.passwordPersist = action.payload.password;
      } else {
        state.loginRequestFromSignInPersistScreenStatus = 'FAILED'; // logout
      }
    },

    [loginRequestFromSignInScreen.pending]: (state) => {
      state.loadingLoginRequestFromSignInScreen = true;
    },
    [loginRequestFromSignInScreen.rejected]: () => {},
    [loginRequestFromSignInScreen.fulfilled]: (state, action) => {
      state.loadingLoginRequestFromSignInScreen = false;
      if (action.payload.code === 'OK') {
        state.inApp = true;

        state.tokenMain = action.payload.data.token;
        state.idMain = action.payload.data.id;
        state.usernameMain = action.payload.data.username;
        state.emailMain = action.payload.data.email;
        state.passwordMain = action.payload.data.password;
        state.avatarMain = action.payload.data.avatar;

        state.haveDataPersist = true;
        state.tokenPersist = action.payload.data.token;
        state.idPersist = action.payload.data.id;
        state.usernamePersist = action.payload.data.username;
        state.emailPersist = action.payload.data.email;
        state.passwordPersist = action.payload.data.password;
        state.avatarPersist = action.payload.data.avatar;
      } else {
        state.loginRequestFromSignInScreenStatus = 'FAILED'; // logout
      }
    },

    [logoutRequest.pending]: (state) => {
      state.loadingLogoutRequest = true;
    },
    [logoutRequest.rejected]: () => {},
    [logoutRequest.fulfilled]: (state, action) => {
      state.loadingLogoutRequest = false;
      state.inApp = false;
      state.tokenMain = null;
      state.tokenPersist = null;
      //
      state.createAccountStatus = null;
      state.loadingLoginRequestFromSignInAlertScreen = true;
      state.checkVerifyCodeRequestStatus = null;
      state.loginRequestFromSignInPersistScreenStatus = null;
      state.loginRequestFromSignInScreenStatus = null;
      // if (action.payload.code === responses.OK) {
      // } else {
      // }
    },
  },
});

const {reducer, actions} = auth;

export const {
  saveUsernameCreated,
  saveEmailCreated,
  savePasswordCreated,
  resetCreateAccountStatus,
} = actions;
export default reducer;
