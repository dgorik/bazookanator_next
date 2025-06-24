export function cleanedSQL(sqlString: string) {
  return sqlString
    .replace(/```sql\s*/gi, '')
    .replace(/```/g, '')
    .replace(/;\s*$/, '')
    .trim()
}