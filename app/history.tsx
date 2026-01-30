import { FlatList, Alert, Button, View } from "react-native";
import { useHistory } from "@/contexts/HistoryContext";
import HistoricoComponent from "@/components/HistoricoComponent";
import SwipeableCard from "@/components/SwipeableCard";

export default function History() {
    const { rolagens, removerRolagem, limparHistorico } = useHistory();

    function confirmarRemocao(id: number) {
        Alert.alert("Excluir rolagem", "Deseja remover esta rolagem?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => removerRolagem(id),
            },
        ]);
    }

    return (
        <View style={{ padding: 12 }}>
            <Button
                title="Limpar Histórico"
                color="red"
                onPress={() =>
                    Alert.alert(
                        "Limpar histórico",
                        "Deseja apagar todo o histórico?",
                        [
                            { text: "Cancelar", style: "cancel" },
                            {
                                text: "Limpar",
                                style: "destructive",
                                onPress: limparHistorico,
                            },
                        ],
                    )
                }
            />
            <FlatList
                data={rolagens}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <HistoricoComponent
                        dado={item.dado}
                        res={item.res}
                        valores={item.valores}
                        date={new Date(item.date)}
                        onDelete={() => confirmarRemocao(item.id)}
                    />
                )}
            />
        </View>
    );
}
