import { FunctionComponent, useEffect, useState } from "react"
import { BigButton } from "../components/bigButton"
import logo from "../assets/logo.png"
import { getSessions } from "../firebase/firestore"
import { Session } from "../types/Session"
import { useNavigate } from "react-router-dom"
import Popup from "reactjs-popup"
import { useUser } from "../hooks/useUser"

/** 
 * @param setSearc The function for updating the search value
 * @returns JSX element for the search bar
 */
const SearchBar: FunctionComponent<{setSearch: Function}> = props => {
    return <div className="w-full py-2">
        <input type="text" className="bg-white w-full rounded-3xl text-black p-2 placeholder:text-gray-500 transform hover:scale-102 focus:scale-102 duration-200" 
            placeholder="Search..." onChange={e => props.setSearch(e.target.value)}/>
    </div>
}

const DonwloadPopup: FunctionComponent<{session: Session}> = props => {
    return <Popup trigger={
        <div>
            Popup
        </div>
    } position={"left bottom"}>
        <div className="p-2 h-20 w-200 bg-white text-black">download options TODO</div>
    </Popup>
}

/**
 * @param data The data to be displayed
 * @param filterText The text immitted by the user in the search bar
 * @returns JSX element for the list of the sessions
 */
const Table: FunctionComponent<{ data: Array<Session>, filterText: string }> = props => {
    const navigate = useNavigate();
    return <div className="w-full hfull flex-grow border rounded-xl overflow-y-auto mb-5">
        <table className="table-auto border-collapse min-w-full max-h-full">
            <thead className="table-header-group text-left">
                <tr className="bg-slate-700 ">
                    <th className="pl-2 font-bold">Name</th>
                    <th className="pl-2 font-bold">Date</th>
                    <th className="pl-2 font-bold">Position</th>
                    <th className="pl-2 font-bold">#Laps</th>
                    <th className="pl-2 font-bold">Duration (mm:ss)</th>
                    <th className="pl-2 font-bold">Download</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
            {props.data
                .filter(e => e.name.toLowerCase().includes(props.filterText.toLowerCase()) ||
                 e.from.toDate().toLocaleDateString("it-IT").toLowerCase().includes(props.filterText.toLowerCase()))
                .map(session => {
                    const duration = session.to.seconds - session.from.seconds;
                    const minutes = Math.floor(duration / 60);
                    const seconds = duration % 60;
                    return <tr className="py-1" key={session.id}
                        onClick={()=>{
                            navigate(`/dash/${session.id}`);
                        }}>
                        <td className="pl-2">{session.name}</td>
                        <td className="pl-2">{session.from.toDate().toLocaleDateString("it-IT")}</td>
                        <td className="pl-2">{session.position.latitude}</td>
                        <td className="pl-2">{session.nLaps}</td>
                        <td className="pl-2">{minutes}:{('0'+seconds).slice(-2)}</td>
                        <td className="pl-2"><DonwloadPopup session={session}/></td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

/**
 * @returns JSX element for the left section containing the search bar and the list of the sessions
 */
const LeftSection = () => {
    // Hook state for the search text
    const [searchText, setSearchText] = useState("");
    // Hook state for the list of the sessions
    const [data, setData] = useState<Array<Session>>([]);
    useEffect(() => {
        let isMounted = true;
        // Get the list of the sessions from Firestore and update the state
        getSessions().then(res => {
            if(isMounted) setData(res);
        });
        return () => {isMounted = false}
    }, []);

    return <div className="h-full flex flex-col pt-3">
        <SearchBar setSearch={setSearchText}/>
        <Table data={data} filterText={searchText}/>
    </div>
}

/**
 * @returns JSX element for the right section containing the buttons for the other pages
 */

const RightSection = () => {
    const user = useUser();
    const navigate = useNavigate();
    return <div className="mx-auto w-full max-w-full h-full px-5 flex flex-col">
        <div className="space-y-5 mt-6 flex-grow flex flex-col overflow-y-auto px-3 overflow-x-clip">
            <BigButton name="Car setup" onClick={()=>{
                navigate("/setup")
            }}></BigButton>
            <BigButton name="realtime 2" onClick={()=>{}}></BigButton>
            <BigButton name="realtime 3" onClick={()=>{}}></BigButton>
        </div>
        <div className="mb-5 mt-3">
            <img src={logo} alt="Eagle logo" className="w-2/3 mx-auto my-auto"/>
        </div>
        {
            user?.customClaims.admin && <BigButton name="admin" onClick={()=> {
                navigate('/admin')
            }}></BigButton>
        }
    </div>
}

/**
 * @returns JSX element for the home page
 */
export const Home = () => {
    return <div className="container h-screen flex space-x-2 mx-auto">
        <div className="w-2/3">
            <div className="w-full h-screen">
                <LeftSection />
            </div>
        </div>
        <div className="w-1/3">
            <div className="w-full h-screen flex flex-col">
                <RightSection />
            </div>
        </div>
    </div>
}