import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function Skeleton({ visible, children }) {
    console.log('##########   LOADING SKELETON  ##########')
    console.log(visible);
  //* Define o valor inicial animado
  const AnimatedValue = new Animated.Value(0);

  //* para chamar quando montar na tela
  useEffect(() => {
    circleAnimated();

    return () => circleAnimated();
  }, []);

  //* Cria Efeito de animação1
  const circleAnimated = () => {
    AnimatedValue.setValue(0);
    Animated.timing(AnimatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      //* Função para executar de 1 em 1 segundo loop infinite
      setTimeout(() => {
        circleAnimated();
      }, 1000);
    });
  };

  //* Cria estado inicial da animação 1
  const translateX1 = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 100],
  });

  //* Cria estado inicial da animação 2
  const translateX2 = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 300],
  });

  if (visible) {
    return (
      <View style={styles.touchOp}>
        {/* //? skeleton image */}
        <View style={styles.image}>
          <Animated.View
            style={{
              width: "30%",
              height: "100%",
              //opacity: 0.5,
              backgroundColor: "#C6C6C6",
              transform: [{ translateX: translateX1 }],
            }}
          ></Animated.View>
        </View>
        {/* //? skeleton text */}
        <View style={styles.text}>
          <Animated.View
            style={{
              width: "40%",
              height: "100%",
              opacity: 0.5,
              backgroundColor: "#c6c6c6",
              transform: [{ translateX: translateX2 }],
            }}
          ></Animated.View>
        </View>
      </View>
    );
  }else{
    return <>{children}</>;
  }

  
}

const styles = StyleSheet.create({
  touchOp: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#AAAAAA",
    // ? Faz aparecer a view em camada dentro de outra view evitando que vaze para fora
    overflow: "hidden",
  },
  text: {
    marginLeft: 30,
    height: 30,
    width: "60%",
    backgroundColor: "#AAAAAA",
    overflow: "hidden",
  },
});
