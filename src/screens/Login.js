import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Platform } from 'react-native';
import { auth } from '../../firebase';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../config';


  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
  
    const navigation = useNavigation();
  
    useEffect(() => {
      const checkLoggedIn = async () => {
        setLoading(true);
        try {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            navigation.replace('Users');
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error('Error reading token from AsyncStorage:', error);
          setLoading(false);
        }
      };
  
      checkLoggedIn();
    }, []);
  
    const handleLogin = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}auth/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), 
        });
        const responseData = await response.json();
  
        if (responseData.success) {
          await AsyncStorage.setItem('token', responseData.token);
          navigation.navigate('Users');
          setErrorMessage('');
        } else {
          alert(responseData.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('An error occurred during login. Please try again later.');
      }
      setLoading(false); 
    };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1338be" />
      ) : ( 
        
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
              value={email}
              onChangeText={text => setEmail(text)}
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
              onPress={handleLogin}
              style={[styles.button, styles.buttonOutline]}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', paddingTop: 10 }}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{ fontSize: 17, color: 'white' }}>Not an user? </Text>
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 700 }}>
                Click here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f4ff',
  },
  inputContainer: {
    width: '80%',
    gap: 30,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 15,
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
    padding: 10,
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
    fontSize: 18,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
