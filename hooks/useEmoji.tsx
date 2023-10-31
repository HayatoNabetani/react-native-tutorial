import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../helpers/firebase";

export const useItems = () => {
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const q = query(collection(firestore, "feels"));
        let tmpItems: string[] = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            tmpItems.push(doc.data());
        });

        setItems(tmpItems);
    };

    return { items };
};
