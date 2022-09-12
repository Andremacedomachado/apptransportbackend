export interface IRecordUserRole {
    userId: string,
    roleId: string,
    createdAt: Date,
    updatedAt: Date
}

export class RecordUserRole implements IRecordUserRole {
    constructor(public userId: string, public roleId: string, public createdAt: Date, public updatedAt: Date) {
    }
}