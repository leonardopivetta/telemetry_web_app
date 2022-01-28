import { FunctionComponent, useState } from "react"

/** 
 * @param setSearc The function for updating the search value
 * @returns JSX element for the search bar
 */
const SearchBar: FunctionComponent<{setSearch: Function}> = props => {
    return <div className="w-full px-2 py-2">
        <input type="text" className="bg-white w-full rounded-3xl text-black p-2 placeholder:text-gray-500" 
            placeholder="Search..." onChange={e => props.setSearch(e.target.value)}/>
    </div>
}

/**
 * @param data The data to be displayed
 * @param filterText The text immitted by the user in the search bar
 * @returns JSX element for the list of the sessions
 */
const Table: FunctionComponent<{ data: Array<{}>, filterText: string }> = props => {
    return <div className="w-full flex-grow px-2">
        <table className="w-full table-auto rounded-xl border">
            <thead className="table-header-group">
                <th>Name</th>
                <th>Date</th>
                <th>Position</th>
                <th>#Laps</th>
                <th>Duration</th>
            </thead>
            {props.data.filter(item => item.toString().toLowerCase().includes(props.filterText.toLowerCase())).map(item => {
                    return <tr className="table-row-group">
                        <td className="border px-4 py-2">{item.toString()}</td>
                    </tr>
                })}
        </table>
    </div>
}

/**
 * @returns JSX element for the left section containing the search bar and the list of the sessions
 */
const LeftSection = () => {
    // Hook state for the search text
    const [searchText, setSearchText] = useState("");
    return <div className="h-full flex flex-col">
        <SearchBar setSearch={setSearchText}/>
        <Table data={[]} filterText={searchText}/>
    </div>
}

/**
 * @returns JSX element for the right section containing the buttons for the other pages
 */

const RightSection = () => {
    return <div className="my-auto mx-auto">
        RightSection
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
        <div className="w-1/3 bg-violet-600">
            <div className="w-full h-screen flex flex-col">
                <RightSection />
            </div>
        </div>
    </div>
}