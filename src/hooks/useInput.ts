import {useState, FormEvent, ChangeEventHandler} from "react";

/** Hook for the input from Input HTML elements
 * @returns [value, onChange]
 */
export const useInput = (initialValue?:string): [string, ChangeEventHandler<HTMLInputElement>] => {
    const [value, setValue] = useState(initialValue??"");
  
    return [
        value,
        (event: FormEvent<HTMLInputElement>) => {
            setValue(event?.currentTarget?.value ?? "");
        }
    ];
  };