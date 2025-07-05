import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../api/axiosInstance';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation';
import Container from '../components/Container';
import { HEIGHT, WIDTH } from '../const/deviceInfo';
import { IMG } from '../assets/Image/img';
import LinearGradient from 'react-native-linear-gradient';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const formik = useFormik({
        initialValues: { email: 'raj@yopmail.com', password: '123456' },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const payload = {
                    recipient: values.email,
                    action: 'login',
                    verification_type: 'password',
                    authentication_type: 'email',
                    credential: values.password,
                    new_password: '',
                };

                const response = await axiosInstance.post('/customer/api/v1/customers/auth/verify', payload);

                if (response.data.token) {
                    // Save token to AsyncStorage
                    await AsyncStorage.setItem('userToken', response.data.token);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DetailScreen' }],
                    });
                } else {
                    Alert.alert('Login failed', response.data.message || 'Unknown error');
                }
            } catch (error: any) {
                console.log('error', JSON.stringify(error, null, 2))
                Alert.alert('Error', error.response?.data?.message || error.message || 'Something went wrong');
            }
        },
    });

    return (

        <View style={{ flex: 1 }}>
            <ImageBackground
                source={IMG.logo}
                resizeMethod='none'
                style={{ width: WIDTH, height: 500, justifyContent: 'flex-end', alignItems: 'center' }}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,1)']}
                    style={{
                        flex: 0.5,
                        width: WIDTH,
                        justifyContent: 'flex-end', alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            // backgroundColor: 'red',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={IMG.dentalIcon}
                            resizeMode="center"
                            style={{ width: 250, height: 100 }}
                        />
                    </View>
                </LinearGradient>

            </ImageBackground>

            {/* Uncomment and style form container as needed */}

            <Container
                style={{ backgroundColor: 'white' }}
            >
                <View style={{ justifyContent: 'center', paddingHorizontal: 20 }}>
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 4,
                            paddingHorizontal: 10,
                            paddingVertical: 12,
                            marginBottom: 10,
                        }}
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.email}</Text>
                    )}

                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 4,
                            paddingHorizontal: 10,
                            paddingVertical: 12,
                            marginBottom: 10,
                        }}
                        onChangeText={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.password}</Text>
                    )}

                    <Button title="Login" onPress={() => formik.handleSubmit()} />
                </View>
            </Container>

        </View>
    );
}

const styles = StyleSheet.create({

});