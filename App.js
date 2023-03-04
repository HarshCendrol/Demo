import React from 'react'
import { Text, View } from 'react-native'
import Filters from './Filters'
import MyNewService from './MyNewService'

const App = () => {
  return (
    <View>
      <MyNewService/>
      {/* <GeoFencing/> */}
      <Filters/>
    </View>
  )
}

export default App