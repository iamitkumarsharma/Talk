import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialHeader1(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textWrapperStackRow}>
        <View style={styles.textWrapperStack}>
          <View style={styles.textWrapper}></View>
          <Text style={styles.talk}>TALK</Text>
        </View>
        <EntypoIcon name="paper-plane" style={styles.icon}></EntypoIcon>
      </View>
      <View style={styles.textWrapperStackRowFiller}></View>
      <TouchableOpacity style={styles.rightIconButton}>
        <MaterialCommunityIconsIcon
          name="dots-vertical"
          style={styles.rightIcon}
        ></MaterialCommunityIconsIcon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    justifyContent: "space-between",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3
  },
  textWrapper: {
    position: "absolute",
    left: 19,
    top: 12
  },
  talk: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "akronim-regular",
    color: "rgba(249,247,247,1)",
    fontSize: 30
  },
  textWrapperStack: {
    width: 61,
    height: 42,
    marginLeft: 47
  },
  icon: {
    color: "rgba(161,245,20,1)",
    fontSize: 40,
    marginLeft: -108
  },
  textWrapperStackRow: {
    height: 44,
    flexDirection: "row",
    marginLeft: 6,
    marginTop: 7
  },
  textWrapperStackRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rightIconButton: {
    padding: 11,
    alignItems: "center",
    marginRight: 5,
    marginTop: 5
  },
  rightIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24
  }
});

export default MaterialHeader1;
