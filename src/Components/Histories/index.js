import React, { Component, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import NoImage from '../../../assets/no_image.png';

class Histories extends Component {
  render() {
    const id = this.props.data.id;
    const thumb = this.props.data.thumbnail;
    // const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;

    console.log('teste thumb');
    console.log(thumb);

    //  {!desc ? "Não existe descrição" : desc}

    return (
      <View>
        <TouchableOpacity onPress={() => alert(id)}>
          <Image
            source={NoImage}
            style={{ height: 250, width: 160, marginRight: 10 }}
            resizeMode="stretch"
          />

          <Text style={{color: '#fff'}}>{`ID: ${id} -`}</Text>
        </TouchableOpacity>

        <View>
          

        </View>
      </View>
    );
  }
}

export default Histories;
