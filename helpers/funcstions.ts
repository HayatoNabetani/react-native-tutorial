import dayjs from "dayjs";

export const hourMessage = () => {
    const hour = Number(dayjs().format("H"));
    let message = "";
    switch (true) {
        case hour <= 10:
            message = "Good Morining";
            break;
        case 11 <= hour && hour <= 17:
            message = "Good Noon";
            break;
        case 18 <= hour:
            message = "Good Night";
            break;
    }
    return message;
};
