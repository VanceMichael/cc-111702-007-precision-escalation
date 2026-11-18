export function prepare(state, input) {
  const channel = input.channel ?? 'c1';
  const from = input.from ?? 0; const to = input.to ?? 60;
  if (!Number.isFinite(from) || !Number.isFinite(to) || from >= to) throw new Error('采集区间无效');
  state.requests.push({ channel, from, to });
  return { channel, from, to, resolution: input.resolution ?? 'raw' };
}
