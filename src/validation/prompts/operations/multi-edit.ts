export const MULTI_EDIT = `## Analyzing MultiEdit Operations

This section shows the code changes being proposed. Compare the old content with the new content to identify what's being added, removed, or modified.

### Your Task
You are reviewing a MultiEdit operation where multiple edits are being applied to the same file. Each edit must be evaluated for TDD compliance.

**FIRST**: Check the file path to identify if this is a test file (\`.test.\`, \`.spec.\`, or \`test/\`) or implementation file.

### How to Analyze Multiple Edits

1. **Process edits sequentially**
   - Each edit builds on the previous one
   - Track cumulative changes across all edits
   - Count total new tests across ALL edits

2. **Counting new tests across edits:**
   - Start with the original file content
   - Apply each edit in sequence
   - Count tests that appear in final result but not in original
   - Multiple new tests across all edits = Violation

3. **Common patterns to watch for:**
   - Edit 1: Adds one test (OK)
   - Edit 2: Adds another test (VIOLATION - 2 total new tests)

### Test File Changes

**For test files**: Adding ONE new test total across all edits is allowed - no test output required. Multiple new tests = violation.
   
### Implementation Changes in MultiEdit

1. **Each edit must be justified**
   - Check if test output supports the change
   - Verify incremental implementation
   - No edit should over-implement

2. **Sequential dependency**
   - Later edits may depend on earlier ones
   - But this doesn't justify multiple new tests
   - Each edit should still follow minimal implementation

### Refactor Phase in MultiEdit

**PREREQUISITE** — Both conditions must be met before allowing refactoring:
1. The test output must contain tests **for the code being modified** (not just any passing tests). If the test output only covers unrelated modules, block — there is no evidence the changed code is tested.
2. ALL tests in the output must be passing. If ANY test is failing, block — even if the failing tests seem unrelated to the change.

If either condition is not met, block and instruct the developer to run the relevant tests first.

When both conditions are met, refactoring across multiple edits in the same file is allowed.
Refactoring changes code structure while preserving identical observable behavior.

#### Implementation File Refactoring
- Multiple edits that restructure, rename, or clean up code within the same file
- Removing unused/dead code (methods, functions, classes no longer called)
- Extracting methods/functions into new locations within the file

For dead code removal, the relevant tests are those for the code that *remains* in the file. If those tests pass, removing unused code is safe.

#### Test File Refactoring
- Multiple edits that restructure test setup or helpers
- Removing tests for code that no longer exists (dead code cleanup, not coverage reduction)

#### When refactoring is not the right phase:
- Adding new behavior or features requires a failing test first (start a new red phase)
- Changing observable behavior requires a failing test that specifies the new behavior

**Example - Valid refactoring via MultiEdit:**
- Test output: All Calculator tests passing
- Edit 1: Renames \`_internalCalc\` method to \`computeResult\`
- Edit 2: Updates all callers of the renamed method within the same file
- Analysis: Rename refactoring with passing tests, behavior preserved → Allow

### Example MultiEdit Analysis

**Edit 1**: Adds empty Calculator class
- Test output: "Calculator is not defined"
- Analysis: Appropriate minimal fix

**Edit 2**: Adds both add() and subtract() methods
- Test output: "calculator.add is not a function"
- Analysis: VIOLATION - Should only add add() method

**Reason**: "Over-implementation in Edit 2. Test only requires add() method but edit adds both add() and subtract(). Implement only the method causing the test failure."
`
