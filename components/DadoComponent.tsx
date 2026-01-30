import React, { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHistory } from "@/contexts/HistoryContext";

interface DadoComponentProps {
    mod?: number;
    qtde?: number;
    lados: number;
    padrao?: boolean;
}

export default function DadoComponent({
    mod = 0,
    qtde = 1,
    lados,
    padrao = false,
}: DadoComponentProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTransparent, setModalTransparent] = useState(true);
    const [valores, setValores] = useState<number[]>([]);
    const [total, setTotal] = useState<number | null>(null);
    const [longPressed, setLongPressed] = useState(false);

    const { adicionarRolagem } = useHistory();

    let defaultIcon = "dice-multiple";
    switch (lados) {
        case 4:
            defaultIcon = "dice-d4";
            break;
        case 6:
            defaultIcon = "dice-d6";
            break;
        case 8:
            defaultIcon = "dice-d8";
            break;
        case 10:
            defaultIcon = "dice-d10";
            break;
        case 12:
            defaultIcon = "dice-d12";
            break;
        case 20:
            defaultIcon = "dice-d20";
            break;
        case 100:
            defaultIcon = "dice-multiple";
            break;
    }

    function gerarNumeroAleatorio(lados: number): number {
        return Math.floor(Math.random() * lados) + 1;
    }

    function rolarDado(lados: number): number {
        const resultados: number[] = [];
        let soma = 0;

        for (let i = 0; i < qtde; i++) {
            const resultado = gerarNumeroAleatorio(lados);
            resultados.push(resultado);
            soma += resultado;
        }

        const totalFinal = soma + mod;

        setValores(resultados);
        setTotal(totalFinal);

        adicionarRolagem({
            id: Date.now(),
            dado: {
                qtde,
                lados,
                mod,
            },
            res: totalFinal,
            valores: resultados,
            date: new Date().toISOString(),
        });

        return totalFinal;
    }

    async function salvarRolagem(total: number, valores: number[]) {
        try {
            const novaRolagem = {
                id: Date.now(),
                dado: {
                    qtde,
                    lados,
                    mod,
                },
                res: total,
                valores,
                date: new Date().toISOString(),
            };

            const historicoAtual = await AsyncStorage.getItem("@dice_history");
            const historico: any[] = historicoAtual
                ? JSON.parse(historicoAtual)
                : [];

            historico.unshift(novaRolagem);

            await AsyncStorage.setItem(
                "@dice_history",
                JSON.stringify(historico),
            );
        } catch (error) {
            console.error("Erro ao salvar rolagem:", error);
        }
    }

    function fecharModal() {
        setModalVisible(false);
        setTotal(null);
        setValores([]);
    }

    function excluir(padrao: boolean): null {
        if (!padrao) {
            setLongPressed(true);
        }
    }

    const styles = {
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalItensContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center",
        },
    };

    return (
        <View style={longPressed ? { display: "none" } : { display: "flex" }}>
            <Modal
                animationType="fade"
                transparent={modalTransparent}
                visible={modalVisible}
                onRequestClose={() => fecharModal()}
            >
                <Pressable
                    style={styles.modalItensContainer}
                    onPress={fecharModal}
                >
                    <Pressable style={styles.modalView} onPress={() => {}}>
                        <Text style={styles.modalText}>
                            {qtde}d{lados}
                            {mod > 0 ? ` + ${mod}` : ""}
                            {mod < 0 ? ` - ${Math.abs(mod)}` : ""}
                        </Text>
                        <Text style={styles.modalText}>{total}</Text>
                        <Text style={styles.modalText}>
                            {valores.join(", ")}
                        </Text>
                    </Pressable>
                </Pressable>
            </Modal>
            <IconButton
                icon={defaultIcon}
                iconColor="#000"
                size={48}
                onPress={() => {
                    rolarDado(lados);
                    setModalVisible(true);
                    setModalTransparent(true);
                }}
                onLongPress={() => excluir(padrao)}
            />
            <Text>d{lados}</Text>
        </View>
    );
}
