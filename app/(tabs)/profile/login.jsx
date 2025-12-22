import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../../features/auth/authSlice";


const Login = () => {
   const router = useRouter();
   const { from = 'sidebar' } = useLocalSearchParams();
   const {width, height} = useWindowDimensions()
    const dispatch = useDispatch();
  const {loading,error,token,user} = useSelector(state => state.auth);
  // const error = useSelector(state => state.auth.error);
  // const token = useSelector(state => state.auth.token);
  // const user = useSelector(state => state.auth.user);

  // const [input, setInput] = useState({
  //   email:'email',
  //   password:'password'
  // });

useEffect(() => {
  if (user) {
    router.replace(from);
  }
}, [user]);

console.log(token)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const onLogin = () => {
    console.log(email,password)
    dispatch(login({ email, password }));
  };

  const isTablet = width >576
  return (
     <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Login</Text>

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
         }} onPress={onLogin} disabled={loading}>
        <Text style={{textAlign:'center',color:"#fff",
          fontWeight:'bold',
           fontSize:isTablet?30:22,
           }}>{loading ? 'Loading...' : 'Login'}</Text>
      </TouchableOpacity>
      {/* <Button title={loading ? 'Loading...' : 'Login'}  /> */}

      <Text
        // onPress={() => navigation.navigate('Register')}
        onPress={()=>router.push('/profile/register')}
        style={{ marginTop: 20, textAlign: 'center', color: 'blue' }}
      >
        Create an account?
      </Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})