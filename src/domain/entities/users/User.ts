import { Entity } from '../../../core/domain/Entity';

interface IUserProps {
    name: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export class User extends Entity<IUserProps>{

    private constructor(props: IUserProps, id?: string) {
        super(props, id);
    }

    static create(props: IUserProps, id?: string): User {
        const user = new User({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);
        return user;
    }



}