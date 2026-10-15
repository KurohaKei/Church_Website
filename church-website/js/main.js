const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

if (menuToggle && primaryNavigation) {
	menuToggle.addEventListener("click", () => {
		const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
		menuToggle.setAttribute("aria-expanded", String(!isExpanded));
		primaryNavigation.classList.toggle("is-open", !isExpanded);
	});

	primaryNavigation.addEventListener("click", (event) => {
		if (event.target instanceof Element && event.target.closest("a")) {
			menuToggle.setAttribute("aria-expanded", "false");
			primaryNavigation.classList.remove("is-open");
		}
	});
}

const revealObserver = "IntersectionObserver" in window
	? new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.15 })
	: null;

window.observeReveals = (root = document) => {
	const elements = root.matches?.(".reveal")
		? [root, ...root.querySelectorAll(".reveal")]
		: root.querySelectorAll?.(".reveal") ?? [];

	elements.forEach((element) => {
		if (element.classList.contains("is-visible")) return;

		if (revealObserver) {
			revealObserver.observe(element);
		} else {
			element.classList.add("is-visible");
		}
	});
};

window.observeReveals();
