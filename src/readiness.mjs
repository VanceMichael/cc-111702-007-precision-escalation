export function present(state) {
  const samples = Object.values(state.observations).sort((left, right) => left.time - right.time);
  return { samples, coverage: structuredClone(state.coverage), goodCount: samples.filter(item => item.quality === 'good').length };
}

export function assess(state, request, data) {
  if (data.coverage.from > request.from || data.coverage.to < request.to) throw new Error('来源未覆盖所领区间');
  for (const sample of data.samples) if (!['good','suspect','bad'].includes(sample.quality) || !Number.isInteger(sample.revision) || sample.revision < 1) throw new Error('观测质量或修订无效');
  return { channel: request.channel, complete: true, rawCount: data.samples.length, goodCount: data.samples.filter(item => item.quality === 'good').length };
}
