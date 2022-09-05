import { Entity } from '../../../core/domain/Entity';

export interface IPermissionProps {
    name: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export class Permission extends Entity<IPermissionProps>{

    private constructor(props: IPermissionProps, id?: string) {
        super(props, id);
    }
    static create(props: IPermissionProps, id?: string): Permission {
        const permission = new Permission({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);
        return permission;
    }
}