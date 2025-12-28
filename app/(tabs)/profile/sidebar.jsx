import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrder } from '../../../features/orders/orderSlice'


const sidebar = () => {
  
   const user = useSelector((state)=>state.auth.user)
  const {order, orders} = useSelector(state=>state.orders)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(user.id){
      dispatch(fetchOrder(user.id))
    }
  },[dispatch,user.id])
  return (
    <View>
        <Text>Orders</Text>
        {order.map(v=>(
          <View key={v.id}>
            <Text>{v.order_ref}</Text>
          </View>
        ))}
    </View>
  )
}

export default sidebar

const styles = StyleSheet.create({})