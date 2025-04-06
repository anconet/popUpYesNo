import { useState } from "react";

/**
 * 
 * @param message 
 * @param onClickOk 
 * @returns 
 */

export default function usePopUpYesNo(message?: string, onClickOk?: () => void): {
    possiblePopUp: () => JSX.Element,
    callPopUp: (message?: string) => void
} {


    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState(message)

    const callPopUp = (message?: string) => {
        if (message) setPopUpMessage(message)
        setShowPopUp(true);
    };

    const handleClosePopUp = () => {
        setShowPopUp(false);
        if (onClickOk) onClickOk()
    };

    const possiblePopUp = (): JSX.Element => showPopUp ?
        <div className="absolute left-1/2 -translate-x-1/2
            w-full max-w-96 z-10 
            max-h-96
            p-2
            rounded-lg 
            shadow-2xl bg-slate-900 text-slate-200
            ">
            <div className="
                flex flex-col items-center
                w-full
                p-6
                space-y-6
                rounded-lg 
                bg-slate-800 text-slate-200
                ">
                <p className=" text-center whitespace-pre-wrap">
                    {popUpMessage}</p>
                <button className=" rounded-md w-24 h-8
                    bg-slate-700 
                    hover:bg-teal-600
                    active:bg-teal-700"
                    onClick={() => handleClosePopUp()}>OK</button></div></div>
        : <></>

    return {
        possiblePopUp: possiblePopUp,
        callPopUp: callPopUp
    }
}
