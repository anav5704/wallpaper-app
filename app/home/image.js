import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'
import { Entypo, Octicons } from '@expo/vector-icons'
import * as FileSystem from "expo-file-system"
import { theme } from '../../constants/theme'
import { wp } from '../../helpers/common'
import * as Sharing from 'expo-sharing';
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'

const ImageModal = () => {
    const router = useRouter()
    const image = useLocalSearchParams()
    const fileName = image.previewURL.split("/").pop()
    const filePath = `${FileSystem.documentDirectory}/${fileName}`

    const aspectRatio = image.imageWidth / image.imageHeight
    const height = wp(80) / aspectRatio
    let width = wp(80)

    if (aspectRatio < 1) {
        width = height * aspectRatio
    }

    const handleDownload = async () => {
        await FileSystem.downloadAsync(image.webformatURL, filePath)
    }

    const handleShare = async () => {
        const { uri } = await FileSystem.downloadAsync(image.webformatURL, filePath)
        if (uri) {
            await Sharing.shareAsync(uri)
        }
    }

    return (
        <BlurView
            tint="dark"
            intensity={60}
            style={styles.container}
        >
            <View>
                <Image
                    transition={100}
                    style={[styles.image, { height, width }]}
                    source={image.webformatURL}
                />
            </View>

            {/* Actions */}
            <View style={styles.buttons}>
                <Animated.View entering={FadeInDown.springify().delay(100)}>
                    <Pressable onPress={() => router.back()} style={styles.button}>
                        <Octicons name='x' size={24} color="#fff" />
                    </Pressable>
                </Animated.View>
                <Animated.View entering={FadeInDown.springify().delay(200)}>
                    <Pressable onPress={handleDownload} style={styles.button}>
                        <Octicons name='download' size={24} color="#fff" />
                    </Pressable>
                </Animated.View>
                <Animated.View entering={FadeInDown.springify().delay(300)}>
                    <Pressable onPress={handleShare} style={styles.button}>
                        <Entypo name='share' size={24} color="#fff" />
                    </Pressable>
                </Animated.View>
            </View>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp(4),
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    
    },

    image: {
        borderRadius: theme.radius.lg,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    buttons: {
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
        gap: 40
    },

    button: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderCurve: "continuous",
        borderRadius: theme.radius.lg,
        backgroundColor: "rgba(225, 225, 255, 0.2)"
    }
})

export default ImageModal