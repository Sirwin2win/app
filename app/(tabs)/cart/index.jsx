import { Image } from 'expo-image'
import { useEffect } from 'react'
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decreaseQuantity, increaseQuantity, loadCart, removeFromCart } from '../../../features/cart/cartSlice'



const index = () => {
    const dispatch = useDispatch()
    const {width, height} = useWindowDimensions()
    const {items,status, totalQuantity,totalAmount} = useSelector((state)=> state.cart)

    const isTablet = width >576
   
    useEffect(()=>{
      if(status==='idle'){
        dispatch(loadCart())
      }
    },[])
    if(!items){
      return <Text>No Items in the cart</Text>
    }
  return (
    <View>
       <FlatList 
       style={{marginTop:'20', marginBottom:20}}
            data={items} 
            keyExtractor={(item) => item.id}
            renderItem={({item})=>
              <View style={styles.container}>
                <Image style={{height:undefined,width:isTablet?'45%':'30%'}}  source={{uri:`https://api.buywaterh2o.com/${item.image}`}}  />
                <View >
                <Text style={{fontWeight:900, fontSize:isTablet?20:15, marginBottom:isTablet?20:5}}>{item.title}</Text>
                  <Text>₦{item.price}</Text>
                  <View style={styles.plusMinusCon}>
                  <Pressable onPress={()=>dispatch(increaseQuantity(item.id))}>
                    <Text style={{
                      fontSize:20,
                      // backgroundColor:'#1d4ed8',
                      width:50,
                      textAlign:'center',
                      // color:'white',
                      marginTop: isTablet?'15%':'5%',
                      padding:isTablet?'10%':'5%',
                      // borderRadius:10
                  }}>+</Text></Pressable>
                  <Text style={{
                    marginTop: isTablet?'20%':'5%',
                    padding:isTablet?'10%':'5%',
                    fontSize:20,
                  }}>{item.quantity}</Text>
                  <Pressable onPress={()=>dispatch(decreaseQuantity(item.id))}>
                    <Text style={{
                      fontSize:20,
                      // backgroundColor:'#1d4ed8',
                      width:50,
                      textAlign:'center',
                      // color:'white',
                      marginTop: isTablet?'20%':'10%',
                      padding:isTablet?'10%':'5%',
                      // borderRadius:10
                    }}>-</Text>
                    </Pressable>
                  </View>
                  <Pressable onPress={()=>dispatch(removeFromCart(item.id))}>
                    <Text style={{color:'red'}}>Remove Item</Text>
                  </Pressable>
                </View>   
              </View>
            } />
       
            <Text style={{textAlign:'center',fontWeight:900, fontSize:isTablet?20:15}}>Total Amount: ₦{totalAmount}</Text>
           
       
                 <Pressable
      onPress={()=>dispatch(clearCart())}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : styles.buttonNormal,
      ]}
    >
      <Text style={styles.buttonText}>Clear Cart</Text>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:2,
    flexDirection:'row',
    justifyContent:'space-around',
    margin:15,
    padding:15
  },
plusMinusCon:{
  flex:2,
  flexDirection:'row',
  justifyContent:'space-around'
},

  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonNormal: {
    backgroundColor: '#007bff', // Normal background color
  },
  buttonPressed: {
    backgroundColor: '#0056b3', // Darker background when pressed
    opacity: 0.8, // Slightly reduced opacity when pressed
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default index