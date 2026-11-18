export function accept(state, request, data) {
  if (data.channel !== request.channel || !data.actualResolution) throw new Error('通道或分辨率缺失');
  for (const sample of data.samples ?? []) {
    if (!sample.id || !Number.isFinite(sample.time) || !Number.isFinite(sample.value)) throw new Error('观测无效');
    const key = `${data.channel}:${sample.id}`;
    if (!state.observations[key] || state.observations[key].revision <= sample.revision) state.observations[key] = { ...sample, channel: data.channel, resolution: data.actualResolution };
  }
  state.coverage[data.channel] = { ...data.coverage, resolution: data.actualResolution };
  return data.channel;
}
