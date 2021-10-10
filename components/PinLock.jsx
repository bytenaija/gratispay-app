import React from "react"
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from "react-native"

const { width, height } = Dimensions
const PinLock = ({ value, setValue, title, clear }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../assets/images/pin-lock.jpeg")}
        style={{
          width: width,
          height: height,
          flex: 1,
        }}
      >
        <View style={styles.swipe}>
          <View styles={{ marginTop: 75 }}>
            <View>
              <Text style={styles.passCodeText}>{title}</Text>
            </View>
            <View style={styles.codeContainer}>
              <View
                style={{
                  ...styles.code,
                  backgroundColor:
                    value.length >= 1 ? "#FFFFFF" : "transparent",
                }}
              ></View>
              <View
                style={{
                  ...styles.code,
                  backgroundColor:
                    value.length >= 2 ? "#FFFFFF" : "transparent",
                }}
              ></View>
              <View
                style={{
                  ...styles.code,
                  backgroundColor:
                    value.length >= 3 ? "#FFFFFF" : "transparent",
                }}
              ></View>
              <View
                style={{
                  ...styles.code,
                  backgroundColor:
                    value.length >= 4 ? "#FFFFFF" : "transparent",
                }}
              ></View>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.numbersContainer}>
            <TouchableOpacity style={styles.number} onPress={() => setValue(1)}>
              <Text style={styles.numberText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => setValue(2)}>
              <Text style={styles.numberText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => setValue(3)}>
              <Text style={styles.numberText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => setValue(4)}>
              <Text style={styles.numberText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => setValue(5)}>
              <Text style={styles.numberText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => setValue(6)}>
              <Text style={styles.numberText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => setValue(7)}>
              <Text style={styles.numberText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => setValue(8)}>
              <Text style={styles.numberText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => setValue(9)}>
              <Text style={styles.numberText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => setValue(0)}>
              <Text style={styles.numberText}>0</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={clear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  passCodeText: {
    // fontFamily: "SFProDisplay-Regular",
    fontSize: 22,
    color: "blue",
    letterSpacing: 0.34,
    lineHeight: 25,
    marginBottom: 20,
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  swipe: {
    height: 173,
    alignItems: "center",
    justifyContent: "center",
  },
  code: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    margin: 20,
  },
  number: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },

  numbersContainer: {
    marginTop: 20,
    width: 282,
    height: 348,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  numberText: {
    fontSize: 36,
    color: "#FFFFFF",
    letterSpacing: 0,
    textAlign: "center",
  },
  buttons: {
    marginTop: 40,
    marginLeft: 46,
    marginRight: 46,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: -0.39,
  },
})
export default PinLock
