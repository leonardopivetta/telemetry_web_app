export interface User {
    user_id: string;
    email: string;
    name: string;
    email_verified: boolean;
    // Determines if the user is allowed to edit the setup data
    setup_edit: boolean = false;
    // Admin privilege
    admin: boolean = false;
}

export enum LockedUserKeys  {"user_id"};

export default User;