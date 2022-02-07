import { FunctionComponent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {adminGetRequest} from "../firebase/firebase_admin";

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
const TableUsers: FunctionComponent<{filter:string}> = props => {
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
    },[]);
    const navigate = useNavigate();
    return <div className="w-full h-full overflow-y-auto">
            <div className="p-1 px-2 border my-2 rounded-3xl transform hover:scale-100 duration-100 scale-98 hover:bg-yellow-300 hover:border-yellow-300 hover:text-black text-center font-bold bg-gray-500"
                onClick={() => navigate("/admin/createUser/")}>
                New user
            </div>
            {users.filter(e=> e.email.toLowerCase().includes(props.filter)).map(user => {
                    return <div className="p-1 px-2 border my-2 rounded-3xl transform hover:scale-100 duration-100 scale-98 hover:border-yellow-300"
                        onClick={()=> navigate("./showUser/"+user.uid)} key={user.uid}>
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
    return <div className="h-screen container mx-auto flex flex-col">
        <SearchBar text={textFilter} setText={setTextFilter}/>
        <TableUsers filter={textFilter}/>
    </div>
}