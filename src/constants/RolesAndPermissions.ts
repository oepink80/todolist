// constants/RolesAndPermissions.ts
export interface Role {
    role: string;
    permissions: string[];
}

export const ROLES: Record<string, Role> = {
    ADMIN: {
        role: 'admin',
        permissions: ['read', 'write', 'edit', 'delete', 'admin']
    },
    EDITOR: {
        role: 'editor',
        permissions: ['read', 'write', 'edit']
    },
    READER: {
        role: 'reader',
        permissions: ['read']
    }
};

export const PERMISSIONS = Object.values(ROLES).flatMap(role => role.permissions);