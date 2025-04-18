import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';

const LoginScreen = () => {
  const [ email, setEmail ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ password, setPassword ] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser){
        setLoading(false);
      }
      if(authUser){
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  },[])


  const login = () => {
    signInWithEmailAndPassword(auth,email, password).then((userCredential) => {
      console.log("user credential",userCredential);
      const user = userCredential.user;
      console.log("user detaiulks,user");
    });
  } 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", padding: 10 }}>
      {loading ? (
        <View style={{alignItems:"center", justifyContent:"center", flexDirection:"row",flex:1}}>
          <Text style={{marginRight:10}}>Loading</Text>
          <ActivityIndicator size="large" color={"red"}/>
        </View>
      ): (
        <KeyboardAvoidingView>
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
          <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Sign In</Text>

          <Text style={{ fontSize: 18, fontWeight: 600 }}>Sign In to your account</Text>
        </View>

        <View style={{ marginTop: 50 }}>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="email-outline" size={24} color="black" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 10,
                marginLeft: 13
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Octicons name="key" size={24} color="black" />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor="black"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 20,
                marginLeft: 13
              }}
            />
          </View>

          <Pressable
          onPress={login}
            style={{
              width: 200,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>Login</Text>
          </Pressable>


          <Pressable  onPress={() => navigation.navigate("Register")}
           style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 17, color: "gray", fontWeight: 500 }}>Dont have a account ? Sign Up!</Text>
          </Pressable>

        </View>
      </KeyboardAvoidingView>
      )}
      
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})

