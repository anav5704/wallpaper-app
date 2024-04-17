import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { wp, hp } from "../helpers/common"
import { theme } from "../constants/theme"
import { useRouter } from "expo-router"

const WelcomeScreen = () => {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Welcome Image */}
            <Image
                source={require("../assets/images/welcome-mobile.png")}
                style={styles.image}
                resizeMode="cover"
            />

            {/* White Gradient */}
            <Animated.View
                entering={FadeInDown.duration(600)}
                style={{ flex: 1 }}
            >
                <LinearGradient
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }}
                    colors={[
                        "rgba(225,225,225,0)",
                        "rgba(225,225,225,0.5)",
                        "rgba(225,225,225,1)",
                        "rgba(225,225,225,1)",
                    ]}
                />
                <View style={styles.content}>
                    <Animated.Text
                        entering={FadeInDown.delay(400).springify()}
                        style={styles.title}
                    >
                        Pixels
                    </Animated.Text>
                    <Animated.Text
                        entering={FadeInDown.delay(600).springify()}
                        style={styles.description}
                    >
                        Every Pixel Tells A Story
                    </Animated.Text>
                    <Animated.View entering={FadeInDown.delay(800).springify()}>
                        <Pressable
                            onPress={() => router.push("home")}
                            style={styles.button}
                        >
                            <Text style={styles.label}>Start Exploring</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    image: {
        width: wp(100),
        height: hp(100),
        position: "absolute",
    },

    gradient: {
        position: "absolute",
        width: wp(100),
        height: hp(65),
        bottom: 0,
    },

    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 14,
    },

    title: {
        fontSize: hp(5),
        color: theme.colors.neutral(0.9),
        fontWeight: theme.fontWeights.bold
    },

    description: {
        fontSize: hp(2),
        marginBottom: 20,
        fontWeight: theme.fontWeights.medium
    },

    button: {
        backgroundColor: theme.colors.neutral(0.9),
        marginBottom: 50,
        padding: 15,
        paddingHorizontal: 50,
        borderRadius: theme.radius.xl

    },

    label: {
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.white,
    }
})

export default WelcomeScreen
