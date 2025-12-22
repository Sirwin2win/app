import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/products/productSlice';




const index = () => {
  const {items, status, error} = useSelector(state=> state.products)
  const searchItem = useSelector(state=>state.filter.searchItem)

  const dispatch = useDispatch()
  const {width, height} = useWindowDimensions()
  const router = useRouter();
  const isTablet = width >576
  useEffect(()=>{
    if(status==='idle'){
      dispatch(fetchProducts())
    }
  },[status,dispatch])
  if(status==='loading'){
    return <ActivityIndicator size="large" color='#1d4ed8' />
  }
  return (
   
    <FlatList
      data={items}
      style={{marginTop:'20', marginBottom:20}}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>router.push(`/products/${item.id}`)}>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{height:isTablet?300:200, width:isTablet?'70%':'50%'}} source={{uri:`https://api.buywaterh2o.com/${item.image}`}}  />
          {/* <Image style={{height:isTablet?'90%':'80%',width:isTablet?'70%':'60%'}}  source={{uri:`https://api.buywaterh2o.com/${item.image}`}}  /> */}
          <Text style={{fontWeight:'bold', fontSize:15, marginTop:5}}>{item.title}</Text>
            <Text style={{marginTop:5, marginBottom:20}}>₦{item.price}</Text>
        </View>
        </TouchableOpacity>
        )}
    />
  );
}

export default index