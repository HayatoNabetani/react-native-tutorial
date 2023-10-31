import { useState } from "react";

export const useBody = () => {
    const [body, setBody] = useState<string>("");
    return { body, setBody };
};
