import React, { useContext, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from "../src/AuthProvider";
import { View, Text, KeyboardAvoidingView , StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button,TextInput } from 'react-native-paper';

const Stack = createNativeStackNavigator();

function LoginScreen({ navigation }) {


  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
    >
        <Text style={styles.textTitle}>Policy Viewing App</Text>
        <Text style={{ color: 'red', marginBottom: 5 }}>{ error }</Text>
        <View style={styles.inputContainer}>
            
            <TextInput
                left={<TextInput.Icon name="account-outline" />}
                label="Email"
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                mode="outlined"
            ></TextInput>

            

            <TextInput
                left={<TextInput.Icon name="lock-outline" />}
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                mode="outlined"
            ></TextInput>

            <View style={styles.buttonContainer}>


                <Button
                mode="contained"
                style={styles.button}
                onPress={() => login(email, password)}
                >
                    Login
                </Button>


                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={{backgroundColor:'white',marginTop:30}}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

                
                
            </View>


        </View>

    </KeyboardAvoidingView>

  );
}

function RegisterScreen({ navigation }) {
  const { error,success, register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
    >
        <Text style={{ color: 'green', marginBottom: 5 }}>{ success }</Text>
        <Text style={{ color: 'red', marginBottom: 5 }}>{ error }</Text>
        <View style={styles.inputContainer}>
            

            <TextInput
                left={<TextInput.Icon name="account-outline" />}
                label="Fullname"
                placeholder="Fullname"
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
                mode="outlined"
            ></TextInput>

            <TextInput
                left={<TextInput.Icon name="email-outline" />}
                label="Email"
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                mode="outlined"
            ></TextInput>

            <TextInput
                left={<TextInput.Icon name="lock-outline" />}
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                mode="outlined"
            ></TextInput>


            <View style={styles.buttonContainer}>

               

                <Button
                mode="contained"
                style={styles.button}
                onPress={() => register(name,email,password)}
                >
                    Register
                </Button>
                
            </View>


        </View>

    </KeyboardAvoidingView>
  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={ {headerShown : false}} name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}





const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    textTitle:{
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center'
    },

    inputContainer:{
        marginTop: 5,
        width: '80%'
    },

    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop:5,
        backgroundColor: '#f3f3f3'
    },

    buttonContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    button:{
        backgroundColor: 'black',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },

    buttonOutline:{
        backgroundColor: 'white',
        marginTop: 5,
        borderRightColor: '#0782F9',
        borderWidth: 2,
    },

    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },

    buttonOutlineText:{
        color: 'black',
        fontWeight: '700',
        fontSize: 16
    }

    
})