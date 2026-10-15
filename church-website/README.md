# Pag-asa Bible Baptist Church Angat

Starter files for the church website. Replace the sample copy and schedule placeholders with information confirmed by church leadership.

## Structure

- `index.html` contains the complete site, with sections linked by the floating navigation.
- The former page URLs redirect to their matching sections in `index.html` for existing bookmarks.
- Shared styles are in `css/`; browser scripts are in `js/`.
- Images, documents, and JSON content belong in `static/`.
- Event and sermon entries are loaded from `static/data/events.json` and `static/data/sermons.json`.

## Preview

Serve this folder with a local web server so browser `fetch()` requests can load the JSON files. Open `index.html` through that server. The contact form currently validates fields in the browser but does not deliver messages.
