import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";

class Persons extends Component {
  render() {
    const id = this.props.data.id;
    const name = this.props.data.name;
    const desc = this.props.data.description;
    const data = this.props.data;
    
    // console.log("Data");
    // console.log(data);

    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;
    return (
      <TouchableOpacity onPress={() =>
        this.props.navigation.navigate("HeroPage", {
          id: id,
          nome: name,
          imagem: img,
          descricao: desc,
        })
      }>
        <View style={{backgroundColor: "#fff", alignItems: 'center', width: 180, height: 280, justifyContent: 'center'}}>
          <Image
            source={{ uri: `${img}` }}
            style={{ height: 250, width: 160,marginTop: 5, borderRadius: 15 }}
            resizeMode="stretch"
          />
          <Text>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Persons;
