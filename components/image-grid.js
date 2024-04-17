import { View, StyleSheet, Pressable } from 'react-native'
import { MasonryFlashList } from "@shopify/flash-list";
import { wp } from "../helpers/common"
import { Image } from "expo-image"
import { theme } from '../constants/theme';

const ImageGrid = ({ images }) => {
    return (
        <View style={styles.container}>
            <MasonryFlashList
                data={images}
                numColumns={2}
                estimatedItemSize={200}
                initialNumToRender={100}
                contentContainerStyle={styles.content}
                renderItem={({ item, index }) => <ImageCard image={item} index={index} />}
            />
        </View>
    )
}

const ImageCard = ({ image, index }) => {
    const getImageHeight = () => {
        let { imageHeight: height, imageWidth: width } = image

        if (width > height) {
            return { height: 250 }
        }
        else if (height > width) {
            return { height: 300 }
        }
        else {
            return { height: 200 }
        }
    }

    return (
        <Pressable style={[styles.imageWrapper, index % 2 == 0 ? styles.spacingRight : styles.spacingLeft]}>
            <Image
                transition={100}
                style={[styles.image, getImageHeight()]}
                source={image?.webformatURL}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        marginTop: 15,
    },

    content: {
        paddingHorizontal: wp(4)
    },

    imageWrapper: {
        borderStartColor: theme.colors.gray,
        borderRadius: theme.radius.xl,
        borderCurve: "continuous",
        overflow: "hidden",
        marginBottom: wp(4)
    },

    spacingRight: {
        marginRight: wp(2)
    },

    spacingLeft: {
        marginLeft: wp(2)
    },

    image: {
        height: 300,
        width: "100%"
    }
})

export default ImageGrid