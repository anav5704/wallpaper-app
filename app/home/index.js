import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import Categories from '../../components/categories';
import { theme } from '../../constants/theme';
import { hp } from '../../helpers/common';
import { useRef, useState } from 'react';

const HomeScreen = () => {
    const [search, setSearch] = useState("")
    const [active, setActive] = useState(null)
    const searchRef = useRef()

    const { top } = useSafeAreaInsets()
    const paddingTop = top > 0 ? top + 10 : 30

    const handleSelect = (title) => {
        setActive(title)
    }

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

            <ScrollView>
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

                {/* Categories */}
                <View style={styles.Categories}>
                    <Categories
                        active={active}
                        handleSelect={handleSelect}
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
    },

    Categories: {
        marginTop: 15
    }
})

export default HomeScreen