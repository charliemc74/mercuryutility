import { PPmStatus } from './ppmstatus';
import { PPmType } from './ppmtype';

export interface PPmSummary {
    id: number;
    ppmStatusId: number;
    ppmStatusName: string;
    ppmScheduleId?: number;
    ppmTypeId: number;
    ppmTypeName: string;
    siteId: number;
    dueDate?: Date;
    sourceId?: number;
    createdOn?: Date;
    createdBy?: string;
    updatedOn?: Date;
    updatedBy?: string;
    completedOn?: Date;
    ppmStatus: PPmStatus;
    ppyTpye: PPmType;
}