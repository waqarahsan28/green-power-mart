import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Checkbox = ({ label, onChange }) => {
    const [isChecked, setIsChecked] = useState(false); // Initialize as unchecked

    const handlePress = () => {
        const newValue = !isChecked; // Invert the value
        setIsChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                    style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderColor: isChecked ? 'white' : 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 8,
                    }}>
                    {isChecked && <View style={{ backgroundColor: 'white', width: 10, height: 10 }} />}
                </View>
                <Text>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Checkbox;