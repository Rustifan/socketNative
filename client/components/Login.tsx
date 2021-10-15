import React from "react"
import { Button, View, Image, Dimensions, StyleSheet, Text } from "react-native"
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type RootStackParamList = {
    Login: undefined,
    GeoLocation: undefined,
    GoogleMap: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, "Login">


const Login: React.FC<Props> = ({navigation})=>{
    
    const {width, height} = Dimensions.get("window");
    
    return(
        <View style={{flex: 1, backgroundColor: "white", justifyContent: "flex-end"}}>
            <View style={StyleSheet.absoluteFill}>
                <Image style={{flex: 1}} source={require("../assets/prvic.jpg")}/>
            </View>
            <View style={{height: height/3}}>
                <View style={styles.button}>
                    <Text style={{fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
                </View>
                <View style={{...styles.button, backgroundColor: "blue", marginVertical: 20}}>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "white" }}>REGISTER</Text>
                </View>
            </View>
          
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8
    }
})