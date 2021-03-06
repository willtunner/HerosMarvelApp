import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

class ShowHeros extends Component{

    render(){
        return(
            <View style={{flex:1, flexDirection:'row', padding: 10, alignContent:'center', alignItems: 'center', borderBottomColor: 'red', borderBottomWidth: 2}}>
                <Image source={{uri:`${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`}} style={{width: 60,height: 60, borderRadius: 50, marginBottom: 10, marginTop: 10}} />
                <Text  style={{marginLeft: 30, fontSize: 20}}>{this.props.data.name}</Text>
            </View>
        )
    }
}

export default ShowHeros;