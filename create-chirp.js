//Rita works on this file

document.querySelector("#chirp-form").addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(composeForm);
	const payload = {
		author_name: data.get("author_name").trim(),
		content: data.get("content").trim(),
		tag: data.get("tag").trim() || undefined,
		is_anonymous: data.has("is_anonymous")
	};

	postAChirp(payload);
	handleClick();
	console.log("The form was submitted");
});
// function showPostWindow() {
// 	body.innerHTML = chirpPostWindow();
// }

//if no name, then anonymous = true;
// append |
// add animation
