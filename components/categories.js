import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { categories } from "../constants/data"
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'

const Categories = ({ active, handleSelect }) => {
    return (
        <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            renderItem={({ item, index }) => (
                <CategoryItem
                    title={item}
                    index={index}
                    isActive={active == item}
                    handleSelect={handleSelect}
                />
            )}
        />
    )
}

const CategoryItem = ({ title, index, isActive, handleSelect }) => {
    let color = isActive ? theme.colors.white : theme.colors.neutral(0.7)
    let backgroundColor = isActive ? theme.colors.black : theme.colors.white

    return (
        <Animated.View entering={FadeInRight.delay(index * 200).duration(700).springify()} >
            <Pressable
                style={[styles.category, { backgroundColor }]}
                onPress={() => handleSelect(isActive ? null : title)}
            >
                <Text style={[styles.label, { color }]}>
                    {title}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: hp(4),
        gap: 8
    },

    category: {
        padding: 10,
        borderWidth: 1,
        borderColor: theme.colors.gray,
        borderRadius: theme.radius.xl,
    },

    label: {
        fontSize: hp(1.5),
    }
})

export default Categories