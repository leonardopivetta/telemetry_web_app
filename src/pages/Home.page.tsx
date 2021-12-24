import { FunctionComponent } from "react"

const SearchBar: FunctionComponent<{}> = props => {
    return <div>
        SearchBar
    </div>
}

const Table: FunctionComponent<{ data: Array<{}> }> = props => {
    return <div>
        Table
    </div>
}

const LeftSection = () => {
    return <div>
        <SearchBar />
        <Table data={[]} />
    </div>
}


const RightSection = () => {
    return <div>
        RightSection
    </div>
}

/** Home page react element */
export const Home = () => {
    return <div className="container h-screen flex space-x-2 mx-auto">
        <div className="w-2/3 bg-red-500">
            <div className="w-full h-screen">
                <LeftSection />
            </div>
        </div>
        <div className="w-1/3 bg-violet-600">
            <div className="w-full h-screen">
                <RightSection />
            </div>
        </div>
    </div>
}