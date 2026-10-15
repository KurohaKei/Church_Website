const eventsList = document.querySelector("#events-list");

if (eventsList) {
	fetch("static/data/events.json")
		.then((response) => {
			if (!response.ok) throw new Error("Events could not be loaded.");
			return response.json();
		})
		.then((events) => {
			eventsList.replaceChildren();

			if (!Array.isArray(events) || events.length === 0) {
				eventsList.textContent = "No events are listed yet.";
				return;
			}

			for (const event of events) {
				const item = document.createElement("li");
				const title = document.createElement("strong");
				title.textContent = event.title || "Untitled event";
				item.append(title);
				if (event.date) item.append(document.createTextNode(` - ${event.date}`));
				if (event.description) item.append(document.createTextNode(`: ${event.description}`));
				eventsList.append(item);
			}
		})
		.catch(() => {
			eventsList.textContent = "Events are unavailable right now.";
		});
}
