import { CARD_TYPE } from "./cardData";

// data/boardData.ts
export interface BoardSquare {
    id: number;
    name: string;
    type: CARD_TYPE; // סוגי הריבועים
    position: number;
    price?: number; // מחיר (אופציונלי, רק לנכסים)
    rent?: number;  // שכר דירה (אופציונלי, רק לנכסים)
    houseCost?: number; // עלות בית (אופציונלי, רק לנכסים)
    hotelCost?: number; // עלות מלון (אופציונלי, רק לנכסים)
    group?: string; // קבוצת צבע (אופציונלי, רק לנכסים)
    owner?: number; // מזהה השחקן שבבעלותו הנכס (אופציונלי)
}

const BOARD_DATA = [
    { id: 0, name: "Start", type: CARD_TYPE.Command, position: 0 },
    { id: 1, name: "Property 1", type: CARD_TYPE.Memory, position: 1 },
    { id: 2, name: "Surprise 1", type: CARD_TYPE.Surprise, position: 2 },
    { id: 3, name: "Property 2", type: CARD_TYPE.Memory, position: 3 },
    { id: 4, name: "Command 1", type: CARD_TYPE.Command, position: 4 },
    { id: 5, name: "Property 3", type: CARD_TYPE.Memory, position: 5 },
    { id: 6, name: "Surprise 2", type: CARD_TYPE.Surprise, position: 6 },
    { id: 7, name: "Property 4", type: CARD_TYPE.Memory, position: 7 },
    { id: 8, name: "Command 2", type: CARD_TYPE.Command, position: 8 },
    { id: 9, name: "Property 5", type: CARD_TYPE.Memory, position: 9 },
    { id: 10, name: "Surprise 3", type: CARD_TYPE.Surprise, position: 10 },
    { id: 11, name: "Jail", type: CARD_TYPE.Command, position: 11 },
    { id: 12, name: "Property 6", type: CARD_TYPE.Memory, position: 12 },
    { id: 13, name: "Surprise 4", type: CARD_TYPE.Surprise, position: 13 },
    { id: 14, name: "Property 7", type: CARD_TYPE.Memory, position: 14 },
    { id: 15, name: "Command 3", type: CARD_TYPE.Command, position: 15 },
    { id: 16, name: "Property 8", type: CARD_TYPE.Memory, position: 16 },
    { id: 17, name: "Surprise 5", type: CARD_TYPE.Surprise, position: 17 },
    { id: 18, name: "Property 9", type: CARD_TYPE.Memory, position: 18 },
    { id: 19, name: "Command 4", type: CARD_TYPE.Command, position: 19 },
    { id: 20, name: "Property 10", type: CARD_TYPE.Memory, position: 20 },
    { id: 21, name: "Surprise 6", type: CARD_TYPE.Surprise, position: 21 },
    { id: 22, name: "Free Parking", type: CARD_TYPE.Command, position: 22 },
    { id: 23, name: "Property 11", type: CARD_TYPE.Memory, position: 23 },
    { id: 24, name: "Surprise 7", type: CARD_TYPE.Surprise, position: 24 },
    { id: 25, name: "Property 12", type: CARD_TYPE.Memory, position: 25 },
    { id: 26, name: "Command 5", type: CARD_TYPE.Command, position: 26 },
    { id: 27, name: "Property 13", type: CARD_TYPE.Memory, position: 27 },
    { id: 28, name: "Surprise 8", type: CARD_TYPE.Surprise, position: 28 },
    { id: 29, name: "Property 14", type: CARD_TYPE.Memory, position: 29 },
    { id: 30, name: "Command 6", type: CARD_TYPE.Command, position: 30 },
    { id: 31, name: "Property 15", type: CARD_TYPE.Memory, position: 31 },
    { id: 32, name: "Surprise 9", type: CARD_TYPE.Surprise, position: 32 },
    { id: 33, name: "Go to Jail", type: CARD_TYPE.Command, position: 33 },
    { id: 34, name: "Property 16", type: CARD_TYPE.Memory, position: 34 },
    { id: 35, name: "Surprise 10", type: CARD_TYPE.Surprise, position: 35 },
    { id: 36, name: "Property 17", type: CARD_TYPE.Memory, position: 36 },
    { id: 37, name: "Command 7", type: CARD_TYPE.Command, position: 37 },
    { id: 38, name: "Property 18", type: CARD_TYPE.Memory, position: 38 },
    { id: 39, name: "Surprise 11", type: CARD_TYPE.Surprise, position: 39 },
    { id: 40, name: "Property 19", type: CARD_TYPE.Memory, position: 40 },
    { id: 41, name: "Command 8", type: CARD_TYPE.Command, position: 41 },
    { id: 42, name: "Property 20", type: CARD_TYPE.Memory, position: 42 },
    { id: 43, name: "Surprise 12", type: CARD_TYPE.Surprise, position: 43 },
];

export default BOARD_DATA;
