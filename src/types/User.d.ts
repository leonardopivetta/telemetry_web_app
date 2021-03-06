export type User = {
    user_id: string;
    email: string;
    name: string;
    email_verified: boolean;
    customClaims: {
        // Determines if the user is allowed to edit the setup data
        setup_edit: boolean = false;
        // Admin privilege
        admin: boolean = false;
    }
}

export default User;