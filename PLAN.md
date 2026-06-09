# Background Job Test Plan — FinceptTerminal

## Repo
- Branch: `ultron/i-m-your-dev-i-57a614`
- Source: `feat/audit-build-deploy`

## Test Scenarios

### 1. Sequential Shell Jobs
- [ ] **A**: `cmake --preset linux-release`
- [ ] **B**: `python3 scripts/fmp_data.py --help` (after A completes)
- Verify: B waits for A, status transitions correct

### 2. Concurrent Shell Jobs
- [ ] **C**: `python3 scripts/fmp_data.py --help`
- [ ] **D**: `python3 scripts/yh_finance_data.py --help`
- [ ] **E**: `grep -r "class.*:" src/ --include="*.py" --include="*.cpp" -n`
- Verify: All three running simultaneously, distinct IDs, no output confusion

### 3. Mixed-Type Concurrency
- [ ] **F**: Shell job — Python script
- [ ] **G**: Site capture — `https://docs.python.org/3/`
- Verify: Independent tracking, no blocking

### 4. Cancel Flow
- [ ] **H**: `sleep 300 && echo "should-not-see-this"`
- Action: Cancel after ~15s via `cancel_job`
- Verify: Status = `cancelled`

### 5. Large-Output Job
- [ ] **I**: `grep -r "" src/ --include="*.cpp" --include="*.h" -n | wc -l`
- Verify: Output captured, not truncated

### 6. Error Handling
- [ ] **J**: `cmake --preset nonexistent-preset-foobar`
- Verify: Status = `failed`, error visible in `get_job`

## Execution Order
1. Run sequential (A → B)
2. Run concurrent (C, D, E)
3. Run mixed (F + G)
4. Run cancel (H → cancel)
5. Run large-output (I)
6. Run error (J)
7. List all jobs, verify states
