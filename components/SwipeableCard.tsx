import React from "react";
import { View, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";

interface SwipeableCardProps {
    children: React.ReactNode;
    onDelete: () => void;
}

export default function SwipeableCard({
    children,
    onDelete,
}: SwipeableCardProps) {
    function renderRightActions() {
        return (
            <View style={styles.deleteContainer}>
                <Icon source="delete" size={28} color="#fff" />
            </View>
        );
    }

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableOpen={onDelete}
        >
            {children}
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    deleteContainer: {
        backgroundColor: "#ef4444",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        marginVertical: 6,
        borderRadius: 12,
    },
});
