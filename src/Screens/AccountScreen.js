import { onAuthStateChanged } from 'firebase/auth';
import { View, StyleSheet, Text } from 'react-native';
import { auth } from '../../firebase';
import Btn from '../components/Button';
function AccountScreen({ navigation }) {
  const logout = () => {
    auth.signOut();
  };
  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
  };
  return (
    <View style={styles.container}>
      <Text>More Screen</Text>
      <Btn text="Logout" style={styles.button} onPress={logout} />
      <Btn text="Logout" style={styles.button} onPress={getUser} />
    </View>
  );
}
export default AccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  button: {
    padding: 5,
    backgroundColor: 'blue',
  },
});
