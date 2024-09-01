import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const apiKey = 'r4fjje6t5b29';
const userId = 'rend'; // Replace with actual user ID from your backend
const userToken = 'rend'; // Replace with actual token retrieved from your backend

const StreamTest = () => {
    const [client, setClient] = useState(null);

    useEffect(() => {
      const setupStreamChat = async () => {
        const chatClient = new Chat({ apiKey });
        await chatClient.setUser({ id: userId }, userToken);
        setClient(chatClient);
      };
  
      setupStreamChat();
    }, []);
  
    const startChat = async (recipientId) => {
      const channel = client.channel('messaging', { members: [userId, recipientId] });
      await channel.watch();
  
      // Navigate to the chat screen with the channel
      // Example: navigation.navigate('ChatScreen', { channel });
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Direct Messaging Example</Text>
        <Button
          title="Start Chat"
          onPress={() => startChat('recipient_user_id')}
        />
      </View>
    );
  };

export default StreamTest

const styles = StyleSheet.create({})