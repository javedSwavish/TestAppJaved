import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailScreen from './src/screens/DetailScreen';
import LoginScreen from './src/screens/LoginScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function RootStack() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        setUserToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={userToken ? 'DetailScreen' : 'LoginScreen'}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}