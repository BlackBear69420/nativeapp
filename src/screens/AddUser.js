import {View, Text, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { TextInput } from 'react-native-paper';
import {addUser, updateUser} from '../redux/UserSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const AddUser = () => {
  const route = useRoute();
  const [name, setName] = useState(
    route.params.type == 'edit' ? route.params.data.name : '',
  );
  const [email, setEmail] = useState(
    route.params.type == 'edit' ? route.params.data.email : '',
  );
  const [mobile, setMobile] = useState(
    route.params.type == 'edit' ? route.params.data.mobile : '',
  );
  const [address, setAddress] = useState(
    route.params.type == 'edit' ? route.params.data.address : '',
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const validate = () => {
    let valid = true;
    if (name == '') {
      valid = false;
    }
    if (email == '') {
      valid = false;
    }
    if (mobile == '') {
      valid = false;
    }
    if (address == '') {
      valid = false;
    }

    return valid;
  };
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 ,}}
  >
    <LinearGradient colors={['#FA351F', '#FA8072']} style={{ padding: 16 }}  start={{ x: 0, y: 0 }} // Start from the top-left corner
      end={{ x: 1, y: 0 }} >
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white',alignSelf:'center' }}>
        Add User
      </Text>
    </LinearGradient>
    <View style={{flex: 1,margin:5,alignItems:'center',justifyContent:'center'}}>
      <TextInput
        value={name}
        mode='outlined'
        label="Enter User Name"
        onChangeText={txt => setName(txt)}
        style={{
          width: '90%',
          height: 50,
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 10,
          fontSize:15,
          backgroundColor:'white'
        }}
      />
      <TextInput
        mode='outlined'
        label="Enter User Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={{
          width: '90%',
          height: 50,
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 10,
          fontSize:15,
          backgroundColor:'white'
        }}
        keyboardType="email-address"
      />
      <TextInput
        mode='outlined'
        label="Enter User Number"
        value={mobile}
        onChangeText={txt => setMobile(txt)}
        style={{
          width: '90%',
          height: 50,
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 10,
          fontSize:15,
          backgroundColor:'white'
        }}
        keyboardType="number-pad"
        maxLength={10}
      />
      <TextInput
        mode='outlined'
        label="Enter User Address"
        value={address}
        onChangeText={txt => setAddress(txt)}
        style={{
          width: '90%',
          height: 50,
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 10,
          backgroundColor:'white',
          fontSize:15,
        }}
      />
      <TouchableOpacity
        style={{
          width: '90%',
          backgroundColor:'#FA6857',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
          borderRadius: 10,
          padding:10
        }}
        onPress={() => {
          if (validate()) {
            if (route.params.type == 'edit') {
              dispatch(
                updateUser({
                  name: name,
                  email: email,
                  mobile: mobile,
                  address: address,
                  index: route.params.index,
                }),
              );
            } else {
              dispatch(addUser({name, email, address, mobile}));
            }

            navigation.goBack();
          } else {
            Alert.alert('Error saving',
            'Please Fill Correct Data');
          }
        }}>
        <Text style={{color: 'white',fontSize:18,fontWeight:700}}>Save User</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
};

export default AddUser;
