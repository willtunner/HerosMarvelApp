import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";

export default function HeroPage({ route, navigation }) {
  const id = route.params.id;
  const nome = route.params.nome;
  const imagem = route.params.imagem;
  const desc = route.params.descricao;

  return (
    <View style={{ marginTop: 10 }}>
      {/* //todo: imagem do hero */}
      <View>
        <Image
          source={{
            uri: `${imagem}`,
          }}
          style={{
            width: "100%",
            height: 150,
            marginBottom: 1,
            marginTop: 10,
          }}
        />
      </View>

      {/* //todo: Nome do hero */}
      <View
        style={{
          backgroundColor: "#d32024",
          height: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 20 }}>{nome}</Text>
      </View>

      {/* //todo: Descrição do hero */}
      <View style={{alignItems: 'center', marginTop: 10}}>
        <View style={{ backgroundColor: "#173F5F", width: "95%", borderRadius: 15, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: '#FFF', textAlign: 'justify'}}>{ !desc ? 'Não existe descrição' : desc}</Text>
        </View>
      </View>

      <Button
        title="Voltar"
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </View>
  );
}

//this.props.navigation.state.params.resultado
