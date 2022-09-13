export interface IUsersResponseDTO {
    name: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IGetAllUsersResponseDTO {
    users: IUsersResponseDTO[],
    count: number
}