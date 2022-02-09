import { FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDashboards, getSession } from "../firebase/firestore";
import { useUser } from "../hooks/useUser";
import { Dashboard } from "../types/Dashboard";
import { Session } from "../types/Session";
import { SetupPage } from "./SetupPage/Setup.page";

const SetupTab: FunctionComponent = () => {
    const user = useUser();
    return <div>
        <SetupPage framed editable={user?.customClaims.setup_edit}/>
    </div>
}

export const DashboardsPage: FunctionComponent<{}> = props => {
    // Params from the matching id in the url
    const params = useParams();
    const id = params.id;
    // Hooks for session download and dashboard download
    const [session, setSession] = useState<Session | undefined>(undefined);
    const [dashboards, setDashboards] = useState<Array<Dashboard>>([]);
    // Active dashboard (-1 means no dashboard is active)
    const [active, setActive] = useState(-1);

    // Builds the link to the dashboard with the corrrisponding time
    const buildLink = (link: string): string => {
        return `${link}?orgId=1&from=${session!.from.seconds * 1000}&to=${session!.to.seconds * 1000}&kiosk`;
    }

    useEffect(() => {
        if (!id) return;
        // Gets the sessions from firestore
        let isMounted = true;
        getSession(id).then(sess => {
            if(isMounted) setSession(sess)
        })
        // Gets the dashboards from firestore
        getDashboards().then(res => {
            // Adds a dashbord for the setup viewing page
            res = res.concat([{ title: "Setup", link: "" }]);
            if(isMounted) setDashboards(res);
        }).then(() => {
            if(isMounted) setActive(0)
        });
        return () => {isMounted = false}
    }, [id]);

    // Assertion on the id
    if (!id) return <div>No id provided</div>

    return <div className="h-screen w-screen">
        <div className="container h-full mx-auto flex flex-col">
            <div className="w-full flex overflow-x-auto" id="dashboard-list">
                {dashboards.map((dashboard, index) => {
                        return <div className={"p-2 px-5 m-2 rounded-3xl scale-98 hover:scale-100 duration-200 cursor-pointer " + (index === active ? "bg-yellow-400 scale-100" : "border")}
                            onClick={() => {
                                // On the click of the div the selected dashboard is set as active
                                setActive(index);
                            }} key={dashboard.title}>
                            {dashboard.title}
                        </div>
                    })
                }
            </div>
            <div className="flex-grow" id="dashboard-section">
            {active === -1 && <div>Loading dashboards</div>}
            {active !== -1 && active !== dashboards.length - 1 && <iframe src={buildLink(dashboards[active].link)} className="w-full h-full" title={dashboards[active].title} />}
            {active === dashboards.length -1 && <SetupTab/>}
            </div>
        </div>
    </div>
}