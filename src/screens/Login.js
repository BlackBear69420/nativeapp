import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase'

const Login = () => {
    const [email1, setEmail1] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("Users")
          }
        })
    
        return unsubscribe
      }, [])

    const handleLogin = () => {
        auth
          .signInWithEmailAndPassword(email1, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
          })
          .catch(error => alert(error.message))
      }
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
  >
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Email"
        value={email1}
        onChangeText={text => setEmail1(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{flexDirection:'row'}}
        onPress={()=>navigation.navigate('LoginScreen')}
      >
        <Text style={{fontSize:19,paddingTop:15,color:'black'}}>Not a user? </Text><Text style={{fontSize:20,paddingTop:15,color:'#FF5F15',fontWeight:700}}>Click here</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%',
      gap:20
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      fontSize:20
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#FF5F15',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 20,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
  })