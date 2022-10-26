
export async function requestPosts(pagina){
    const respons = await fetch(`https://m2-api-living.herokuapp.com/news?page=${pagina}`)
    const reponsJson = await respons.json()
    return reponsJson
}
