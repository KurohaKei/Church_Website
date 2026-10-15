const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const siteHeader = document.querySelector(".site-header");

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

if (siteHeader) {
	let lastScrollPosition = window.scrollY;
	let scrollFramePending = false;

	const updateHeaderVisibility = () => {
		const currentScrollPosition = window.scrollY;
		const scrollDistance = currentScrollPosition - lastScrollPosition;
		const menuIsOpen = document.body.classList.contains("menu-open")
			|| primaryNavigation?.classList.contains("is-open");

		if (currentScrollPosition <= 80 || menuIsOpen) {
			siteHeader.classList.remove("is-hidden");
			lastScrollPosition = currentScrollPosition;
		} else if (scrollDistance >= 8) {
			siteHeader.classList.add("is-hidden");
			lastScrollPosition = currentScrollPosition;
		} else if (scrollDistance <= -8) {
			siteHeader.classList.remove("is-hidden");
			lastScrollPosition = currentScrollPosition;
		}

		scrollFramePending = false;
	};

	window.addEventListener("scroll", () => {
		if (scrollFramePending) return;
		scrollFramePending = true;
		window.requestAnimationFrame(updateHeaderVisibility);
	}, { passive: true });

	siteHeader.addEventListener("focusin", (event) => {
		if (event.target instanceof Element && event.target.closest("a")) {
			siteHeader.classList.remove("is-hidden");
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

const sectionDots = document.querySelector("#sectionDots");
const sections = [...document.querySelectorAll("section[id]")];

if (sectionDots && sections.length > 0) {
	const progressTrack = document.createElement("span");
	progressTrack.className = "section-dots-track";
	progressTrack.setAttribute("aria-hidden", "true");

	const progressLine = document.createElement("span");
	progressLine.className = "section-dots-progress";
	progressLine.setAttribute("aria-hidden", "true");
	sectionDots.append(progressTrack, progressLine);

	const sectionLinks = sections.map((section) => {
		const link = document.createElement("a");
		const title = section.dataset.title || section.id;
		link.className = "section-dot";
		link.href = `#${section.id}`;
		link.dataset.title = title;
		link.setAttribute("aria-label", title);
		sectionDots.append(link);
		return link;
	});

	const setActiveSection = (activeSection) => {
		const activeIndex = sections.indexOf(activeSection);
		if (activeIndex < 0) return;

		sectionLinks.forEach((link, index) => {
			link.classList.toggle("is-active", index === activeIndex);
			link.classList.toggle("is-passed", index < activeIndex);
			if (index === activeIndex) {
				link.setAttribute("aria-current", "location");
			} else {
				link.removeAttribute("aria-current");
			}
		});
	};

	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) setActiveSection(entry.target);
		});
	}, { rootMargin: "-50% 0px -50% 0px" });

	sections.forEach((section) => sectionObserver.observe(section));

	const updateScrollProgress = () => {
		const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
		const progress = scrollableHeight > 0
			? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
			: 0;
		progressLine.style.transform = `translateX(-50%) scaleY(${progress})`;
	};

	let progressFramePending = false;
	window.addEventListener("scroll", () => {
		if (progressFramePending) return;
		progressFramePending = true;
		window.requestAnimationFrame(() => {
			updateScrollProgress();
			progressFramePending = false;
		});
	}, { passive: true });

	window.addEventListener("resize", updateScrollProgress);
	window.addEventListener("load", updateScrollProgress, { once: true });
	updateScrollProgress();
}
