import { FunctionComponent, useEffect, useState } from "react"
import {adminGetRequest} from "../firebase/firebase_admin";
// import { lockedKeys } from "../types/User/LockedUserKeys";
import { SingleUserPage } from "./SingleUser.page";

/** Interface for simplify the usage viewing model  */
export interface ShowUser {
    email: string,
    uid: string,
}

/**
 * @param text the text to be displayed
 * @param setText function to set te text in the useState
 * @returns JSX element of the searchbar
 */
const SearchBar: FunctionComponent<{text: string, setText: Function}> = props => {
    return <div className="pt-3 w-full ">
        <input type="text" className="bg-white w-full rounded-3xl text-black p-2 placeholder:text-gray-500 transform scale-98 hover:scale-100 focus:scale-100 duration-200"
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
                    return <div className="p-1 px-2 border my-2 rounded-3xl transform hover:scale-100 duration-100 scale-98 hover:border-yellow-300"
                        onClick={()=> props.setSelectedUser(user)} key={user.uid}>
                        <p>{user.email}</p>
                    </div>
                })}
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
        {/* <Popup open={selectedUser !== undefined} >
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
        </Popup> */}
        {selectedUser && <SingleUserPage user={selectedUser} close={()=>{
            setSelectedUser(undefined);
        }}></SingleUserPage>}
        { selectedUser === undefined && <div>
                <SearchBar text={textFilter} setText={setTextFilter}/>
                <TableUsers filter={textFilter} setSelectedUser={setSelectedUser}/>
            </div>
        }
    </div>
}