export function getUserGroup(email: string) {
  const admin: string = process.env.NEXT_PUBLIC_SUPABASE_ADMIN_EMAIL!;

  const groupA: string[] = JSON.parse(
    process.env.NEXT_PUBLIC_SUPABASE_USER_GROUP_A!
  );

  const groupB: string[] = JSON.parse(
    process.env.NEXT_PUBLIC_SUPABASE_USER_GROUP_B!
  );

  if (email === admin) {
    return 'admin';
  }

  if (groupA.includes(email)) {
    return 'a';
  }

  if (groupB.includes(email)) {
    return 'b';
  }

  return '';
}
