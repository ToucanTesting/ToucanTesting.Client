import { Priority } from '../enums';
import { TestResult, TestAction, Base, TestCondition, ExpectedResult } from '@models';

export class TestCase extends Base {
    id: number;
    testModuleId: number;
    description: string;
    priority: Priority;
    isAutomated: boolean;
    isEnabled: boolean;
    bugId?: string;
    lastTested?: Date;
    testActions: TestAction[];
    testConditions: TestCondition[];
    expectedResults: ExpectedResult[];
    testResult: TestResult;
}
