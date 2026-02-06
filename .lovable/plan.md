
# Fix: Protocol Buttons Triggering Together

## The Problem

When you click "Resume" or "Pause" on one protocol, all the buttons across all protocol cards react simultaneously. This happens because:

1. The mutations (`pauseProtocol.isPending`, `resumeProtocol.isPending`) are **global** to the hook
2. All `ProtocolCard` components receive the same pending state
3. There's no tracking of **which specific protocol** is being mutated

## The Solution

Track the currently-mutating protocol ID so only that specific card shows loading state.

### Changes to `Protocols.tsx`

Add local state to track which protocol ID is currently being acted upon:

```typescript
const [mutatingId, setMutatingId] = useState<string | null>(null);
const [mutationType, setMutationType] = useState<"start" | "pause" | "resume" | null>(null);
```

Wrap the mutation calls to set/clear the tracking state:

```typescript
const handleStart = async (id: string) => {
  setMutatingId(id);
  setMutationType("start");
  await startProtocol.mutateAsync(id);
  setMutatingId(null);
  setMutationType(null);
};

// Similar for pause and resume
```

Pass per-card pending state:

```typescript
<ProtocolCard
  ...
  isStarting={mutatingId === protocol.id && mutationType === "start"}
  isPausing={mutatingId === protocol.id && mutationType === "pause"}
  isResuming={mutatingId === protocol.id && mutationType === "resume"}
/>
```

## Files Changed

| File | Changes |
|------|---------|
| `src/pages/dashboard/Protocols.tsx` | Add `mutatingId` and `mutationType` state, wrap mutation calls in handlers that track which card is loading |

## Result

- Click "Pause" on Protocol A → Only Protocol A's button shows "Pausing..."
- Click "Resume" on Protocol B → Only Protocol B's button shows "Resuming..."
- Other cards remain unaffected

## Technical Note

Using `mutateAsync` instead of `mutate` allows us to properly wait for completion before clearing the loading state. We wrap in try/finally to ensure state cleanup even on errors.
