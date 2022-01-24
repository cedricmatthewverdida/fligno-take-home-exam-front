import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        success,

        login: (email, password) => {
          setError('');
          axios.post('http://10.0.2.2:8000/api/login', {
            email,
            password
          })
          .then(response => {
            const userResponse = {
              email: response.data.user.email,
              token: response.data.token,
            }
            setUser(userResponse);
            setError(null);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
          })
          .catch(error => {
            setError(error.response.data.message);
          })

        },

        logout: () => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

          axios.post('http://10.0.2.2:8000/api/logout')
          .then(response => {
            setUser(null);
            SecureStore.deleteItemAsync('user')
          })
          .catch(error => {
            console.log(error.response);
          })

        },

        register: (name,email,password) => {
          setSuccess(null);
          setError(null);
          axios.post('http://10.0.2.2:8000/api/register', {
            name,
            email,
            password,
            role: 'user'
          })
          .then(response => {
            setSuccess("Successfuly registered")
          })
          .catch(error => {
            setError(error.response.data);
          })
        }

      }}>
      {children}
    </AuthContext.Provider>
  );
}