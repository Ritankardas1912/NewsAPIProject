const apiKey='f88e0abbc60e4e9d968eb8358e31601f'

const blogContainer = document.getElementById("blog-container");
const searchField  = document.getElementById('search-input')
const searchButton  = document.getElementById('search-button')



async function fetchRandomNews(){
    try{
        const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pagesize=20&apikey=${apiKey}`
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching news", error)
        return[]
    }
}

searchButton.addEventListener("click", async ()=>{
    const querry = searchField.value.trim()
    if(querry !==""){
        try{
            const articles = await fetchNewsQuerry(querry)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by querry", error)
        }
    }
})

async function fetchNewsQuerry(querry){
    try{
        const apiURL = `https://newsapi.org/v2/everything?q=${querry}&pagesize=20&apikey=${apiKey}`
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching news", error)
        return[]
    }

}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard=  document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.lenght>30 ? article.title.slice(0,10) + "......." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDes = article.description.lenght>120 ? article.title.slice(0,120) + "......." : article.description;
        title.textContent = truncatedDes;
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        } )
        blogContainer.appendChild(blogCard); 
    })

}

(async() =>{
    try{

        const articles =await fetchRandomNews()
        displayBlogs(articles);
    }
    catch(error){
        console.error("Error fetching news", error)

    }
})();