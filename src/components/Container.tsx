import { View, Text, ScrollView, StyleProp, ViewStyle } from 'react-native'
import React, { Children } from 'react'

interface TContainer {
    children: React.ReactNode,
    isScrollable?: boolean,
    style?: StyleProp<ViewStyle>
}

const Container = ({
    children,
    isScrollable = true,
    style
}: TContainer) => {
    return (
        <>
            {isScrollable ? <ScrollView
                showsVerticalScrollIndicator={false}
                style={style}
            >
                {children}
            </ScrollView>
                :
                <View>
                    {children}
                </View>}
        </>
    )
}

export default Container