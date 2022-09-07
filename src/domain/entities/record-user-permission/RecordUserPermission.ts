
export interface IRecordUserPermission {
    userId: string,
    permissionId: string,
    createdAt: Date,
    providerId: string
}

export class RecordUserPermission implements IRecordUserPermission {
    userId: string;
    permissionId: string;
    createdAt: Date;
    providerId: string;

    constructor(data: IRecordUserPermission) {
        this.userId = data.userId;
        this.permissionId = data.permissionId;
        this.createdAt = data.createdAt;
        this.providerId = data.providerId;
    }

}