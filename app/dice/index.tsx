import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TextInput, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import DadoComponent from "@/components/DadoComponent";
import { getCustomDice } from "@/services/customDice";

export default function Dice() {
    const [modificador, setModificador] = useState<string>("0");
    const [quantidade, setQuantidade] = useState<string>("1");
    const [customDice, setCustomDice] = useState<CustomDice[]>([]);

    async function carregarDados() {
        try {
            const json = await AsyncStorage.getItem("@dice_custom");
            if (json) {
                setCustomDice(JSON.parse(json));
            } else {
                setCustomDice([]);
            }
        } catch (e) {
            console.log("Erro ao carregar dados", e);
        }
    }

    async function removerDado(id: string) {
        const novaLista = customDice.filter((d) => d.id !== id);
        setCustomDice(novaLista);
        await AsyncStorage.setItem("@dice_custom", JSON.stringify(novaLista));
    }

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

    useFocusEffect(
        useCallback(() => {
            carregarDados();
        }, []),
    );

    const styles = {
        container: {
            flex: 1,
            alignItems: "center",
            width: "100%",
            backgroundColor: "#fff",
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
            flex: 1,
            alignItems: "center",
        },
        input: {
            height: 40,
            width: 60,
            borderWidth: 1,
            borderColor: "#ccc",
            textAlign: "center",
            borderRadius: 6,
        },
        modButton: {
            flexDirection: "row",
            alignItems: "center",
        },
        listContent: {
            padding: 12,
        },
        row: {
            justifyContent: "space-between",
            marginBottom: 12,
        },
        footer: {
            flexDirection: "row",
            borderTopWidth: 1,
            borderColor: "#ddd",
            paddingVertical: 10,
            backgroundColor: "#fafafa",
        },
    };
    return (
        <View style={styles.container}>
            {/* LISTA SCROLLÁVEL */}
            <FlatList
                data={[
                    { id: "d4", lados: 4, padrao: true },
                    { id: "d6", lados: 6, padrao: true },
                    { id: "d8", lados: 8, padrao: true },
                    { id: "d10", lados: 10, padrao: true },
                    { id: "d12", lados: 12, padrao: true },
                    { id: "d20", lados: 20, padrao: true },
                    { id: "d100", lados: 100, padrao: true },
                    ...customDice,
                ]}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <DadoComponent
                        tam={70}
                        lados={item.lados}
                        padrao={item.padrao}
                        mod={parseInt(modificador)}
                        qtde={parseInt(quantidade)}
                        onDelete={
                            !item.padrao
                                ? () => removerDado(item.id)
                                : undefined
                        }
                    />
                )}
            />

            {/* FOOTER FIXO */}
            <View style={styles.footer}>
                <View style={styles.diceBox}>
                    <Text>Quantidade:</Text>
                    <View style={styles.modButton}>
                        <IconButton
                            icon="minus"
                            onPress={() => updateQuantidade(-1)}
                        />
                        <TextInput
                            editable={false}
                            style={styles.input}
                            value={quantidade + "d"}
                        />
                        <IconButton
                            icon="plus"
                            onPress={() => updateQuantidade(1)}
                        />
                    </View>
                </View>

                <View style={styles.diceBox}>
                    <Text>Modificador:</Text>
                    <View style={styles.modButton}>
                        <IconButton
                            icon="minus"
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
                        <IconButton icon="plus" onPress={() => updateMod(1)} />
                    </View>
                </View>
            </View>
        </View>
    );
}
