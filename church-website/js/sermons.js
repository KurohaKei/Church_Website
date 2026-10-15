const sermonsList = document.querySelector("#sermons-list");

if (sermonsList) {
	fetch("static/data/sermons.json")
		.then((response) => {
			if (!response.ok) throw new Error("Sermons could not be loaded.");
			return response.json();
		})
		.then((sermons) => {
			sermonsList.replaceChildren();

			if (!Array.isArray(sermons) || sermons.length === 0) {
				sermonsList.textContent = "No sermons are listed yet.";
				return;
			}

			for (const sermon of sermons) {
				const item = document.createElement("li");
				const title = document.createElement("strong");
				title.textContent = sermon.title || "Untitled sermon";
				item.append(title);
				if (sermon.date) item.append(document.createTextNode(` - ${sermon.date}`));
				if (sermon.preacher) item.append(document.createTextNode(`, ${sermon.preacher}`));
				for (const [label, url] of [["Video", sermon.videoUrl], ["Audio", sermon.audioUrl]]) {
					if (!url) continue;
					const link = document.createElement("a");
					link.href = url;
					link.textContent = ` ${label}`;
					link.rel = "noopener noreferrer";
					item.append(link);
				}
				sermonsList.append(item);
			}
		})
		.catch(() => {
			sermonsList.textContent = "Sermons are unavailable right now.";
		});
}
