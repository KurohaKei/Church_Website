const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!contactForm.reportValidity()) {
			formStatus.textContent = "Please complete each field with a valid email address.";
			return;
		}

		formStatus.textContent = "Your message passed validation. Connect a form service to enable delivery.";
	});
}
