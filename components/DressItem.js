import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const DressItem = (item) => {
  return (
    <View>
      <View>
        <Image source={{ uri: item.image }} />
      </View>
      <View></View>
      <Pressable></Pressable>
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({});
