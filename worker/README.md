# Map-link resolver Worker

Expands shortened map links (`maps.app.goo.gl`, `maps.apple/p/…`) into
`{ lat, lon }`. The static site can't do this itself because reading a
cross-origin redirect / page body is blocked by CORS — this Worker does it
server-side and returns JSON with permissive CORS headers.

## Deploy

```bash
cd worker
npx wrangler login      # one-time, opens browser
npx wrangler deploy
```

Wrangler prints a URL like:

```
https://cargo-map-resolver.<your-subdomain>.workers.dev
```

Paste that into `PROXY_URL` at the top of `assets/js/location-update.js`.

## Test

```bash
curl "https://cargo-map-resolver.<you>.workers.dev/?url=https://maps.app.goo.gl/1uTayozksmzzFCFN9"
# {"lat":36.6387243,"lon":-86.5710137,...}

curl "https://cargo-map-resolver.<you>.workers.dev/?url=https://maps.apple/p/zQ~vPPZkI_sLFP"
# {"lat":35.038333,"lon":-108.353333,...}
```

Only Google/Apple map hosts are accepted (`ALLOWED_HOSTS` in `index.js`), so it
can't be abused as an open proxy.
