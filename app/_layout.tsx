import { Tabs } from "expo-router";
import { Icon } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HistoryProvider } from "@/contexts/HistoryContext";

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <HistoryProvider>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: "black",
                        tabBarInactiveTintColor: "gray",
                        animation: "shift",
                        headerShown: false,
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: "RPGit",
                            tabBarLabel: "RPGit",
                            headerShown: true,
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    size={28}
                                    source="home"
                                    color={focused ? "black" : "gray"}
                                />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="dice"
                        options={{
                            title: "Dados",
                            tabBarLabel: "Dados",
                            headerShown: true,
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    size={28}
                                    source="dice-multiple"
                                    color={focused ? "black" : "gray"}
                                />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="history"
                        options={{
                            title: "Histórico",
                            tabBarLabel: "Histórico",
                            headerShown: true,
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    size={28}
                                    source="history"
                                    color={focused ? "black" : "gray"}
                                />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="profile"
                        options={{
                            title: "Perfil",
                            tabBarLabel: "Perfil",
                            headerShown: true,
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    size={28}
                                    source="account"
                                    color={focused ? "black" : "gray"}
                                />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="characters"
                        options={{
                            title: "Personagens",
                            tabBarLabel: "Personagens",
                            headerShown: true,
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    size={28}
                                    source="account-group"
                                    color={focused ? "black" : "gray"}
                                />
                            ),
                        }}
                    />
                </Tabs>
            </HistoryProvider>
        </GestureHandlerRootView>
    );
}
