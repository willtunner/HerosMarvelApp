import React, { Component, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";

class Comics extends Component {
  render() {
    const id = this.props.data.id;
    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;



    return (
      <View>
        <TouchableOpacity>
          <Text>{id}</Text>
          <Image
            source={{ uri: `${img}` }}
            style={{ height: 250, width: 160, marginRight: 10 }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

      </View>
    );
  }
}

export default Comics;
