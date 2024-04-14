import { Stack } from 'expo-router'

const Root = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='home/index'
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    )
}

export default Root