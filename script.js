async function getSpotifyInfo() {

    const input = document.getElementById("spotifyUrl");
    const error = document.getElementById("error");
    const result = document.getElementById("result");

    const cover = document.getElementById("cover");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const openSpotify = document.getElementById("openSpotify");

    const url = input.value.trim();

    error.textContent = "";
    result.classList.add("hidden");

    if (url === "") {
        error.textContent = "Please paste a Spotify link.";
        return;
    }

    if (!url.includes("open.spotify.com")) {
        error.textContent = "Please enter a valid Spotify link.";
        return;
    }

    try {

        const apiUrl =
            "https://open.spotify.com/oembed?url=" +
            encodeURIComponent(url);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Unable to fetch Spotify information.");
        }

        const data = await response.json();

        title.textContent = data.title || "Spotify Content";

        description.textContent =
            "Spotify content found successfully.";

        cover.src = data.thumbnail_url || "";

        openSpotify.href = url;

        result.classList.remove("hidden");

    } catch (error) {

        error.textContent =
            "Unable to load Spotify information. Please check the link.";

        console.error(error);
    }
}