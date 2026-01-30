import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@dice_custom";

export async function getCustomDice() {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
}

export async function addCustomDice(lados: number) {
    const atual = await getCustomDice();

    const novo = {
        id: Date.now(),
        lados,
    };

    const atualizado = [...atual, novo];
    await AsyncStorage.setItem(KEY, JSON.stringify(atualizado));
    return atualizado;
}

export async function removeCustomDice(id: number) {
    const atual = await getCustomDice();
    const atualizado = atual.filter((d: any) => d.id !== id);

    await AsyncStorage.setItem(KEY, JSON.stringify(atualizado));
    return atualizado;
}
