import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import { TextInput,Snackbar } from 'react-native-paper'
import { BASE_URL } from '../../config'
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const [email1, setEmail1] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const handleSignUp = () => {
    const userData = {
      email: email1,
      name:name,
      password: password,
    };
  
    fetch(`${BASE_URL}auth/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          console.log('User registered successfully');
          Alert.alert('Success', 'User registered successfully');
          navigation.navigate('Login');
        } else {
          throw new Error(data.message || 'Registration failed');
        }
      })
      .catch(error => {
        alert(error.message || 'An error occurred during signup. Please try again later.');
      });
  };
  


  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
   <View
      style={{
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4169e1',
        paddingVertical: 30,
        borderRadius: 10,
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          android: {
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
        }),
      }}>
<View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email1}
          onChangeText={text => setEmail1(text)}
          style={styles.input}
          textColor='black'
        />
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
          textColor='black'
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          textColor='black'
        />

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
              style={{ flexDirection: 'row', paddingTop: 10 }}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontSize: 17, color: 'white' }}>Already an user? </Text>
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 700 }}>
                Click here
              </Text>
            </TouchableOpacity>
</View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f4ff',
  },
  inputContainer: {
    width: '80%',
    gap:30
  },
  input: {
    backgroundColor: 'white',
    fontSize:16
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#1338be',
    width: '100%',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    marginTop: 5,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
})