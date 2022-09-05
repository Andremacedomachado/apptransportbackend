import { User } from '../../../domain/entities/users/User';
import { UserId, IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';



export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(data: ICreateUserRequestDTO): Promise<UserId | Error> {
        const userExist = await this.userRepository.findByEmail(data.email);
        if (userExist) {
            return new Error('User alright exist');
        }
        const user = User.create(data);
        const id = await this.userRepository.save(user);
        if (!id) {
            return new Error('Error save user in database');
        }
        return id;

    }
}