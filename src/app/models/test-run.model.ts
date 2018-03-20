import { Base, TestSuite, TestResult } from '@models';

export class TestRun extends Base {
    id: number;
    name: string;
    testSuite: TestSuite;
    testSuiteId?: number;
    testResults: TestResult[];
}
