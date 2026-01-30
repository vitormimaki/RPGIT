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
    adicionarRolagem: (
        dado: Rolagem["dado"],
        valores: number[],
        res: number,
    ) => void;
    removerRolagem: (id: number) => void;
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

    function adicionarRolagem(
        dado: Rolagem["dado"],
        valores: number[],
        res: number,
    ) {
        const novaRolagem: Rolagem = {
            id: Date.now(),
            dado,
            valores,
            res,
            date: new Date().toISOString(),
        };

        setRolagens((prev) => {
            const atualizado = [novaRolagem, ...prev];
            AsyncStorage.setItem("@dice_history", JSON.stringify(atualizado));
            return atualizado;
        });
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
