import type { Player } from "./player.ts";
import { movePlayerTo, updatePlayerMoney } from "../utils/gameLogic.ts";

export interface Card {
    id: number;
    type: CARD_TYPE; // סוגי הכרטיסים
    text: string; // טקסט שמוצג על הכרטיס
    action?: (player: Player, game: any) => void; // פונקציה שמבצעת פעולה, אם יש
}

export enum CARD_TYPE {
    Command = 'Command', Surprise = 'Surprise', Memory = 'Memory', Property = 'Property'
};
const CARD_DATA: Card[] = [
    {
        id: 1,
        type: CARD_TYPE.Surprise,
        text: "ספרו על הטיול המשפחתי הכי מצחיק שהיה לכם."
    },
    {
        id: 2,
        type: CARD_TYPE.Surprise,
        text: "מה המתנה הכי מוצלחת שקיבלתם מסבא וסבתא?"
    },
    {
        id: 3,
        type: CARD_TYPE.Command,
        text: "שלם 50 למשפחה",
        action: (player: Player, game: any) => {
            game.setPlayers((prevPlayers: any) => updatePlayerMoney(prevPlayers, player.id, -50));
        }
    },
    {
        id: 4,
        type: CARD_TYPE.Command,
        text: "קבל 100 מהמשפחה",
        action: (player: Player, game: any) => {
            game.setPlayers((prevPlayers: any) => updatePlayerMoney(prevPlayers, player.id, 100));
        }
    },
    {
        id: 5,
        type: CARD_TYPE.Surprise,
        text: "עבור ל-Start",
        action: (player: Player, game: any) => {
            game.setPlayers((prevPlayers: any) => movePlayerTo(prevPlayers, player.id, 0));
        }
    },
    {
        id: 6,
        type: CARD_TYPE.Surprise,
        text: "מה הזיכרון הכי מצחיק שלך מחופשה משפחתית?",
    },
    {
        id: 7,
        type: CARD_TYPE.Surprise,
        text: "מה התכונה הכי מצחיקה של אמא/אבא?",
    },
    {
        id: 8,
        type: CARD_TYPE.Surprise,
        text: "אם הייתם יכולים לבחור לאכול ארוחת ערב עם כל בן משפחה בעולם, במי הייתם בוחרים ולמה?",
    },
    // ... קלפים נוספים
];

export default CARD_DATA;
