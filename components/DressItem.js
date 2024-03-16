import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

// destructure item
const DressItem = ({ item }) => {
  return (
    <View>
      {/* //create a container for each item  */}
      <Pressable
        style={{
          backgroundColor: "#f8f8f8",
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 14,
        }}
      >
        {/* //display image  */}
        <View>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: item.image }}
          />
        </View>
        {/* Display text  */}
        <View>
          <Text>{item.name}</Text>
          <Text>${item.price}</Text>
        </View>
        {/* display pressable button */}
        <Pressable style={{ width: 80 }}>
          <Text
            style={{
              borderColor: "gray",
              borderWidth: 0.8,
              marginVertical: 10,
              color: "#088f8f",
              textAlign: "center",
              padding: 5,
            }}
          >
            Add
          </Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({});
