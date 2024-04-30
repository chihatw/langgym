import {
  JetBrains_Mono as FontMono,
  Noto_Serif_TC as FontPinyin,
  Noto_Sans_HK as FontSans,
  Zen_Maru_Gothic,
} from 'next/font/google';

export const fontSans = FontSans({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontZenMaruGothic = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['400', '300'],
});

export const fontPinyin = FontPinyin({
  subsets: ['latin'],
  weight: ['400'],
});
