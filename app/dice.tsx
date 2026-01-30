import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import DadoComponent from "@/components/DadoComponent";

export default function Dice() {
    const [modificador, setModificador] = useState<string>("0");
    const [quantidade, setQuantidade] = useState<string>("1");

    function updateMod(delta: number) {
        setModificador((prev) => {
            const value = parseInt(prev) || 0;
            return String(value + delta);
        });
    }

    function updateQuantidade(delta: number) {
        setQuantidade((prev) => {
            const value = parseInt(prev) || 1;
            const next = value + delta;
            return String(next < 1 ? 1 : next);
        });
    }

    const styles = {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        dadoContainer: {
            margin: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        diceOptionsContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 0,
        },
        diceBox: {
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
        },
        input: {
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 60,
            textAlign: "center",
        },
        modButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#000",
            height: "23%",
            width: "90%",
            gap: "0",
            padding: "0",
        },
    };
    return (
        <View style={styles.container}>
            <View style={styles.dadoContainer}>
                <DadoComponent
                    mod={parseInt(modificador)}
                    qtde={parseInt(quantidade)}
                    lados={4}
                    padrao
                />
                <DadoComponent
                    mod={parseInt(modificador)}
                    qtde={parseInt(quantidade)}
                    lados={6}
                    padrao
                />
                <DadoComponent
                    mod={parseInt(modificador)}
                    qtde={parseInt(quantidade)}
                    lados={8}
                    padrao
                />
                <DadoComponent
                    mod={parseInt(modificador)}
                    qtde={parseInt(quantidade)}
                    lados={10}
                    padrao
                />
                <DadoComponent
                    mod={parseInt(modificador)}
                    qtde={parseInt(quantidade)}
                    lados={12}
                    padrao
                />
                <DadoComponent
                    mod={parseInt(modificador)}
                    qtde={parseInt(quantidade)}
                    lados={20}
                    padrao
                />
                <DadoComponent
                    mod={parseInt(modificador)}
                    qtde={parseInt(quantidade)}
                    lados={100}
                    padrao
                />
            </View>
            <View style={styles.diceOptionsContainer}>
                <View style={styles.diceBox}>
                    <Text>Quantidade:</Text>
                    <View style={styles.modButton}>
                        <IconButton
                            icon="minus"
                            iconColor="#000"
                            size={24}
                            onPress={() => updateQuantidade(-1)}
                        />
                        <TextInput
                            editable={false}
                            style={styles.input}
                            value={quantidade + "d"}
                        />
                        <IconButton
                            icon="plus"
                            iconColor="#000"
                            size={24}
                            onPress={() => updateQuantidade(1)}
                        />
                    </View>
                </View>
                <View style={styles.diceBox}>
                    <Text>Modificador:</Text>
                    <View style={styles.modButton}>
                        <IconButton
                            icon="minus"
                            iconColor="#000"
                            size={24}
                            onPress={() => updateMod(-1)}
                        />
                        <TextInput
                            editable={false}
                            style={styles.input}
                            value={
                                parseInt(modificador) >= 0
                                    ? "+" + modificador
                                    : modificador
                            }
                        />
                        <IconButton
                            icon="plus"
                            iconColor="#000"
                            size={24}
                            onPress={() => updateMod(1)}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
