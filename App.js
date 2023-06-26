import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastrarUsuario from './src/components/CadastrarUsuario';
import ListaUsuarios from './src/components/ListaUsuarios';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    

    <NavigationContainer style={styles.container}>
      
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          title: '',
        }}>
        <Stack.Screen
          name="Login" component={Login} />
        <Stack.Screen
          name="Cadastro de Usuário" component={CadastrarUsuario} />
        <Stack.Screen
          name = "Lista de Usuários" component={ListaUsuarios} screenOptions= {{headerTransparent : false}}/>
        
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
