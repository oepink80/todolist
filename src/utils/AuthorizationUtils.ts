import { ROLES } from '@/constants/RolesAndPermissions';

class AuthorizationService {
    private userRole?: string;

    constructor(userRole?: string) {
        this.userRole = userRole;
    }

    hasRole(role: string): boolean {
        return this.userRole === role;
    }

    hasPermission(permission: string): boolean {
        if (!this.userRole) return false;
        const roles = Object.keys(ROLES);
        for (const r of roles) {
            if (ROLES[r].role === this.userRole && ROLES[r].permissions.includes(permission)) {
                return true;
            }
        }
        return false;
    }
}

export default AuthorizationService;