import { FunctionComponent, useEffect, useState } from "react"
import Popup from "reactjs-popup";
import {adminGetRequest} from "../firebase/firebase_admin";
import { User } from "../types/User"

/** Interface for simplify the usage viewing model  */
interface ShowUser {
    email: string,
    uid: string,
}

/**
 * @param text the text to bi displayed
 * @param setText function to set te text in the useState
 * @returns JSX element of the searchbar
 */
const SearchBar: FunctionComponent<{text: string, setText: Function}> = props => {
    return <div className="pt-3 w-full ">
        <input type="text" className="bg-white w-full rounded-3xl text-black p-2 placeholder:text-gray-500 transform hover:scale-102 focus:scale-102 duration-200"
            placeholder="Search.." onChange={e => props.setText(e.target.value)}>
        </input>
    </div>
}

/**
 * @param filter the string to filter the results by the email 
 * @param setSelectedUser sets the selected user to show the popup in the parent
 * @returns JSX element of the table
 */
const TableUsers: FunctionComponent<{filter:string, setSelectedUser: (_:ShowUser)=>void}> = props => {
    const [users, setUsers] = useState<Array<ShowUser>>([]);
    useEffect(()=>{
        // Gets the users from the Firebase Admin Backend
        adminGetRequest("listUsers").then(res => {
            try{
                const showUsers = (res as Array<ShowUser>);
                // Sorts the users by their email alphabetically
                showUsers.sort((a,b)=> a.email.localeCompare(b.email));
                // Shows the users in the table
                setUsers(showUsers);
            }catch(e){
                console.error(e);
            }
        })
    })
    return <div className="w-full h-full overflow-y-auto">
            {users.filter(e=> e.email.toLowerCase().includes(props.filter)).map(user => {
                    return <div className="p-1 px-2 m-2 mx-5 border rounded-3xl transform hover:scale-102 duration-100 hover:border-yellow-300"
                        onClick={()=> props.setSelectedUser(user)} key={user.uid}>
                        <p>{user.email}</p>
                    </div>
                })}
        </div>
}

/**
 * @param user the user to display in the popup 
 * @returns JSX element
 */
const SingleUserView: FunctionComponent<{user: ShowUser}> = props => {
    const [user, setUser] = useState<User | undefined>(undefined);
    useEffect(()=> {
        // Gets the user from the Firebase Admin Backend 
        adminGetRequest(`user/${props.user.uid}`).then(response =>{
            const u: User = {
                name: response["displayName"],
                email: props.user.email,
                email_verified: response["emailVerified"] ?? false,
                user_id: props.user.uid,
                admin: response?.["customClaims"]?.["admin"] ?? false,
                setup_edit: response?.["customClaims"]?.["setup-edit"] ?? false
            };
            setUser(u);
        });
    }, [props.user.uid, props.user.email]);
    // Lists all the attributes in the user
    return <div className="w-full h-full px-5">
        {user && 
            Object.keys(user)
            .sort((a,b)=> a.localeCompare(b))
            .map(key => {
                // Cast the key to a keyof User to be safe in the data access
                let remappedKey = key as keyof typeof user;
                // Gets the value from the associated key
                let value = user[remappedKey];
                switch (typeof value) {
                    case "string":
                        return <div className="w-full flex" key={key}>
                            <label htmlFor={key} className="w-1/2">{key}: </label>
                            <input type="text" value={value} id={key} defaultValue={value} className="text-black"
                                /* TODO set disabled from the User censured enum*/
                            ></input>
                        </div>
                    default:
                        return <div>Unimplemented type</div>
                }
            })
        }
    </div>
}

/**
 * @returns JSX element of the Admin page
 */
export const AdminPage = () => {
    // State for the filter in the table
    const [textFilter, setTextFilter] = useState("");
    // If selctedUser is different from undefined it will show up the popup
    const [selectedUser, setSelectedUser] = useState<ShowUser | undefined>(undefined);
    return <div className="h-screen container mx-auto flex flex-col">
        <Popup open={selectedUser !== undefined}>
            <div className="h-screen w-screen backdrop-blur-lg flex flex-col"
                onClick={(e)=>{
                    if(e.target !== e.currentTarget) return;
                    setSelectedUser(undefined);
                }}>
                <div className="container mx-auto bg-pink-700 my-10 flex-grow rounded-3xl p-3">
                    <div className="text-3xl" onClick={()=>setSelectedUser(undefined)}>
                        {"<"}
                    </div>
                    {selectedUser && <SingleUserView user={selectedUser}/>}
                </div>
            </div>
        </Popup>
        <SearchBar text={textFilter} setText={setTextFilter}/>
        <TableUsers filter={textFilter} setSelectedUser={setSelectedUser}/>
    </div>
}