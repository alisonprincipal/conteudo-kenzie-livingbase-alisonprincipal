import { requestPosts } from './requisicao.js'
const requisicao = await requestPosts()
const lista = requisicao.news


export async function estruturaHome() {
    document.body.insertAdjacentHTML('beforeend', `
    <header>
    <div class="bloco_one">
        <div>
            <div></div>
            <h2>Living</h2>
        </div>
        <h3>Cuidando de cada <strong>detalhe </strong>da sua casa</h3>
        <p>Trazendo uma nova e incrível experiência para você e para seu lar </p>
        <span>Consumir conteúdos</span>
    </div>
    <div class="bloco_two">
        <img src="./img/Rectangle 2 (1).png" alt="mulher sorrindo de frente ao notebook">
    </div>
</header>
<nav class="navegacao">
        <button class="Todos" >Todos</button>
        <button class="Pintura">Pintura</button>
        <button class="Decoração">Decoração</button>
        <button class="Organização">Organização</button>
        <button class="Limpeza">Limpeza</button>
        <button class="Segurança">Segurança</button>
        <button class="Reforma">Reforma</button>
        <button class="Aromas">Aromas</button>
        <button class="Anum">Anum</button>
</nav>
<main>
        <ul class="listasPost">
        </ul>
        <div id='observadora'></div>
</main>
    `)
    // chamando Posts Dinamicamente
    percorrePosts(lista)
    // colocandoFiltros
    function funtrandoLista() {
        const ul = document.querySelector('ul')
        const btnFiltro = document.querySelectorAll('button')
        btnFiltro.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                ul.innerHTML = ''
                const filtro = event.target.className
                if (filtro == 'Todos') {
                    percorrePosts(lista)
                }
                const filtroArray = lista.filter((element) => element.category == filtro)
                percorrePosts(filtroArray)
                paginaPost()

            })
        })
    } funtrandoLista()
    // >>>>>>>>>>>>>>>>>
    function paginaPost() {
        const span = document.querySelectorAll('.spanPost')
        const btnSpan = [...span]
        btnSpan.forEach((element) => {
            element.addEventListener('click', (event) => {
                const idClick = event.target.id
                console.log(idClick)
            })
        })
    } paginaPost()
    // >>>>>>>>>>>>>>>>>>>>>>>>>
     function scroolInfinito() {
       let contadora =0
        const oberserver = document.querySelector('#observadora')
        const oberservando =  new IntersectionObserver((divLista) => {
            const verifique = divLista[0].isIntersecting
            if (verifique) {
                contadora++
                const tranformer = JSON.stringify(contadora)
               localStorage.setItem('contador',tranformer)
               verificaCOntadorStorage()
            }
        })
          oberservando.observe(oberserver)
        
        
    
    } scroolInfinito()
}

// >>>>>>>>>>>>>>>>>>
async function percorrePosts(array) {
    await array.forEach((element) => gerandoLista(element))
}
function gerandoLista(item) {
    const ul = document.querySelector('ul')
    let id = item.id
    let img = item.image
    let titulo = item.title
    let descricao = item.description

    let li = document.createElement('li')
    li.id = id
    let tagImagem = document.createElement('img')
    tagImagem.src = img
    let h3 = document.createElement('h3')
    h3.innerText = titulo
    let descri = document.createElement('p')
    descri.innerText = descricao
    let span = document.createElement('span')
    span.classList = 'spanPost'
    span.innerText = 'Acessar Conteúdo'
    span.id = id

    li.append(tagImagem, h3, descri, span)
    ul.append(li)
}
// async function verificaCOntadorStorage(){
//     const conta = JSON.parse(localStorage.getItem('contador'))
//     if(conta){
//         const requisicao = await requestPosts(conta)
//         const lista = requisicao.news
//         percorrePosts(lista)
//     }
// }