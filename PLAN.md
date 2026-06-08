# Background Job Test Plan — FinceptTerminal

Branch: `ultron/bg-job-tests`
Date: Live test session

## Real Work Candidates
- C++ CMake configure (no Qt install — just configure step)
- Python data scripts in `fincept-qt/scripts/` (real code, real execution)
- Large repo grep/find across 3,312 files
- Static analysis / linting

## Test Scenarios

### 1. Sequential Shell Jobs
- **Job A**: CMake configure with preset `linux-release`  
  Command: `cd fincept-qt && cmake --preset linux-release`
- **Job B**: After A completes, run a Python script  
  Command: `python3 fincept-qt/scripts/fmp_data.py --help` or similar
- **Verify**: B waits for A, status transitions correct

### 2. Concurrent Shell Jobs
- **Job C**: `python3 fincept-qt/scripts/fmp_data.py` (or harmless dry-run)
- **Job D**: `python3 fincept-qt/scripts/yh_finance_data.py` (dry-run)
- **Job E**: A long grep across the whole repo  
  Command: `grep -r "class.*:" fincept-qt/src/ --include="*.py" --include="*.cpp" -n`
- **Verify**: All three show as running simultaneously, distinct job IDs, no output confusion

### 3. Mixed-Type Concurrency
- **Job F**: Shell job — Python script execution
- **Job G**: Site capture — `https://docs.python.org/3/` (small static docs site)
- **Verify**: Independent tracking, one does not block the other

### 4. Cancel Flow
- **Job H**: Long-running shell job  
  Command: `sleep 300 && echo "should-not-see-this"`
- **Action**: Cancel after ~30 seconds via `cancel_job`
- **Verify**: Status = `cancelled`, not `failed` or `running`

### 5. Large-Output / Resource Job
- **Job I**: Heavy grep with huge stdout  
  Command: `grep -r "" fincept-qt/src/ --include="*.cpp" --include="*.h" -n | wc -l` followed by verbose output dump
- **Verify**: Output captured, not truncated to zero

### 6. Error Handling
- **Job J**: Intentionally bad command  
  Command: `cmake --preset nonexistent-preset-foobar`
- **Verify**: Status = `failed`, error message visible in `get_job`

## Execution Order
1. Write PLAN.md (done)
2. Run sequential jobs (A → B)
3. Run concurrent jobs (C, D, E)
4. Run mixed-type jobs (F + G)
5. Run cancel flow (H → cancel)
6. Run large-output job (I)
7. Run error job (J)
8. List all jobs, verify states
