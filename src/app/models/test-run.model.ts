import { Base, TestSuite, TestResult, TestIssue } from '@models';

export class TestRun extends Base {
    id: number;
    name: string;
    testSuite: TestSuite;
    testSuiteId?: number;
    testResults: TestResult[];
    testIssues: TestIssue[];
}
