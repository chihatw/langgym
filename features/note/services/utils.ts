export function buildNoteLines(value: string) {
  const labels: string[] = [];
  const pitchStrs: string[] = [];

  value.split('\n\n').forEach((line, index) => {
    if (index % 2) {
      pitchStrs.push(line);
    } else {
      labels.push(line);
    }
  });

  const noteLines: { label: string; pitchStr: string }[] = [];
  for (let i = 0; i < labels.length; i++) {
    noteLines.push({ label: labels[i], pitchStr: pitchStrs[i] || '' });
  }
  return noteLines;
}
