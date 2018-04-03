import { Priority } from '../enums';
import { Base, TestCase } from '@models';

export class TestIssue extends Base {
    id: number;
    testCaseId: number;
    testCase: TestCase;
    reference: string;
    description: string;
}
