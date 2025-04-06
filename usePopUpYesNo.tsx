import { useState } from "react";

/**
 * 
 * @param message 
 * @param onClickOk 
 * @returns 
 */

export default function usePopUpYesNo({
    message,
    yesButtonText,
    noButtonText,
    onClickYes,
    onClickNo }: {
        message?: string,
        yesButtonText?: string,
        noButtonText?: string,
        onClickYes?: () => void,
        onClickNo?: () => void
    }): {
        possiblePopUpYesNo: () => JSX.Element,
        callPopUpYesNo: ({
            message,
            yesButtonText,
            noButtonText }: {
                message?: string,
                yesButtonText?: string,
                noButtonText?: string
            }) => void
    } {

    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState<String>((message) ? message : "Question")
    const [yesButton, setYesButtonText] = useState<String>((yesButtonText) ? yesButtonText : "Yes")
    const [noButton, setNoButtonText] = useState<String>((noButtonText) ? noButtonText : "No")

    const callPopUpYesNo = ({
        message,
        yesButtonText,
        noButtonText }: {
            message?: string,
            yesButtonText?: string,
            noButtonText?: string
        }) => {

        if (message) { setPopUpMessage(message) }
        if (yesButtonText) { setYesButtonText(yesButtonText) }
        if (noButtonText) { setNoButtonText(noButtonText) }
        setShowPopUp(true);
    };

    function handleYes() {
        setShowPopUp(false);
        if (onClickYes) onClickYes()
    };

    function handleNo() {
        setShowPopUp(false);
        if (onClickNo) onClickNo()
    };

    const possiblePopUpYesNo = (): JSX.Element => showPopUp ?
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2
            w-full max-w-80 z-10 
            h-full max-h-48
            p-2
            rounded-lg 
            shadow-2xl shadow-black
            bg-slate-900 text-slate-200
            ">
            <div className="
                flex flex-col items-center justify-around
                w-full
                h-full
                p-6
                space-y-6
                rounded-lg 
                bg-slate-800 text-slate-200
                ">
                <div className="flex w-full h-full items-center justify-center whitespace-pre-wrap">
                    {popUpMessage}</div>
                <div className="w-full h-full flex flex-row justify-around items-center">
                    <button className="rounded-md w-24 h-8
                    bg-slate-700 
                    hover:bg-teal-600
                    active:bg-teal-700"
                        onClick={() => handleYes()}>{yesButton}</button>

                    <button className="rounded-md w-24 h-8
                        bg-slate-700 
                        hover:bg-teal-600
                        active:bg-teal-700"
                        onClick={() => handleNo()}>{noButton}</button></div></div ></div>
        : <></>

    return {
        possiblePopUpYesNo: possiblePopUpYesNo,
        callPopUpYesNo: callPopUpYesNo
    }
}
