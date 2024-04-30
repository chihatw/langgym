export function buildPeaks(channelData: Float32Array, canvasWidth: number) {
  const step = Math.floor(channelData.length / canvasWidth);

  const peaks = new Array(canvasWidth).fill('').map((_, i) => {
    const range = channelData.slice(i * step, (i + 1) * step); // slice は end を含まない
    return Math.max(...range); // Float32Array を展開?するには tsconfig.json target を ES2016 以降に設定する必要あり
  });

  const max_peak = Math.max(...peaks);
  const peaks_ratio = peaks.map((peak) => Math.abs(peak) / max_peak);
  return peaks_ratio;
}

export function buildMarks(
  audioBuffer: AudioBuffer,
  channelData: Float32Array,
  silentDuration: number
) {
  const STEP = 0.01;
  const steps = Math.floor(audioBuffer.duration / STEP); // 総サンプリング回数

  // サンプリングして -0.001 < x < 0.001 の音量は0にする
  const sumples = new Array(steps).fill('').map((_, i) => {
    const volume = channelData[i * (audioBuffer!.sampleRate * STEP)];
    return Math.abs(volume) < 0.001 ? 0 : volume;
  });
  let start = -1;
  let tmpEnd = -1;

  const marks: { start: number; end: number }[] = [];

  for (let i = 0; i < sumples.length; i++) {
    const sumple = sumples[i];

    if (sumple !== 0) {
      /////////////////////////////////
      /** 1. 抽出したデータに音がある場合 */
      /////////////////////////////////
      const has_volume_time = Math.floor(i / 10) / 10;

      // 1-1. エンド時間がある場合（当然、スタート時間もある）
      if (tmpEnd >= 0) {
        // 無音の継続時間が基準を満たせば、 start end を設定
        const _silentDuration = (has_volume_time - tmpEnd) * 1000;
        if (_silentDuration >= silentDuration) {
          marks.push({ start, end: tmpEnd });
          tmpEnd = -1;
          start = has_volume_time;
        } else {
          // 無音の継続時間が基準に足りなければ、エンド時間をリセット
          tmpEnd = -1;
        }
      } else {
        // 1-2. エンド時間がない場合
        // スタート時間がなければ、スタート時間を記録
        if (start < 0) {
          start = has_volume_time;
        }
      }
      continue;
    }

    ////////////////////////////////
    /* 2. 抽出したデータに音がない場合 */
    ////////////////////////////////
    const no_volume_time = Math.floor(i / 10) / 10;

    // スタート時間があって、かつエンド時間がない場合（文末かもしれない無音を最初に見つけた場合）
    // 仮に経過秒を小数点第一位に丸めて、記録する
    // 一瞬だけの無音の可能性も有り
    if (start >= 0 && tmpEnd < 0) {
      tmpEnd = no_volume_time;
    }
  }

  // 最後の mark を start, tmpEnd から設定
  if (tmpEnd >= 0) {
    marks.push({ start, end: tmpEnd });
  } else {
    const endTime = Math.round(audioBuffer.duration * 10) / 10;
    marks.push({ start, end: endTime });
  }

  return marks;
}

export function buildMarkLines(
  marks: { start: number; end: number }[],
  duration: number,
  width: number
) {
  return marks.reduce(
    (acc, cur) => [
      ...acc,
      { xPos: Math.floor((cur.start / duration) * width), color: 'red' },
      { xPos: Math.floor((cur.end / duration) * width), color: 'blue' },
    ],
    [] as { xPos: number; color: string }[]
  );
}
