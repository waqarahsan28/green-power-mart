import React from 'react';
import { ChannelList } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';

const Sdiscuss1 = () => {
    const navigation = useNavigation();

    return (
        <ChannelList onSelect={(channel) => navigation.navigate('Sheraz', { id: channel.id })} />
    );
};

export default Sdiscuss1;