import { ScrollView, StyleSheet, Image } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { createTable, select } from "../../helpers/sqlite";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { RefreshControl } from "react-native-gesture-handler";
import dayjs from "dayjs";
import { hourMessage } from "../../helpers/funcstions";

export default function TabOneScreen({ navigation }: { navigation: any }) {
    createTable();
    select();
    const [refreshing, setRefreshing] = useState(true);
    const [diaries, setDiaries] = useState([]);
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const results: any = await select();
        setDiaries(results);
        setRefreshing(false);
    };

    // if (!diaries) {
    //     return (
    //         <View>
    //             <Text>Welcome</Text>
    //         </View>
    //     );
    // }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={init} />
            }
        >
            <View>
                {/* <Image source={require("../../assets/images/icon.png")} /> */}
                <Text>{dayjs().format("YYYY-MM-DD")}</Text>
                <Text>{hourMessage()}</Text>
                <Button onPress={() => navigation.navigate("two")}>
                    Check In
                </Button>
            </View>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text style={styles.title}>PastDiary</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text style={styles.title}>Tips</Text>
            <View style={styles.container}>
                {diaries.map((d: any) => (
                    <View key={d.id}>
                        <Text>{d.body}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
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
