import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { create } from "../../../features/auth/authSlice";



const register = () => {
   const router = useRouter();
   const {width, height} = useWindowDimensions()
     const dispatch = useDispatch();
    const {loading,error, status} = useSelector(state => state.auth);

       const [email, setEmail] = useState('');
       const [name, setName] = useState('');
       const [address, setAddress] = useState('');
       const [phone, setPhone] = useState('');
       const [password, setPassword] = useState('');
     
        const onRegister = () => {
        //  console.log(name,address,phone,email, password)
         dispatch(create({ name,address,phone,email, password }));
       };

       useEffect(()=>{
        if(status==='success'){
          router.push('/profile/login')
        }
       },[status])

     const isTablet = width >576
  return (
   <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Register</Text>

      <TextInput
        placeholder="Full Name"
        style={{ borderWidth: 1,
      padding: '5%',
          marginBottom: '10%',
          borderRadius:20,
          borderColor:'#1d4ed8',
          backgroundColor:'#fff',
          }}
         value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="email@example.com"
        style={{ borderWidth: 1,
         padding: '5%',
          marginBottom: '10%',
          borderRadius:20,
          borderColor:'#1d4ed8',
          backgroundColor:'#fff',
          }}
         value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Address please..."
        style={{ borderWidth: 1,
          padding: '5%',
          marginBottom: '10%',
          borderRadius:20,
          borderColor:'#1d4ed8',
          backgroundColor:'#fff',
          }}
         value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Phone"
        style={{ borderWidth: 1,
          padding: '5%',
          marginBottom: '10%',
          borderRadius:20,
          borderColor:'#1d4ed8',
          backgroundColor:'#fff',
          }}
         value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="*****************"
        secureTextEntry
        style={{backgroundColor:'#fff',
           padding: '5%',
          marginBottom: '10%',
          borderRadius:20,
          borderColor:'#1d4ed8',
          borderWidth: 1,
          }}
         value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

<TouchableOpacity style={{
        borderRadius:20,
         backgroundColor:'#1d4ed8',
         height:40
         }} onPress={onRegister} disabled={loading}>
        <Text style={{textAlign:'center',color:"#fff",
          fontWeight:'bold',
           fontSize:isTablet?30:22,
           }}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>
      {/* <Button title={loading ? 'Loading...' : 'Login'}  /> */}
<Link style={{ marginTop: 20, textAlign: 'center', color: 'blue' }} href={'/profile/login'}>
        Already have an account? </Link>
    </ScrollView>
  )
}

export default register

const styles = StyleSheet.create({})