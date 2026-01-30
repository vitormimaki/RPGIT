import React from "react";
import { View, Text, Pressable } from "react-native";

interface DadoComponentProps {
    mod?: number;
    qtde?: number;
    lados: number;
    padrao?: boolean;
}

interface HistoricoComponentProps {
    dado: DadoComponentProps;
    res: number;
    valores?: number[];
    date?: Date;
    onDelete?: () => void;
}

export default function HistoricoComponent({
    dado = {
        mod: 0,
        qtde: 1,
        lados: 20,
    },
    res = 0,
    valores = [],
    date = new Date(),
    onDelete,
}: HistoricoComponentProps) {
    const dataFormatada = date.toLocaleDateString("pt-BR");
    const horaFormatada = date.toLocaleTimeString("pt-BR");

    const modText =
        dado.mod && dado.mod !== 0
            ? dado.mod > 0
                ? `+${dado.mod}`
                : dado.mod
            : "";

    const styles = {
        card: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1e1e1e",
            borderRadius: 12,
            padding: 12,
            marginVertical: 6,
            elevation: 3, // Android shadow
        },
        resultContainer: {
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: "#3b82f6",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
        },
        resultText: {
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
        },
        infoContainer: {
            flex: 1,
        },
        diceText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
        },
        dateText: {
            color: "#9ca3af",
            fontSize: 12,
            marginTop: 2,
        },
        valoresText: {
            color: "#d1d5db",
            fontSize: 12,
            marginTop: 4,
        },
    };

    return (
        <Pressable onLongPress={onDelete}>
            <View style={styles.card}>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>{res}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.diceText}>
                        {dado.qtde}d{dado.lados}
                        {modText}
                    </Text>

                    <Text style={styles.dateText}>
                        {dataFormatada} • {horaFormatada}
                    </Text>
                    {valores && valores.length > 0 && (
                        <Text style={styles.valoresText}>
                            {valores.join(", ")}
                        </Text>
                    )}
                </View>
            </View>
        </Pressable>
    );
}
