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

function showLoaderIcon() {
	const divForALoader = document.querySelector(".for-a-loader");
	const loaderImage = document.createElement("img");
	loaderImage.src = "src/images/loader-icon.svg";
	loaderImage.classList.add("loader-icon");
	divForALoader.appendChild(loaderImage);
}

function hideLoaderIcon() {
	const divForALoader = document.querySelector(".for-a-loader");
	divForALoader.removeChild(document.querySelector(".loader-icon"));
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
	composeForm.reset();
});

//tapping on X button in the chirp form will clear all fields and close the form,
//it will clear the form because X button has type=reset attribute
composeForm.addEventListener("reset", hideChirpForm);

//and the data goes to the server
async function postChirp(payload) {
	try {
		showLoaderIcon();
		const response = await fetch("https://hyperchirp.vercel.app/api/chirps", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		if (!response.ok) throw new Error("http", response.status);
		hideLoaderIcon();
	} catch (error) {
		console.error(error);
	}
	console.log(payload);
}
