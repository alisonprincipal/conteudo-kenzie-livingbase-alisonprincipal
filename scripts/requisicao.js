export async function requestPosts(pagina) {
    const respons = await fetch(`https://m2-api-living.herokuapp.com/news?page=${pagina}`)
    const reponsJson = await respons.json()
    const posts = reponsJson.news
    const trans = JSON.stringify(posts)
     localStorage.setItem('geralista',trans)
    return posts
}
