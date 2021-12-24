import React, {useState, useRef} from "react";

export const useInput = (initialState?: string): [string, React.Ref<HTMLInputElement>] => {
    const [text, setText] = useState(initialState ?? "");
    const element = useRef<HTMLInputElement>(null);

    element.current?.addEventListener("input", (e)=> {
        setText(element.current?.value ?? "");
    })

    return [text, element];
}
