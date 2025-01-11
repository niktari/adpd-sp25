async function fetchAndInsertContent(targetId, contentUrl) {
    try {
        const response = await fetch(contentUrl);
        const data = await response.text();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.innerHTML = data;
        } else {
            console.error(`Element with id '${targetId}' not found.`);
        }
    } catch (error) {
        console.error(`Error fetching or inserting content: ${error}`);
    }
}

for (let i = 1; i <= 15; i++) {
    fetchAndInsertContent(`week${i}`, `../../weeks/${i}.html`);
}

fetchAndInsertContent("book", "../../assignments/book.html");
fetchAndInsertContent("poster", "../../assignments/poster.html");
fetchAndInsertContent("clock", "../../assignments/clock.html");
fetchAndInsertContent("tool", "../../assignments/tool.html");