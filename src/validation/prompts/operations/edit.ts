export const EDIT = `## Analyzing Edit Operations

This section shows the code changes being proposed. Compare the old content with the new content to identify what's being added, removed, or modified.

### Your Task
You are reviewing an Edit operation where existing code is being modified. You must determine if this edit violates TDD principles.

**IMPORTANT**: First identify if this is a test file or implementation file by checking the file path for \`.test.\`, \`.spec.\`, or \`test/\`.

### How to Count New Tests
**CRITICAL**: A test is only "new" if it doesn't exist in the old content.

1. **Compare old content vs new content character by character**
   - Find test declarations: \`test(\`, \`it(\`, \`describe(\`
   - A test that exists in both old and new is NOT new
   - Only count tests that appear in new but not in old
   - Count the NUMBER of new tests added, not the total tests in the file

2. **What counts as a new test:**
   - A test block that wasn't in the old content
   - NOT: Moving an existing test to a different location
   - NOT: Renaming an existing test
   - NOT: Reformatting or refactoring existing tests

3. **Multiple test check:**
   - One new test = Allowed (part of TDD cycle)
   - Two or more new tests = Violation

**Example**: If old content has 1 test and new content has 2 tests, that's adding 1 new test (allowed), NOT 2 tests total.

### Analyzing Test File Changes

**For test files**: Adding ONE new test is ALWAYS allowed - no test output required. This is the foundation of TDD.

### Analyzing Implementation File Changes

**For implementation files**:

1. **Check the test output** to understand the current failure
2. **Match implementation to failure type:**
   - "not defined" → Only create empty class/function
   - "not a constructor" → Only create empty class
   - "not a function" → Only add method stub
   - Assertion error (e.g., "expected 0 to be 4") → Implement minimal logic to make it pass
   
3. **Verify minimal implementation:**
   - Don't add extra methods
   - Don't add error handling unless tested
   - Don't implement features beyond current test

### Example Analysis

**Scenario**: Test fails with "Calculator is not defined"
- Allowed: Add \`export class Calculator {}\`
- Violation: Add \`export class Calculator { add(a, b) { return a + b; } }\`
- **Reason**: Should only fix "not defined", not implement methods

### Analyzing Refactor Phase Changes

**PREREQUISITE** — Both conditions must be met before allowing refactoring:
1. The test output must contain tests **for the code being modified** (not just any passing tests). If the test output only covers unrelated modules, block — there is no evidence the changed code is tested.
2. ALL tests in the output must be passing. If ANY test is failing, block — even if the failing tests seem unrelated to the change.

If either condition is not met, block and instruct the developer to run the relevant tests first.

When both conditions are met, the developer is in the refactor phase.
Refactoring changes code structure while preserving identical observable behavior.

#### Implementation File Refactoring

When all tests pass, these changes to implementation files are allowed:
- Restructuring code (extracting methods/functions, renaming, moving code)
- Removing unused/dead code (methods, functions, classes no longer called)
- Simplifying logic without changing behavior
- Adding types, interfaces, or constants to replace magic values

For dead code removal, the relevant tests are those for the code that *remains* in the file. If those tests pass, removing unused code is safe.

#### Test File Refactoring

When all tests pass, these changes to test files are allowed:
- Restructuring tests (extracting setup to beforeEach, extracting helpers)
- Removing tests for code that no longer exists (this is dead code cleanup, not coverage reduction)
- Renaming or reorganizing test descriptions

**Important**: Removing tests during refactoring is valid cleanup when the code they tested has been removed. Coverage of dead code has no value.

#### When refactoring is not the right phase:
- Adding new behavior or features requires a failing test first (start a new red phase)
- Changing observable behavior requires a failing test that specifies the new behavior
- Adding new tests is starting a new TDD cycle (separately allowed under test file rules)

**Example 1 - Valid: extracting a helper method:**
- Test output: All Calculator tests passing
- Edit to implementation file: Extracts repeated validation into a private \`validateNumbers()\` method
- Analysis: Structure changes, behavior preserved → Allow

**Example 2 - Valid: removing dead code from implementation:**
- Test output: All tests passing
- Edit to implementation file: Removes \`_find_english_subtitles()\` method that is no longer called
- Analysis: Unused code removal with passing tests → Allow

**Example 3 - Valid: removing tests for dead code:**
- Test output: All tests passing
- Edit to test file: Removes 4 tests for \`_find_english_subtitles()\` which was already removed from the implementation
- Analysis: Tests for removed code are cleanup, not coverage reduction → Allow

**Example 4 - Invalid: sneaking in new behavior during refactoring:**
- Test output: All Calculator tests passing
- Edit to implementation file: Refactors \`add()\` AND adds input validation that throws on NaN
- Analysis: Input validation is new behavior without a failing test → Block. Refactor the structure first, then write a test for NaN handling.

**Example 5 - Invalid: removing tests while other tests are failing:**
- Test output: \`adds two numbers\` FAILING with "expected 0 to be 4", \`subtracts two numbers\` passing
- Edit to test file: Removes the test for \`oldAdd()\`
- Analysis: Tests are failing — the prerequisite for refactoring is not met. Even though the removed test is for different code, ALL tests must pass before any refactoring (including cleanup). → Block. Fix the failing \`adds two numbers\` test first, then clean up dead tests.
`
