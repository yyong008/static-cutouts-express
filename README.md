# static-cutouts-express

## motivation

Sometimes it is not necessary to use the backend (other JS server runtimes such as non-Node) to cut some pages and use a modern front-end framework, but not SSR content. We can use back-end frameworks such as template + express to solve front-end engineering problems such as HTML without manual repetitive code writing.

## dir

- `data/` mustache data source。
- `static/` js/css static files
- `views/` mustache view
- `main.server.ts` start express server
- `main.prerender.ts` build mustache to html
## map

- `data/index.ts -> views/index.mustache`