import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import Categories from '../../components/categories';
import { useCallback, useEffect, useRef, useState } from 'react';
import { theme } from '../../constants/theme';
import { hp } from '../../helpers/common';
import axios from 'axios';
import ImageGrid from '../../components/image-grid';
import { debounce } from 'lodash';

const HomeScreen = () => {
    const [active, setActive] = useState(null)
    const [search, setSearch] = useState("")
    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const searchRef = useRef()

    const { top } = useSafeAreaInsets()
    const paddingTop = top > 0 ? top + 10 : 30

    const getImages = async (query) => {
        try {
            const API_KEY = process.env.API_KEY
            var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(query)

            const response = await axios.get(URL)
            const { data } = response

            return data
        }
        catch (error) {
            console.log("Get images error:", error)
        }
    }

    useEffect(() => {
        (async () => {
            const data = await getImages()
            setImages((prev) => [...prev, ...data.hits])
        })()
    }, [])

    const handleSelect = async (title) => {
        setActive(title)
        setImages([])

        const data = await getImages(title)
        setImages((prev) => [...prev, ...data.hits])
    }

    const handleSearch = async (search) => {
        setSearch(search)

        if (search.length > 2) {
            setPage(1)
            setImages([])

            const data = await getImages(search)
            setImages((prev) => [...prev, ...data.hits])
        }

        if (search == "") {
            setPage(1)
            setImages([])

            const data = await getImages()
            setImages((prev) => [...prev, ...data.hits])
        }
    }

    const textDebounce = useCallback(debounce(handleSearch, 500), [])

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
                        onChangeText={textDebounce}
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

                {/* Images */}
                <ImageGrid images={images} />
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