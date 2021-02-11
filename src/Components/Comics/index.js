import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

class Comics extends Component {
  render() {
    const id = this.props.data.id;
    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`

    return (
      <View>
          <Text>{id}</Text>
          <Image source={{uri:`${img}`}} style={{height: 250, width: 125, marginRight: 10}}/>
      </View>
    );
  }
}

export default Comics;
