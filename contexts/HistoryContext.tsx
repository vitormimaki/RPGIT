import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Rolagem {
    id: number;
    dado: {
        qtde: number;
        lados: number;
        mod: number;
    };
    res: number;
    valores: number[];
    date: string;
}

interface HistoryContextProps {
    rolagens: Rolagem[];
    adicionarRolagem: (rolagem: Rolagem) => Promise<void>;
    removerRolagem: (id: number) => Promise<void>;
    limparHistorico: () => Promise<void>;
}

const HistoryContext = createContext<HistoryContextProps>(
    {} as HistoryContextProps,
);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
    const [rolagens, setRolagens] = useState<Rolagem[]>([]);

    // 🔹 Carrega histórico ao iniciar o app
    useEffect(() => {
        carregarHistorico();
    }, []);

    async function carregarHistorico() {
        try {
            const data = await AsyncStorage.getItem("@dice_history");
            if (data) {
                setRolagens(JSON.parse(data));
            }
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
        }
    }

    async function adicionarRolagem(rolagem: Rolagem) {
        const novaLista = [rolagem, ...rolagens];
        setRolagens(novaLista);

        await AsyncStorage.setItem("@dice_history", JSON.stringify(novaLista));
    }

    function removerRolagem(id: number) {
        setRolagens((prev) => {
            const novaLista = prev.filter((item) => item.id !== id);
            AsyncStorage.setItem("@dice_history", JSON.stringify(novaLista));
            return novaLista;
        });
    }


    async function limparHistorico() {
        setRolagens([]);
        await AsyncStorage.removeItem("@dice_history");
    }

    return (
        <HistoryContext.Provider
            value={{
                rolagens,
                adicionarRolagem,
                removerRolagem,
                limparHistorico,
            }}
        >
            {children}
        </HistoryContext.Provider>
    );
}

export function useHistory() {
    return useContext(HistoryContext);
}
