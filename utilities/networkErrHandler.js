function buildNetworkErrorMessage(url, err) {
  console.log(err.message || err);
  err = JSON.stringify(err.message || err);
  
  if (!err)                                   return `Network error calling ${url}`;
  if (err.includes('ECONNREFUSED'))           return `Connection refused: ${url} — is the server running?`;
  if (err.includes('ETIMEDOUT') || err.includes('timeout')) return `Timeout calling ${url}`;
  if (err.includes('ENOTFOUND'))              return `Host not found: ${url} — check the URL config`;
  return `Network error calling ${url}: ${err.slice(0, 70)}`;
}

module.exports = { buildNetworkErrorMessage };