import React from "react";
import { SquareConfigData, SquareType } from "../../utils/constants/square";

interface Props {
    id: number;
}

export const SquareInfo: React.FC<Props> = ({ id }) => {

    const type: SquareType | undefined = SquareConfigData.get(id)?.type;

    const getInfo = () => {
        if (type === SquareType.Airport) {
            return <div />
        }
        if (type === SquareType.Chance) {
            return <div />
        }
        if (type === SquareType.CentralPark) {
            return <div />
        }
        if (type === SquareType.Go) {
            return <div />
        }
        if (type === SquareType.Utility) {
            return <div />
        }

        if (type === SquareType.Jail || type === SquareType.GoToJail) {
            return null;
        }

        return <div />
    };


    return (
        getInfo()
    );

};