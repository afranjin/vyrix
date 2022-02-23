export enum Permissions  {
  AdministrateUser = 'administrate-users',
  AdministrateEmailConfiguration = 'administrate-email-configuration'
}

export const allPermissions = (): Permissions[] => {
  return Object.values(Permissions).map(val => val);
}