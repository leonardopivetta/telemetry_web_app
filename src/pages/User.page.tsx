import { forgotPassword, logout } from "../firebase/firebase"
import { useUser } from "../hooks/useUser"

export const UserPage = () => {
    const user = useUser();

    return <div className="h-screen w-screen">
        {user && <div className="h-full container mx-auto py-3">
            <div className="text-xl">{user.name}</div>
            <div className="text-lg">{user.email}</div>
            <div className="md:w-1/2 my-2 space-y-2">
                <div className="w-full rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-400 p-2 text-center scale-98 hover:scale-100 duration-200"
                    onClick={() => {
                        forgotPassword(user.email).then(()=>alert(`Email sent to ${user.email}`))
                    }}
                >Change password</div>
                <div className="w-full rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-400 p-2 text-center scale-98 hover:scale-100 duration-200"
                    onClick={() => {
                        logout();
                    }}
                >Logout</div>
            </div>
        </div>}
    </div>
}