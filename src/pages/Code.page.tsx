import { useEffect, useState } from "react"
import CodeEditor from "@uiw/react-textarea-code-editor"
import { evaluate } from "mathjs"

const t = [
    {name: "t1", values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
    {name: "t2", values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]},
]


/// Returs an array with the values calculated by the given exspression
function calc(value: string, times: Array<{name: string, values: Array<number>}>, size: number): Array<number>{
    const values = value.split(" ");
    const result: Array<number> = [];

    // returns the index of the given variable if its present, -1 otherwise
    const contained = (search: string) => {
        for(let i = 0; i < times.length; i++){
            if(times[i].name === search) return i;
        }
        return -1;
    }

    // i stands by the point in the array
    for(let i = 0; i < size; i++){
        let filled = [""];
        // j stands by the index of the value in the array of the values
        for(let j = 0; j < values.length; j++){
            let index = contained(values[j]);
            if(index !== -1){
                filled.push(times[index].values[i].toString());
            }else{
                filled.push(values[j])
            }
        }
        try{
            // tries to evaluate the expression
            result.push(Number.parseFloat(evaluate(filled.join(" "))));
            // result.push(eval(filled.join(" ")));
        }catch(e){
            console.error(e);
            return [-1];
        }
    }

    return result;
}

/**
 * @returns JSX element for the code page
 */
export const CodePage = () => {
    const [code, setCode] = useState("t1 + t2");
    const [elaborated, setElaborated] = useState<Array<number>>([]);

    useEffect(() => {
        setElaborated(calc(code, t, 10));
    }, [code]);

    return <div className="h-screen w-screen">
        <CodeEditor 
            value={code}
            language="matlab"
            onChange={(e) => setCode(e.target.value)}
            style={{
                fontSize: 12,
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
        ></CodeEditor>
        {elaborated.join(" ")}
    </div>
}