export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url, {
      headers: { Range: req.headers.range || '' }
    });
    const headers = {};
    response.headers.forEach((v, k) => headers[k] = v);
    res.writeHead(response.status, headers);
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send('Error fetching video');
  }
}
