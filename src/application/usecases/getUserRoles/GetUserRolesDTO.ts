
export interface IGetUserRolesRequestDTO {
    userId: string
}

export interface IRoleDataResponseDTO {
    roleId: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
}
export interface IGetUserRolesResponseDTO {
    roles: IRoleDataResponseDTO[],
    count: number
}