import { View, Text, KeyboardAvoidingView , StyleSheet,TextInput, TouchableOpacity, Platform } from 'react-native';
import React , {useState} from 'react';
const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
    >
        <Text style={styles.textTitle}>Policy Viewing App</Text>
        <View style={styles.inputContainer}>
            
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            ></TextInput>

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            ></TextInput>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {}}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {}}
                    style={[styles.button,styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>


        </View>

    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    textTitle:{
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    },

    inputContainer:{
        marginTop: 20,
        width: '80%'
    },

    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
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
        backgroundColor: '#0782F9',
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
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    }

    
})