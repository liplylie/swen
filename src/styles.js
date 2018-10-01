import { StyleSheet, PixelRatio, Dimensions, Platform } from "react-native";

const { height, width, scale } = Dimensions.get("window");

export const HEIGHT = height;
export const WIDTH = width;
export const IOS = Platform.OS === "ios";

export const Convert = dp => {
    if (width <= 350) {
        return dp * 0.8;
    }
    return dp * 0.93;
};