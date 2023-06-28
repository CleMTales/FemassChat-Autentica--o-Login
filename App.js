import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackView } from '@react-navigation/native-stack';
import CadastrarUsuario from './src/components/CadastrarUsuario';
import ListaUsuarios from './src/components/ListaUsuarios';
import Conversa from './src/components/Conversa';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    

    <NavigationContainer style={styles.container}>
      
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          title: null,
        }}>
        <Stack.Screen
          name="Login" component={Login} />
        <Stack.Screen
          name="Cadastro de Usuário" component={CadastrarUsuario} />
        <Stack.Screen
          name = "Lista de Usuários" component={ListaUsuarios} options= {{headerTransparent : true}}/>
        <Stack.Screen
          name = "Conversa" component = {Conversa} />
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
