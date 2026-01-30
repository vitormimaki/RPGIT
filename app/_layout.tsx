import { Tabs, useRouter } from "expo-router";
import { Icon } from "react-native-paper";

export default function RootLayout() {
    const router = useRouter();
    const TAB_ROUTES = [
        {
            name: "index",
            title: "Home",
            path: "/",
            disableSwipe: false,
        },
        {
            name: "dice",
            title: "Dados",
            path: "/dice",
            disableSwipe: false,
        },
        {
            name: "profile",
            title: "Perfil",
            path: "/profile",
            disableSwipe: false,
        },
        {
            name: "characters",
            title: "Personagens",
            path: "/characters",
            disableSwipe: false,
        },
    ];

    const INVALID_ROUTES = 0;

    return (
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
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                    },
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#fafafa",
                        borderBottomWidth: 0,
                        shadowOpacity: 0,
                        elevation: 0,
                    },
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
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                    },
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#fafafa",
                        borderBottomWidth: 0,
                        shadowOpacity: 0,
                        elevation: 0,
                    },
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
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarLabel: "Perfil",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                    },
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#fafafa",
                        borderBottomWidth: 0,
                        shadowOpacity: 0,
                        elevation: 0,
                    },
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
                name="characters"
                options={{
                    title: "Personagens",
                    tabBarLabel: "Personagens",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                    },
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#fafafa",
                        borderBottomWidth: 0,
                        shadowOpacity: 0,
                        elevation: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            size={28}
                            source="home"
                            color={focused ? "black" : "gray"}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
