import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { OverlayProvider, useChatContext } from 'stream-chat-expo';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo';

const Sdiscuss2 = () => {
    const [channel, setChannel] = useState(null);
    const { client } = useChatContext();
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const fetchChannel = async () => {
            const channels = await client.queryChannels({ id: { $eq: id } });
            setChannel(channels[0]);
        };

        fetchChannel();
    }, [id]);

    if (!channel) {
        return <ActivityIndicator />;
    }
    
    return (
        <OverlayProvider>
        <Channel channel={channel}>
            <MessageList />
            <MessageInput />
        </Channel>
        </OverlayProvider>
    );
};

export default Sdiscuss2;