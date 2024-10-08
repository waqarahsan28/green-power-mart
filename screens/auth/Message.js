import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Alert, } from "react-native";
import {
    Directions,
    State,
} from "react-native-gesture-handler";
import Animated, {
    withSpring,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    useSharedValue
} from "react-native-reanimated";

const Message = ({ time, isLeft, message, onSwipe }) => {
    const startingPosition = 0;
    const x = useSharedValue(startingPosition);

    const isOnLeft = (type) => {
        if (isLeft && type === "messageContainer") {
            return {
                alignSelf: "flex-start",
                backgroundColor: "#f0f0f0",
                borderTopLeftRadius: 0,
            };
        } else if (isLeft && type === "message") {
            return {
                color: "#000",
            };
        } else if (isLeft && type === "time"){
            return {
                color: "darkgray",
            };
        } else {
            return {
                borderTopRightRadius: 0,
            };
        }
    };

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {

        },
        onActive: (event, ctx) => {
            x.value = isLeft ? 50 : -50;
        },
        onEnd: (event, ctx) => {
            x.value = withSpring(startingPosition);
        }
    });

    const uas = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: x.value }]
        }
    });

    return (
        <View
            direction={isLeft ? Directions.RIGHT : Directions.LEFT}
            onGestureEvent={eventHandler}
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                    onSwipe(message, isLeft);
                }
            }}
        >
            <Animated.View style={[styles.container, uas]}>
                <View
                    style={[
                        styles.messageContainer,
                        isOnLeft("messageContainer"),
                    ]}
                >
                    <View style={styles.messageView}>
                        <Text style={[styles.message, isOnLeft("message")]}>
                            {message}
                        </Text>
                    </View>
                    <View style={styles.timeView}>
                        <Text style={[styles.time, isOnLeft("time")]}>
                            {time}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginVertical: 5,
    },
    messageContainer: {
        backgroundColor: "#B48CEF",
        maxWidth: "80%",
        alignSelf: "flex-end",
        flexDirection: "row",
        borderRadius: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10,
    },
    messageView: {
        backgroundColor: "transparent",
        maxWidth: "80%",
    },
    timeView: {
        backgroundColor: "transparent",
        justifyContent: "flex-end",
        paddingLeft: 10,
    },
    message: {
        color: "white",
        alignSelf: "flex-start",
        fontSize: 15,
    },
    time: {
        color: "lightgray",
        alignSelf: "flex-end",
        fontSize: 10,
    },
});

export default Message;