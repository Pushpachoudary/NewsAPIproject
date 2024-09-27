const apikey = 'bac9d187d54545f8a5b3e0f2197ed2b0';
const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title || "Image";

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 20 ? article.title.slice(0, 20) + "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if(query == "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch(error) {
            console.log("Error fetching news by query", error);
        }
    }
});

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch(error) {
        console.error("Error fetching random news", error);
    }
})();
