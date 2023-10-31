import { Alert, Button, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useItems } from "../../hooks/useEmoji";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useBody } from "../../hooks/useBody";
import { useState } from "react";

export default function TabTwoScreen() {
    const { items } = useItems();

    const [templates, setTemplates] = useState([]);

    // const { body, setBody } = useBody();
    const [body, setBody] = useState("");

    const emojiPress = (name: string) => {
        const targetItem = items.find((item: any) => item.name === name);
        setTemplates(targetItem.templates);
    };

    const templatePress = (content: string) => {
        setBody(content);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Two</Text>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <Text
                        onPress={() => emojiPress(item.name)}
                        key={item.emoji}
                    >
                        {item.emoji}: {item.name}
                    </Text>
                )}
            />
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <FlatList
                data={templates}
                renderItem={({ item }) => (
                    <Text onPress={() => templatePress(item)}>{item}</Text>
                )}
            />
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <TextInput
                // style={styles.input}
                onChangeText={setBody}
                value={body}
            />
            <Button
                title="Press me"
                onPress={() => Alert.alert("Simple Button pressed")}
            />
            <EditScreenInfo path="app/(tabs)/two.tsx" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
