# Debugging Edit/Delete Button Visibility

## Steps to Debug

1. **Restart Both Servers**
   ```powershell
   # Backend
   cd Backend
   npm run dev
   
   # Frontend (new terminal)
   cd Frontend
   npm run dev
   ```

2. **Open Browser DevTools**
   - Press F12
   - Go to Console tab
   - Clear any existing logs

3. **Test Flow**
   - Sign in with your user account
   - Look for console log: `Home - Current user: { _id: "...", email: "...", name: "..." }`
   - Create a new note or refresh the page
   - Look for console logs: `NoteCard ownership check: { noteTitle: "...", noteUserId: "...", currentUserId: "...", match: true/false }`

4. **Check the Values**
   - **If `match: true`** → Buttons should appear (if not, check CSS/DOM)
   - **If `match: false`** → Compare `noteUserId` vs `currentUserId`:
     - Are they the same value but different types?
     - Is one undefined?
     - Do they have different formats?

## Common Issues & Solutions

### Issue 1: `currentUserId` is undefined or empty
**Cause**: User object not stored properly during login  
**Solution**: Check that `/me` endpoint returns user with `_id` field

### Issue 2: `noteUserId` is undefined
**Cause**: Notes don't have `user` field populated  
**Solution**: 
- Restart backend (model changes require restart)
- Create a new note (old notes may not have user field)
- Check `/getnotes` response in Network tab

### Issue 3: IDs don't match but look the same
**Cause**: Different string formats (e.g., ObjectId toString vs direct string)  
**Solution**: Already handled by `String()` conversion in code

### Issue 4: `match: true` but buttons still don't show
**Cause**: CSS issue or conditional rendering problem  
**Solution**: Check browser Elements tab to see if buttons exist in DOM

## Expected Console Output

```
Home - Current user: {_id: "67890abc...", email: "user@test.com", name: "user"}

NoteCard ownership check: {
  noteTitle: "My Test Note",
  noteUserId: "67890abc...",
  currentUserId: "67890abc...",
  match: true,
  noteUserRaw: {_id: "67890abc...", name: "user", email: "user@test.com"}
}
```

## After Debugging

Once you identify the issue:
1. Share the console output here
2. We'll apply the targeted fix
3. Remove debug logs for production

---

**Need Help?** Share:
- Console logs for `Home - Current user`
- Console logs for `NoteCard ownership check`
- Network tab response for `/getnotes` (one note example)
- Network tab response for `/me`
