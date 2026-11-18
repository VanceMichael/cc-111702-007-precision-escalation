export function present(state) {
  const samples = Object.values(state.observations).sort((left, right) => left.time - right.time);
  return { samples, coverage: structuredClone(state.coverage), goodCount: samples.filter(item => item.quality === 'good').length };
}
