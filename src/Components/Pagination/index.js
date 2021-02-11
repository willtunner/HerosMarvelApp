import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import ArrowL from '../../../assets/ArrowL.png';
import ArrowR from '../../../assets/ArrowR.png';

class Pagination extends Component{

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image source={ArrowL} style={styles.arrows}/>
                </TouchableOpacity>
                
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.rounded}><Text style={styles.pagination2}>1</Text></TouchableOpacity>    
                    <TouchableOpacity style={styles.rounded2}><Text style={styles.pagination}>2</Text></TouchableOpacity>    
                    <TouchableOpacity style={styles.rounded2}><Text style={styles.pagination}>3</Text></TouchableOpacity> 
                </View> 

                <TouchableOpacity>
                    <Image source={ArrowR} style={styles.arrows}/>
                </TouchableOpacity>   
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        flexDirection: 'row', 
        alignItems:'center', 
        justifyContent: 'space-between'
    },
    arrows: {
        height: 35, 
        width: 35
    },
    pagination: {
        fontSize: 25,
        color: '#d32024'
    },
    pagination2: {
        fontSize: 25,
        color: '#FFF'
    },
    rounded: {
        backgroundColor: '#d32024',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 10,
    },
    rounded2: {
        borderWidth: 1,
        borderColor: '#d32024',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 10,
    }
})

export default Pagination;