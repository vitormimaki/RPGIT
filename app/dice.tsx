import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import DadoComponent from "@/components/DadoComponent";

export default function Dice() {
    const [modificador, setModificador] = useState<string>("0");
    const [quantidade, setQuantidade] = useState<string>("1");

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
            justifyContent: "space-around",
            width: "100%",
        },
        input: {
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 60,
            textAlign: "center",
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
                <View>
                    <Text>Modificador:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={modificador}
                        onChangeText={(text) => setModificador(text)}
                    />
                </View>
                <View>
                    <Text>Quantidade:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={quantidade}
                        onChangeText={(text) => {
                            if (parseInt(text) < 1) {
                                setQuantidade("1");
                                return;
                            }
                            setQuantidade(text);
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
