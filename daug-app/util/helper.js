import { AsyncStorage, Platform, Alert } from 'react-native';





// Auth navigation helpers
export const USER_KEY = "secret-user-key-123-xyz";
export const USER_ID = 'some-random-user-id-123-xyz'

export const onSignIn = (userId) => AsyncStorage.multiSet([[USER_KEY, "true"], [USER_ID, userId.toString()]])

export const onSignOut = () => AsyncStorage.multiRemove([USER_KEY, USER_ID])

export const getUserId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_ID)
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

