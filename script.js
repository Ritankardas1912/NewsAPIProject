const apiKey='205ff44711ea4724a817414981487ffe'
//const apikey1 = '205ff44711ea4724a817414981487ffe'
//const apiKey2 = '205ff44711ea4724a817414981487ffe'

const blogContainer = document.getElementById("blog-container");
const searchField  = document.getElementById('search-input')
const searchButton  = document.getElementById('search-button')
const techButton = document.getElementById('tech-button')
const entertainmentButton = document.getElementById('entertainment-button')
const healthButton = document.getElementById('health-button')
const sportsButton = document.getElementById('sports-button')
const currentButton = document.getElementById('current-button')


async function fetchRandomNews(){
    try{
        const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pagesize=10&apikey=${apiKey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching news", error)
        return[]
    }
}

techButton.addEventListener("click", async ()=>{
    const querry = "technology";
        try{
            const articles = await fetchNewsQuerry(querry)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by querry", error)
        }
    
})

entertainmentButton.addEventListener("click", async ()=>{
    const querry = "entertainment";
        try{
            const articles = await fetchNewsQuerry(querry)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by querry", error)
        }
    
})

sportsButton.addEventListener("click", async ()=>{
    const querry = "sports";
        try{
            const articles = await fetchNewsQuerry(querry)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by querry", error)
        }
    
})

currentButton.addEventListener("click", async ()=>{
    const querry = "current affairs";
        try{
            const articles = await fetchNewsQuerry(querry)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by querry", error)
        }
    
})

healthButton.addEventListener("click", async ()=>{
    const querry = "health";
        try{
            const articles = await fetchNewsQuerry(querry)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by querry", error)
        }
    
})

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
        const apiURL = `https://newsapi.org/v2/everything?q=${querry}&apikey=${apiKey}`
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
        articles && articles.forEach((article) => {
        const blogCard=  document.createElement("div");
        blogCard.classList.add("blog-card");
        
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;   
        
        const title = document.createElement("h2");  
        //const shortTitle = article.title.length>30?article.title.slice(0,30)+"........":article.title;
        //title.textContent = shortTitle;
        title.textContent = article.title;

        const description = document.createElement("p");
        //const shortDes = article.description.length>120?article.description.slice(0,120)+"........":article.description;
        //description.textContent =shortDes;
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