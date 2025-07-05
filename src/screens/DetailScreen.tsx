import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/navigation'
import Header from '../components/Header'

const DetailScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken')
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });

    }
    return (
        <SafeAreaView>
            <Header />
            <Button title="Logout" onPress={handleLogout} />
        </SafeAreaView>
    )
}

export default DetailScreen

const styles = StyleSheet.create({})