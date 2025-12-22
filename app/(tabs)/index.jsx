import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Platform, StatusBar, StyleSheet, TextInput, View } from "react-native";

const { width } = Dimensions.get("window");

export default function Index() {
   const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Auto play
useEffect(() => {
  const interval = setInterval(() => {
    const nextIndex = (index + 1) % DATA.length;

    flatListRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });

    setIndex(nextIndex);
  }, 3000);

  return () => clearInterval(interval);
}, [index]);


  const DATA = [
  { id: "1",title:'CPEURW Bottled', image: "https://api.buywaterh2o.com/1759140759282transparent-water-bottle-indoors.jpg" },
  { id: "2",title:'CPEURW Bottle', image: "https://api.buywaterh2o.com/1759139739507water30cl.png" },
  { id: "3",title:'CPEURW Dispenser', image: "https://api.buywaterh2o.com/1759140299544water-container.jpg" },
  // { id: "4", image: "https://api.buywaterh2o.com/1759139544274bottle500ml.avif" },
];

  const [searchQuery, setSearchQuery] = useState('');
    // Function to handle the text change and potentially filter data
  const handleSearch = (text) => {
    setSearchQuery(text);
    // You can add your data filtering logic here
    // For example, filter a list of items based on the 'text'
  };
  return (
     <View style={styles.safeArea}>
      <Image source={require('../../assets/images/logo.jpg')} style={{width:"100%",height:'40%'}} />
    <View style={{}}>
        <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      

     <FlatList
  ref={flatListRef}
  data={DATA}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item) => item.id}
  onMomentumScrollEnd={(e) => {
    const newIndex = Math.round(
      e.nativeEvent.contentOffset.x / width
    );
    setIndex(newIndex);
  }}
  getItemLayout={(data, index) => ({
    length: width, // width of one item
    offset: width * index,
    index,
  })}
  renderItem={({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {/* <Text style={{color:'1d4ed8'}}>{item.title}</Text> */}
    </View>
  )}
/>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {DATA.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  searchInput: {
    height: 50,
    borderColor: '#1d4ed8',
    backgroundColor:'white',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 16,
  },
   slide: {
    width,
    height: 220,
    padding: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#000",
  },
   safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
    // On Android, add status bar height to avoid overlap
  },
});
