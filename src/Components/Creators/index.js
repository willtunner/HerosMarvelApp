import React, { Component, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { css } from "../../styles/css";

class Creators extends Component {
  render() {
    const id = this.props.data.id;
    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;
    const name = this.props.data.fullName;

    //console.log("Page creators");
    // console.log(img);
    return (
      
        <TouchableOpacity
            style={{alignItems: 'center'}}
          onPress={() =>
            this.props.navigation.navigate("CreatorsPage", {
              data: this.props.data,
            })
          }
        >
          <Image
            source={{ uri: `${img}` }}
            style={styles.image}
            resizeMode="stretch"
          />
          <Text style={styles.titulo}>{name}</Text>
        </TouchableOpacity>
    );
  }
}

export default Creators;

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: 160,
    marginRight: 5,
    borderRadius: 100,
    marginBottom: 10
  },
  titulo:{
      fontWeight: 'bold',
      fontSize: 16,

  }
});
