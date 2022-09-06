import { Entity } from '../../../core/domain/Entity';

export interface IRoleProps {
    name: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export class Role extends Entity<IRoleProps>{

    private constructor(props: IRoleProps, id?: string) {
        super(props, id);
    }

    static create(props: IRoleProps, id?: string): Role {
        const role = new Role({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return role;
    }

}