import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput,user } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
const Stack = createNativeStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mscreen from "./Mscreen";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
// import Sdisccuss from "./Sdisccuss";

const Mchat = () => {
	const [message, setMessage] = useState("");
	const [reply, setReply] = useState("");
	const [isLeft, setIsLeft] = useState();

	const swipeToReply = (message, isLeft) => {
		setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
		setIsLeft(isLeft);
	};

	const closeReply = () => {
		setReply("");
	};
	const navigation = useNavigation();

  return (
    <>
		  <View style={{
			  backgroundColor: '#B48CEF',
			  borderTopLeftRadius: 12,
			  borderTopRightRadius: 12,
		  }}>
			<SafeAreaView>
    <View style = { styles.container } >
				  <TouchableOpacity style={styles.backButton} onPress={() => {
					  navigation.goBack()
				  }}>
				  <FontAwesome name="arrow-left" size={23} color={"#fff"} />
			</TouchableOpacity>
			<View style={styles.profileOptions}>
				<TouchableOpacity style={styles.profile}>
					<Image style={styles.image} source={require("./../../assets/insta.jpg")} />
					<View style={styles.usernameAndOnlineStatus}>
						<Text style={styles.username}>Ayaz Ahmad</Text>
						<Text style={styles.onlineStatus}>online</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
		</SafeAreaView>
<View style={{
	height:25,
	backgroundColor:'#fff',
	borderTopLeftRadius:40,
	borderTopRightRadius:40,
}}>

</View>

</View>
		  <Mscreen onSwipeToReply={swipeToReply} />
	  
<View style ={styles.container1}>
		  {reply ? (
		  <View style={styles.replyContainer}>
			  <TouchableOpacity
			  onPress={closeReply}
				  style={styles.closeReply}
			  >
				  <Icon name="close" color="#000" size={20} />
			  </TouchableOpacity>
			  <Text style={styles.title}>
						  Response to {isLeft ? username : "Me"}
			  </Text>
			  <Text style={styles.reply}>{reply}</Text>
		  </View>
		  ) : null}
		  <View style={styles.innerContainer}>
			  <TouchableOpacity
				  style={styles.emoticonButton}
			  >
				  <Icon
					  name="plus-square"
					  size={32}
					  color={"#fff"}
				  />
			  </TouchableOpacity>
			  <View style={styles.inputAndMicrophone}>
				  <TextInput
					  multiline
					  placeholder={"Type something..."}
					  style={styles.input}
					  value={message}
					  onChangeText={(text) => setMessage(text)}
				  />
			  </View>
			  <TouchableOpacity style={styles.sendButton}>
				  <Icon
					  name="send"
					  size={28}
					  color={"#fff"}
				  />
			  </TouchableOpacity>
		  </View>
		  </View>
	  </>
  );
};

  

export default Mchat;

const styles = StyleSheet.create({
 container: {
    flexDirection: "row",
		backgroundColor: "#B48CEF",
          paddingTop: 16,
          paddingBottom: 10,
	},
          backButton: {
              alignSelf: "center",
       marginLeft:20,
	},
          profileOptions: {
              flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
	},
          profile: {
              flexDirection: "row",
          alignItems: "center",
          borderColor: "#fff",
          flex: 4,
	},
          image: {
              height: 40,
          width: 40,
          borderRadius: 32,
	},
          usernameAndOnlineStatus: {
              flexDirection: "column",
          justifyContent: "center",
          paddingHorizontal: 10,
	},
          username: {
              color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
	},
          onlineStatus: {
              color: "#fff",
          fontSize: 14,
	},
	// chat something
	container1: {
		justifyContent: "center",
		backgroundColor: "white",
	},
	replyContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	emoticonButton: {
		// justifyContent: "center",
		backgroundColor:'#B48CEF',
		marginLeft:10,
		paddingRight:5,
		paddingLeft:5,
		marginRight:5,
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius:10,
		

	},
	sendButton: {
		backgroundColor: "#B48CEF",
		marginLeft: 5,
		paddingRight:5,
		paddingLeft: 5,
		paddingTop:5,
		paddingBottom:5,
		marginRight:10,
		borderRadius: 10,
		// height: 40,
		// width: 30,
	},
	
	closeReply: {
		position: "absolute",
		right: 10,
		top: 5,
	},
	reply: {
		marginTop: 5,
	},
	innerContainer: {
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 10,
	},
	inputAndMicrophone: {
		flexDirection: "row",
		backgroundColor: "darkgray",
		flex: 3,
		borderRadius: 30,
		alignItems: "center",
	},
	input: {
		backgroundColor: "transparent",
		paddingLeft: 10,
		color: "#fff",
		flex: 3,
		fontSize: 15,
		height: 40,
		alignSelf: "center",
	},
});