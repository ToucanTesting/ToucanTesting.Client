import { Priority } from '../enums';
import { TestCase, Base } from '@models';

export class TestResult extends Base {
    id: number;
    index?: number;
    testCaseId: number;
    testRunId: number;
    status: number;
}
