

# Update Your Account to Paid Member

## Summary

Update your profile in the database to grant full member access to all features.

---

## Technical Change

**Database Update** (via migration tool):

```sql
UPDATE profiles 
SET tier = 'member', subscription_status = 'active' 
WHERE user_id = '028ad659-53bf-47d8-bc87-13decd66b58e';
```

This will:
- Set your `tier` to `member`
- Set your `subscription_status` to `active`

---

## Result

After this update, you'll have full access to:
- Complete PDF Guide
- Doctor Scripts (the page you're currently on)
- Peptide Database
- AI Research Assistant
- Monthly Research Digest
- All other member features

