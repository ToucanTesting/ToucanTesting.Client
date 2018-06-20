import { Priority } from '../enums';
import { Base } from '@models';

export class ExpectedResult extends Base {
    id: number;
    testCaseId?: number;
    description: string;
    sequence: number;
    isEditing?: boolean;
}
