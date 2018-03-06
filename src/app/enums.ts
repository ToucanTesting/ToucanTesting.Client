export enum DialogType {
    TestSuite = 'test-suite',
    TestRun = 'test-run',
    TestModule = 'test-module',
    TestCase = 'test-case'
}

export enum Priority {
    Low = 0,
    Medium,
    High,
    Critical
}

export enum TestResultStatus {
    Pass,
    Fail,
    CNT,
    NA,
    Pending
}
