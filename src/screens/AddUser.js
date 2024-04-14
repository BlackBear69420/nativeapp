import {View, Text, TouchableOpacity, Alert, KeyboardAvoidingView,Pressable,PermissionsAndroid,Image, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState,useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, TextInput } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Toast from 'react-native-toast-message';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading,setLoading]=useState(false)

  const navigation = useNavigation();
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  const handleCameraUpload = async () => {
    try {
      const image = await ImagePicker.openCamera({
        cropping: true,
      });
      setSelectedImage(image);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const validate = () => {
    let valid = true;
    if (name == '') {
      valid = false;
    }
    if (email == '') {
      valid = false;
    }
    return valid;
  };

  const onSubmit = async (data) => {
    if (!selectedImage) {
      Alert.alert('Please select an image');
      return;
    }
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
  
    const formData = new FormData();
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('file', {
      uri: selectedImage.path,
      type: selectedImage.mime,
      name: 'image.jpg',
    });
  
    try {
      const response = await fetch(`${BASE_URL}form`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      console.log('Response:', response);
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log(responseData);
        console.log('Data registered:', responseData.message);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: responseData.message,
          position: 'bottom',
          visibilityTime: 3000, // 3 seconds
          autoHide: true,
          onHide: () => {
            navigation.goBack();
          }
        });
      } else {
        console.error('Error:', responseData.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: responseData.message || 'Something went wrong',
          position: 'bottom',
          visibilityTime: 3000, // 3 seconds
          autoHide: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred',
        position: 'bottom',
        visibilityTime: 3000, // 3 seconds
        autoHide: true,
      });
    }
    finally {
      setLoading(false);
    }
  };
  


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 ,backgroundColor:'#f8f4ff'}}
  >
     <Toast style={{marginTop:50}} />
    <ScrollView>
    <LinearGradient colors={['#e6e6fa', '#e6e6fa']} style={{ display:'flex',flexDirection:'row',paddingVertical:10}}  start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 0 }} >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{justifyContent:'center',paddingHorizontal:10}}>
        <FontAwesomeIcon size={25} icon={faChevronLeft} />
          </TouchableOpacity>
      <Text onPress={() => navigation.goBack()} style={{ fontSize: 20, fontWeight: 'bold', color: 'black',alignSelf:'center' }}>
        Add Data
      </Text>
    </LinearGradient>
    <View style={{flex: 1,margin:5,alignItems:'center',justifyContent:'center'}}>
      <TextInput
        value={name}
        label="latitude"
        onChangeText={txt => setName(txt)}
        textColor='black'
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
        label="longitude"
        value={email}
        onChangeText={txt => setEmail(txt)}
        textColor='black'
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
         <Pressable
          style={{
            backgroundColor: '#4169e1',
            borderColor: '#C0C0C0',
            borderWidth: 1,
            width: '90%',
            borderRadius: 10,
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
            marginTop: 20,
          }}
          onPress={handleCameraUpload}>
          <Text style={{ fontSize: 16, color: '#fff' }}>Take a Picture</Text>
        </Pressable>
      <TouchableOpacity
        style={{
          width: '90%',
          backgroundColor:'#4169e1',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
          borderRadius: 10,
          padding:10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}
        onPress={() => {
          if (validate()) {
            onSubmit({ latitude: name, longitude: email });
            
          } else {
            Alert.alert('Error saving', 'Please Fill Correct Data');
          }
        }}>
        <Text style={{color: 'white',fontSize:18,fontWeight:700}}>{loading?<ActivityIndicator color='white' height={15}/>:'Save Data'}</Text>
      </TouchableOpacity>
      {selectedImage && (
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
              borderRadius: 20,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 8,
              padding:10,
              paddingHorizontal:20
            }}>
            <Text style={{ color: 'black', fontSize: 18,paddingVertical:10 }}>Image</Text>
            <Image
              source={{ uri: selectedImage.path }}
              style={{
                width: 300,
                height: 220,
                borderRadius: 20,
                alignSelf: 'center',
              }}
              resizeMode="cover"
              alt="Selected Image"
            />
          </View>
        )}
    </View>
    </ScrollView>
  
    </KeyboardAvoidingView>
  );
};

export default AddUser;
