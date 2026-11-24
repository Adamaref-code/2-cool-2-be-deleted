//Rita works on this file
const composeForm = document.querySelector("#chirp-form");
const openChirpFormButton = document.getElementById("open-chirp-form-button");
const closeButtonChirpForm = document.getElementById("chirp-form__close");

//tapping on Post button in the feed opens the form
openChirpFormButton.addEventListener("click", showChirpForm);

//function to open the feed form
function showChirpForm() {
	document.querySelector(".gray-overlay").classList.remove("hidden");
	document.querySelector(".chirp-form").classList.remove("hidden");
}

//function to close the feed form
function hideChirpForm() {
	document.querySelector(".gray-overlay").classList.add("hidden");
	document.querySelector(".chirp-form").classList.add("hidden");
}

//tapping on the Post button inside the chirp form submits the form
composeForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(composeForm);
	const payload = {
		author_name: data.get("author_name").trim() || "anonymous",
		is_anonymous: !data.get("author_name").trim(), //this is not an error!  This one is a boolean and will be false when there’s an author name, and true when the field is empty.
		content: data.get("content").trim(),
		tag: data.get("tag").trim() || undefined,
		sentiment: data.get("sentiment")
	};
	console.log(payload);
	postChirp(payload);
	hideChirpForm();
});

//and the data goes to the server
async function postChirp(payload) {
	try {
		const response = await fetch("https://hyperchirp.vercel.app/api/chirps", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		}).then((response) => response.json());
		if (!response.ok) throw new Error("http", response.status);
		const chirp = await response.json();
		console.log(chirp);
	} catch (error) {
		console.error(error);
	}
	console.log(payload);
}

composeForm.addEventListener("reset", hideChirpForm);
