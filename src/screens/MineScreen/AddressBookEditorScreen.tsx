import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList,TouchableOpacity ,Image, Button, Alert} from 'react-native';

interface Props{
    route: {
        params: {
          title:string,
          item:{
              name:string,
              avatar_url:any,
          };
        };
    };
}

function AddressBookEditorScreen(props: Props) {
    const {item} = props.route.params;
    const {title} = props.route.params;
    return(
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.typeText}>地址类型</Text>
            <TouchableOpacity onPress = {()=>{Alert.alert('123')}}>
                <View style = {styles.typeView}>
                    <Image style = {styles.typeImage} source = {item.avatar_url}></Image>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    },
    typeText:{
        marginTop:20,
        marginBottom:10,
        marginHorizontal:20,
        color:'#616D86',
        fontSize:13,
        fontWeight:'400',
    },
    typeView:{
        height:70,
        marginHorizontal:20,
        borderRadius:8,
        backgroundColor:'white',
    },
    typeImage:{
        marginLeft:20,
        marginVertical:20,
        width:40,
        height:40,
    }
});

export default AddressBookEditorScreen;