# Remote 接続時の、Magic Link
- welcome page にいかない時は、`signInWithMagicLink`のurlを`localhost`にする

# Restore
- Remote の接続先はダッシュボードで確認して
- `dashboard > Settings > Database > Connection string`
```shell
psql \
-h aws-0-ap-northeast-1.pooler.supabase.com \
-p 6543 \
-d postgres \
-U postgres.fclyvkyxokodkqipxorr \
-f backup.dump
# Password for user postgres.fclyvkyxokodkqipxorr:
```

# Run in local
## Start
```shell
supabase start
```
## Open Studio
- `http://127.0.0.1:54323/project/default`
- もし todos テーブルがなければ
```sql
create table
  public.todos (
    id bigint generated always as identity,
    created_at timestamp with time zone not null default now(),
    title text null,
    completed boolean null default false,
    created_by uuid null default auth.uid ()
  ) tablespace pg_default;
```

## change `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
NEXT_PUBLIC_SUPABASE_ADMIN_EMAIL=chiha.tw@gmail.com
```
- `signInWithMagicLink`のurlを`127.0.0.1`にする
- `localhost`では`welcome`ページにリダイレクトされない
- 1回目は必ず失敗するので、気にせず2回ログインする

## start project
```
pnpm dev
```


