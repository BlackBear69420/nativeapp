import {View, Text, TouchableOpacity, FlatList,StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../redux/UserSlice';
import { auth } from '../../firebase'
import LinearGradient from 'react-native-linear-gradient';
import AnimatedLottieView from 'lottie-react-native'
import Empty from '../ghost.json'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Users = () => {
  const navigation = useNavigation();
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      // Clear user from AsyncStorage
      await AsyncStorage.removeItem('user');
  
      // Sign out the user
      auth
        .signOut()
        .then(() => {
          navigation.replace('Login');
        })
        .catch(error => alert(error.message));
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  };
  console.log(users);
  return (
<View style={styles.linearGradient}>
<LinearGradient colors={['#FA503D', '#FA8072']} style={{ padding: 16 }}  start={{ x: 0, y: 0 }} // Start from the top-left corner
      end={{ x: 1, y: 0 }} >
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white',alignSelf:'center' }}>
        User Info
      </Text>
    </LinearGradient>
     <TouchableOpacity
        style={{
          backgroundColor: '#FA6857',
          justifyContent: 'center',
          alignItems: 'center',
          width:'70%',
          borderRadius:10,
          marginTop:30,
          alignSelf:'center',
          paddingVertical:10
        }}
        onPress={() => {
          navigation.navigate('AddUser', {type: 'add'});
        }}>
             
        <Text style={{color: 'white', fontSize: 18,fontWeight:700}}>Add New User</Text>
      </TouchableOpacity>
      {users.data.length==0 &&(
            <>
            <AnimatedLottieView
                        source={Empty}
                        autoPlay
                        loop
                        style={{
                            width: 250,
                            height: 250,
                            alignSelf: 'center',
                            marginTop:'25%'
                        }}
                    />
                    <Text style={{color:'black',fontSize:18,alignSelf:'center'}}>No Data to show</Text>
            </>
      )}
  
     
    <View style={{flex: 1,}}>
      
     
      <FlatList
        data={users.data}
        renderItem={({item, index}) => {
          return (
            <View
            style={{
              width: '90%',
              padding: 15,
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 10,
              flexDirection: 'column',
              backgroundColor: 'white',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                },
                android: {
                  elevation: 3,
                },
              }),
              marginBottom:5
            }}
            >
              <View style={{gap:3}}>
                <Text style={styles.text}>{'Name: ' + item.name}</Text>
                <Text style={styles.text}>{'Email: ' + item.email}</Text>
                <Text style={styles.text}>{'Mobile: ' + item.mobile}</Text>
                <Text style={styles.text}>{'Address: ' + item.address}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
                <Text
                  style={{
                    fontSize:17,
                    color:'#FA6857',
                    backgroundColor:'white',
                    textAlign:'center',
                    borderRadius:8,
                    fontWeight:700,
                    paddingVertical:6,
                    paddingHorizontal:40,
                    borderWidth:2,
                    borderColor:'#FA6857'
                  }}
                  onPress={() => {
                    navigation.navigate('AddUser', {
                      type: 'edit',
                      data: item,
                      index: index,
                    });
                  }}>
                  Edit
                </Text>
                <Text
                  style={{
                    fontSize:17,
                    color:'white',
                    backgroundColor:'#FA6857',
                    textAlign:'center',
                    borderRadius:8,
                    fontWeight:700,
                    paddingVertical:6,
                    paddingHorizontal:40,
                  }}
                  onPress={() => {
                    dispatch(deleteUser(index));
                  }}>
                  Delete
                </Text>
              </View>
              
            </View>
          );
        }}
      />

    <TouchableOpacity onPress={handleSignOut}
      style={{alignItems:'center',backgroundColor:'#FA6857',margin:25,borderRadius:10,padding:10
  }}>
        <Text style={{fontSize:20,color:'white'}}>Sign out</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  text:{
    fontSize:15,
    color:'#353935',
  },
  linearGradient: {
    flex: 1,
  },
})
