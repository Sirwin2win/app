import { Image } from "expo-image";
import {
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default function Index() {
  return (
    <ScrollView
      style={styles.safeArea}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Banner */}
      <Image
        source={require("../../assets/images/DD.jpg")}
        style={styles.banner}
      />

      {/* Product Images Row */}
      <View style={styles.row}>
        <Image source={require("../../assets/images/B2.jpg")} style={styles.smallImage} />
        <Image source={require("../../assets/images/D1.jpg")} style={styles.smallImage} />
        <Image source={require("../../assets/images/Bag.jpg")} style={styles.largeImage} />
        <Image source={require("../../assets/images/B1.jpg")} style={styles.largeImage} />
      </View>

      {/* Text + Image Section */}
      <View style={styles.bottomRow}>
        <View style={styles.textBox}>
          <Text style={styles.title}>CPEURW</Text>
          <Text style={styles.text}>Your Trusted Partner in Pure Hydration.</Text>
          <Text style={styles.text}>
            From sachets to bottles to dispensers, we offer clean, affordable,
            and certified drinking water.
          </Text>
        </View>

        <Image
          source={require("../../assets/images/W.jpg")}
          style={styles.sideImage}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  banner: {
    width: "100%",
    height: isTablet ? 350 : 240,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 10,
  },

  smallImage: {
    width: width * 0.18,
    height: isTablet ? 120 : 90,
    resizeMode: "contain",
  },

  largeImage: {
    width: width * 0.18,
    height: isTablet ? 160 : 120,
    resizeMode: "contain",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 16,
  },

  textBox: {
    width: "45%",
  },

  title: {
    textAlign: "center",
    fontSize: isTablet ? 18 : 16,
    fontWeight: "900",
    color: "#1d4ed8",
  },

  text: {
    textAlign: "center",
    color: "#1d4ed8",
    marginTop: 6,
    fontSize: isTablet ? 15 : 13,
  },

  sideImage: {
    width: "50%",
    height: isTablet ? 220 : 160,
    resizeMode: "contain",
  },
});
