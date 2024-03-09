import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

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
  return (
    <SafeAreaView>
      <View>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>
        <Pressable>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            src={{ uri: "https://picsum.photos/id/69/200/300" }}
          />
        </Pressable>
      </View>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

//ENABLE LOCATION IN APP
//Check if location is enabled on mobile device
//Get lat & long of current location
//Reverse Geofencing to uncover the exact location
