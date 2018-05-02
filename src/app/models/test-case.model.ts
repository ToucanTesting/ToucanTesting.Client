import { Priority } from '../enums';
import { TestResult, TestAction, Base, TestCondition, ExpectedResult, TestIssue } from '@models';

export class TestCase extends Base {
    id: number;
    testModuleId: number;
    description: string;
    priority: Priority;
    isAutomated: boolean;
    automationId: string;
    isEnabled: boolean;
    lastTested?: Date;
    testActions: TestAction[];
    testConditions: TestCondition[];
    expectedResults: ExpectedResult[];
    testIssues: TestIssue[];
    testResult: TestResult;
}
