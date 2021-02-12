import React, { Component, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

class Comics extends Component {
  render() {
    const id = this.props.data.id;
    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;
    //  {!desc ? "Não existe descrição" : desc}
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("ComicPage", {
              data: this.props.data,
            })}>
          <Image
            source={{ uri: `${img}` }}
            style={{ height: 250, width: 160, marginRight: 10 }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <View>
          

        </View>
      </View>
    );
  }
}

export default Comics;
