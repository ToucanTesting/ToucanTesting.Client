import { TestCase, TestResult, Base } from '@models';

export class TestModule extends Base {
    id: number;
    testSuiteId?: number;
    name: string;
    sequence: number;
    testCases: TestCase[];
    testResults: TestResult[];
    passes: TestResult[];
    failures: TestResult[];
    cnt: TestResult[];
    na: TestResult[];
    sort: string;
    reverse: boolean;
};
