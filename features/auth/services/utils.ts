export function getUserGroup(email: string) {
  const admin: string = process.env.NEXT_PUBLIC_SUPABASE_ADMIN_EMAIL || '';

  const groupA: string[] = JSON.parse(
    process.env.NEXT_PUBLIC_SUPABASE_USER_GROUP_A || ''
  );

  if (email === admin) {
    return 'admin';
  }

  if (groupA.includes(email)) {
    return 'a';
  }

  return '';
}
