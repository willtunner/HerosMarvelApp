import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";

class Persons extends Component {
  render() {
    const id = this.props.data.id;
    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;
    return (
      <View>
       <Image
            source={{ uri: `${img}` }}
            style={{ height: 250, width: 160, marginRight: 10 }}
            resizeMode="stretch"
          />
      </View>
    );
  }
}

export default Persons;
