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
