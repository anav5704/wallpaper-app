import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Pressable, StyleSheet } from 'react-native'
import { theme } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native'
import { hp } from '../../helpers/common';
import { ScrollView, TextInput } from 'react-native';
import { useRef } from 'react';

const HomeScreen = () => {
    const { top } = useSafeAreaInsets()
    const searchRef = useRef()
    const paddingTop = top > 0 ? top + 10 : 30

    return (
        <View style={[styles.container, { paddingTop }]}>

            {/* Header */}
            <View style={styles.header}>
                <Pressable>
                    <Text style={styles.title}>
                        Pixels
                    </Text>
                </Pressable>
                <Pressable style={styles.title}>
                    <SimpleLineIcons
                        size={24}
                        name="menu"
                        color={theme.colors.neutral(0.9)}
                    />
                </Pressable>
            </View>

            <ScrollView style={{ gap: 15 }}>
                <View style={styles.search}>
                    {/* Search Bar */}
                    <TextInput
                        placeholder='Search Wallpaper'
                        style={styles.searchInput}
                        ref={searchRef}
                    />
                    <Feather
                        size={24}
                        name="search"
                        color={theme.colors.neutral(0.3)}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 15,
        flex: 1,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: hp(4)
    },

    title: {
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.9),
        fontSize: hp(2)
    },

    search: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: hp(4),
        borderWidth: 1,
        borderColor: theme.colors.gray,
        borderRadius: theme.radius.xl,
        backgroundColor: theme.colors.white,
        padding: 10,
    },

    searchInput: {
        fontSize: hp(1.5),
    }
})

export default HomeScreen