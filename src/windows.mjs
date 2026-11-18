export function prepare(state, input) {
  const channel = input.channel ?? 'c1';
  const from = input.from ?? 0; const to = input.to ?? 60;
  if (!Number.isFinite(from) || !Number.isFinite(to) || from >= to) throw new Error('采集区间无效');
  state.requests.push({ channel, from, to });
  return { channel, from, to, resolution: input.resolution ?? 'raw' };
}

export function resolve(state, request, data) {
  if (data.channel !== request.channel || data.actualResolution !== 'raw' || !Array.isArray(data.samples)) throw new Error('当前领取不是该通道原始观测');
  const ids = new Set();
  for (const item of data.samples) { if (!item.id || ids.has(item.id) || item.time < request.from || item.time >= request.to) throw new Error('原始观测身份或时段不符'); ids.add(item.id); }
  return data;
}
