import {View, Text, TouchableOpacity, FlatList,StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../redux/UserSlice';
import { auth } from '../../firebase'
import { ScrollView } from 'react-native-gesture-handler';



const Users = () => {
  const navigation = useNavigation();
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();
const handleSignOut = () => {
  auth
    .signOut()
    .then(() => {
      navigation.replace('Login');
    })
    .catch((error) => alert(error.message));
};
  console.log(users);
  return (
<>
     <TouchableOpacity
        style={{
          height: 60,
          backgroundColor: '#FF4433',
          justifyContent: 'center',
          alignItems: 'center',
          width:'70%',
          marginLeft:55,
          borderRadius:10,
          marginTop:30
        }}
        onPress={() => {
          navigation.navigate('AddUser', {type: 'add'});
        }}>
        <Text style={{color: 'white', fontSize: 23,fontWeight:700}}>Add New User</Text>
      </TouchableOpacity>
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
                backgroundColor:'white'
              }}>
              <View style={{paddingLeft:10}}>
                <Text style={styles.text}>{'Name: ' + item.name}</Text>
                <Text style={styles.text}>{'Email: ' + item.email}</Text>
                <Text style={styles.text}>{'Mobile: ' + item.mobile}</Text>
                <Text style={styles.text}>{'Address: ' + item.address}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
                <Text
                  style={{
                    fontSize:20,
                    color:'white',
                    backgroundColor:'#FF5F15',
                    width:80,
                    height:38,
                    textAlign:'center',
                    borderRadius:10,
                    fontWeight:700,
                    padding:6

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
                    fontSize:20,
                    color:'white',
                    backgroundColor:'#FF5F15',
                    width:80,
                    height:38,
                    textAlign:'center',
                    borderRadius:10,
                    fontWeight:700,
                    padding:6
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
      style={{alignItems:'center',backgroundColor:'#FF5F15',margin:25,borderRadius:10,height:50,padding:10
  }}>
        <Text style={{fontSize:24,color:'white'}}>Sign out</Text>
      </TouchableOpacity>
    </View>
</>
  );
};

export default Users;

const styles = StyleSheet.create({
  text:{
    fontSize:19,
    color:'#353935',
  }
})
