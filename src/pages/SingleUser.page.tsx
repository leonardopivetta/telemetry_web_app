import { useState, useEffect } from "react";
import { adminGetRequest, adminPostRequest } from "../firebase/firebase_admin";
import User from "../types/User";
import _ from "lodash";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom"

type LockedUserKeys = {
    [key in keyof User]?: boolean
 };

const lockedKeys: LockedUserKeys = {
    user_id: true,
    email: true,
    email_verified: true,
    name: true,
}

export const SingleUserPage = () => {
    // Navigation hooks / costants
    const params = useParams();
    const uid = params.uid;
    const navigate = useNavigate();

    // Hooks for the user to be shown and compared
    const [user, setUser] = useState<User | undefined>(undefined);
    const [previousUser, setPreviousUser] = useState<User | undefined>(undefined);

    // Saves all the information contained in user
    const saveAll = async () => {
       return adminPostRequest(`user/${user?.user_id}`, user?.customClaims).catch(console.error);
    }

    const [changed, setChanged] = useState(false);
    // Detection of change on user state change
    useEffect(()=> {
        if(!user || !previousUser) return;
        setChanged(!_.isEqual(user,previousUser));
    }, [user, previousUser]);


    useEffect(()=> {
        let source = axios.CancelToken.source();
        // Gets the user from the Firebase Admin Backend 
        adminGetRequest(`user/${uid}`, {cancelToken: source.token}).then(response =>{
            const u: User = {
                name: response["displayName"],
                email: response["email"],
                email_verified: response["emailVerified"] ?? false,
                user_id: uid ?? "",
                customClaims: {
                    admin: response?.["customClaims"]?.["admin"] ?? false,
                    setup_edit: response?.["customClaims"]?.["setup_edit"] ?? false
                }
            };
            setPreviousUser(_.cloneDeep(u));
            setUser(u);
            setChanged(false);
        });
    }, [uid]);

    const divFromObject = (el: object, ...prev: string[]) => {
        return Object.keys(el)
            .sort((a,b)=> {
                // Nested objects will go lower
                if(typeof(el[a as keyof typeof el]) === "object") return Infinity;
                if(typeof(el[b as keyof typeof el]) === "object") return Infinity;
                return a.localeCompare(b)
            })
            .map(key => {
                // Cast the key to a keyof User to be safe in the data access
                let remappedKey = key as keyof typeof user;
                // Gets the value from the associated key
                switch (typeof el[remappedKey]) {
                    case "string":
                        return <div className="w-full flex" key={(prev.length > 0 && prev.reduce((a,b)=>a+b)) + remappedKey}>
                            <label htmlFor={key} className="w-1/3 text-right pr-5">{key}: </label>
                            <input type="text" id={key} defaultValue={el[remappedKey]} className="text-black w-2/3"
                                disabled={lockedKeys[remappedKey]} onChange={(e)=>{
                                    let newUser = _.cloneDeep(user);
                                    let nestEl = newUser as object;
                                    prev.forEach(p => {
                                        nestEl = nestEl[p as keyof typeof nestEl];
                                    });
                                    (nestEl[remappedKey] as string)= e.target.value;
                                    setUser(newUser);
                                }}>
                            </input>
                        </div>
                    case "number":
                        return <div className="w-full flex" key={(prev.length > 0 && prev.reduce((a,b)=>a+b)) + remappedKey}>
                            <label htmlFor={key} className="w-1/3 text-right pr-5">{key}: </label>
                            <input type="number" id={key} defaultValue={el[remappedKey]} className="text-black w-2/3"
                                disabled={lockedKeys[remappedKey]} onChange={()=>{}}>
                            </input>
                        </div>
                    case "boolean":
                        return <div className="w-full flex " key={(prev.length > 0 && prev.reduce((a,b)=>a+b)) + remappedKey}>
                            <label htmlFor={key} className="w-1/3 text-right pr-5">{key}: </label>
                            <input type="checkbox" className="my-auto w-5 h-5 rounded-3xl" defaultChecked={el[remappedKey]} 
                            onChange={()=>{
                                let newUser = _.cloneDeep(user);
                                let nestEl = newUser as object;
                                prev.forEach(p => {
                                    nestEl = nestEl[p as keyof typeof nestEl];
                                });
                                (nestEl[remappedKey] as boolean) = !nestEl[remappedKey];
                                setUser(newUser);
                            }} disabled={lockedKeys[remappedKey]}>
                            </input>
                        </div>
                    case "object":
                        return <div key={(prev.length > 0 && prev.reduce((a,b)=>a+b))+remappedKey}>
                            {divFromObject(el[remappedKey], ...prev, remappedKey)}
                        </div>
                    default:
                        return <div>Uninplemented {typeof el[remappedKey]}</div>
                }
            })
    }

    // Lists all the attributes in the user
    return <div className="w-full h-screen px-5 flex flex-col">
        <div className="overflow-y-auto flex-grow mb-5 space-y-2">
        {user && 
            divFromObject(user)
        }
        </div>
        <div className="mt-2 mb-7">
            <button className={"py-2 w-full rounded-xl duration-200 bg-yellow-400 "+(changed ? "":"hidden")} disabled={false} 
                onClick={()=>{
                    // Saves everything and then goes back to the previous page
                    saveAll().then(()=> navigate(-1));
                }}>Save</button>
        </div>
    </div>
}