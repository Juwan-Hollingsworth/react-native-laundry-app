import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import Carousel from "../components/Carousel";
import pfp from "../assets/juwan.jpg";
import Services from "../components/Services";
import DressItem from "../components/DressItem";

const HomeScreen = () => {
  //Check if location is enabled on mobile device
  //useEffect fx will run once the Home Screen is loaded or every time the state is updated
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "We are loading your location"
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    // fx to check if location services are enabled
    checkIfLocationEnabled();
    // fx to get the current location
    getCurrentLocation();
  }, []);
  // Check if location services are enabled
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    // Display an alert if location services are not enabled
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      // Set the state variable to indicate that location services are enabled
      setLocationServicesEnabled(enabled);
    }
  };
  //async function to get current location
  const getCurrentLocation = async () => {
    // Request permission from the user to access location in the foreground
    let { status } = await Location.requestForegroundPermissionsAsync();
    // Check if the permission status is not granted
    if (status != "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    //get langitude and longitude of user
    const { coords } = await Location.getCurrentPositionAsync();

    // if coordinates are available
    if (coords) {
      // destructure lat & long
      const { latitude, longitude } = coords;
      //get  reverse geocode response
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      //log coords
      console.log(coords);
      console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };
  const products = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];
  return (
    <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}>
      {/* Location & Profile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          justifyContent: "space-between",
          paddingTop: 40,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
        </View>
        <Pressable>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            source={pfp}
          />
        </Pressable>
      </View>

      {/* search bar  */}
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#C0C0C0",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="search for items or more" />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>

      {/* image Carousel */}
      <Carousel />

      {/* Services Component */}
      <Services />
      {/* render all products */}
      {products.map((item, index) => (
        <DressItem item={item} key={index} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

//ENABLE LOCATION IN APP
//Check if location is enabled on mobile device
//Get lat & long of current location
//Reverse Geofencing to uncover the exact location
