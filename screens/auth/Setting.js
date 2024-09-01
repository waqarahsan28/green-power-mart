import { View, Text } from 'react-native'
import React from 'react'
import DiscussS from './DiscussS'
const Setting = () => {
  return (
    <View>
          <DiscussS
              username="Sheraz Ahmad"
              time="4:00 PM"
              lastmessage="Hello there"
              notification="3"
          />
    </View>
  )
}

export default Setting