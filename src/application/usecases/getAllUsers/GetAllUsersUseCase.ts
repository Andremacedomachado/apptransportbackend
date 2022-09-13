import { User } from '../../../domain/entities/users/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IGetAllUsersResponseDTO, IUsersResponseDTO } from './GetAllUsersDTO';


export class GetAllUsersUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) {
    }

    async execute(): Promise<Error | IGetAllUsersResponseDTO> {
        const users = await this.userRepository.findAll();
        if (!users) {
            return new Error('Not exist Users');
        }

        const allUsersResponse: IGetAllUsersResponseDTO = {
            users: users.map((user) => {
                const userResponse: IUsersResponseDTO = {
                    name: user.props.name,
                    email: user.props.email,
                    createdAt: user.props.createdAt,
                    updatedAt: user.props.updatedAt
                };
                return userResponse;
            }),
            count: users.length,
        };
        return allUsersResponse;

    }
}