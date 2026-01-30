import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { addCustomDice } from "@/services/customDice";

export default function AddDice() {
    const [lados, setLados] = useState("");
    const router = useRouter();

    function salvar() {
        const value = parseInt(lados);

        if (!value) return;

        addCustomDice(value);
        router.back();
    }

    return (
        <View style={{ padding: 20 }}>
            <Text>Número de lados</Text>

            <TextInput
                keyboardType="numeric"
                value={lados}
                onChangeText={setLados}
                placeholder="Ex: 7"
                style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    marginVertical: 12,
                }}
            />

            <Button title="Salvar dado" onPress={salvar} />
        </View>
    );
}
