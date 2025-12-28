import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../../features/auth/authSlice";


const Login = () => {
  const router = useRouter();
  const { from } = useLocalSearchParams();
  const { width } = useWindowDimensions();
 

  const dispatch = useDispatch();
  const { status, error, user } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = status === 'loading';
  const isTablet = width > 576;

  useEffect(() => {
    if (status === 'succeeded' && user) {
      router.replace(from ?? '/profile/sidebar');
    }
  }, [status, user]);

  const onLogin = () => {
    if (!email || !password) return;
    dispatch(login({ email, password }));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="email@example.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
        {/* Forgot Passord */}
        <Text
        onPress={() => router.push('/profile/sendMail')}
        style={styles.link}
      >
        forgot password?
      </Text>
      {/* Password  */}
      <TextInput
        placeholder="**************"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[
          styles.button,
          isLoading && { opacity: 0.6 }
        ]}
        onPress={onLogin}
        disabled={isLoading}
      >
        <Text style={[
          styles.buttonText,
          { fontSize: isTablet ? 30 : 22 }
        ]}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <Text
        onPress={() => router.push('/profile/register')}
        style={styles.link}
      >
        Create an account?
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: '5%',
    marginBottom: '10%',
    borderRadius: 20,
    borderColor: '#1d4ed8',
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#1d4ed8',
    height: 44,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
  },
});
