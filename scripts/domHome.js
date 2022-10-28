import { requestPosts } from './requisicao.js'
const requisicao = await requestPosts()
// variavel para guardar valor
let listaFiltro = requisicao
const storage = JSON.parse(localStorage.getItem('listaStore'))
if(!storage){
    const lsStorage = JSON.stringify(listaFiltro)
    localStorage.setItem('listaStore',lsStorage)
}

export async function estruturaHome() {
    document.body.insertAdjacentHTML('beforeend', `
    <header>
    <div class="bloco_one">
        <div>
            <div></div>
            <h2 id='init'>Living</h2>
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
        <button class='btnfiltro' id="Todos" >Todos</button>
        <button class='btnfiltro' id="Pintura">Pintura</button>
        <button class='btnfiltro' id="Decoração">Decoração</button>
        <button class='btnfiltro' id="Organização">Organização</button>
        <button class='btnfiltro' id="Limpeza">Limpeza</button>
        <button class='btnfiltro' id="Segurança">Segurança</button>
        <button class='btnfiltro' id="Reforma">Reforma</button>
        <button class='btnfiltro' id="Aromas">Aromas</button>
</nav>
<main>
        <ul class="listasPost">
        </ul>
        <div id='observadora'></div>
</main>
<footer>
    <div>
        <div>
            <div class="iconeLog" ></div>
            <h2 id="musa" class="tituloLog" >Living</h2>
        </div>
        <p>The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.</p>
    </div>
    <a href="#init">Voltar para o topo</a>
</footer>
    `)
    // chamando Posts Dinamicamente
    percorrePosts(requisicao)
    // filtrandoLista
    filtrandoLista(listaFiltro)
    // scrol infinito
    scroolInfinito()
    //filtro auto
    filtroAuto ()
}
// >>>>>>>>>>>>>>>>>>
async function scroolInfinito() {
    let contadora = 0
    const oberserver = document.querySelector('#observadora')
    const oberservando = new IntersectionObserver((divLista) => {
        const verifique = divLista[0].isIntersecting
        if (verifique) {
            contadora++
            const tranformer = JSON.stringify(contadora)
            localStorage.setItem('contador', tranformer)
            verificaCOntadorStorage()
        }
    })
    oberservando.observe(oberserver)
}
export  function percorrePosts(array) {
    array.forEach((element) => gerandoLista(element))
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
    // evento de click no span
    span.addEventListener('click', (event) => {
        const idElement = event.target.id
        const elementoPost = storage.filter((post)=>post.id==idElement)
         const trans=JSON.stringify(elementoPost)
         localStorage.setItem('newPost',trans)
         setTimeout(()=>{window.location.replace('./pages/post/index.html')},2500)  
    })
}
function filtrandoLista(lista) {
    const ul = document.querySelector('ul')
    const btnFiltro = document.querySelectorAll('.btnfiltro')
    btnFiltro.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            ul.innerHTML = ''
            const filtro = event.target.id
            if (filtro == 'Todos') {
                percorrePosts(lista)
            } else {
                const filtroArray = lista.filter((element) => element.category == filtro)
                percorrePosts(filtroArray)
            }
        })
    })
}
async function verificaCOntadorStorage() {
    const conta = JSON.parse(localStorage.getItem('contador'))
    if (conta && conta < 3) {
        const requisicao = await requestPosts(conta)
        percorrePosts(requisicao)
        verificaListaStorage()
    }
}
async function verificaListaStorage() {
    const mainListbuts = JSON.parse(localStorage.getItem('geralista'))
    mainListbuts.forEach((element) => {
        listaFiltro.push(element)
    })
    filtrandoLista(listaFiltro)
    const arrayFiltroStorage = JSON.stringify(listaFiltro)
    localStorage.setItem('listaStore',arrayFiltroStorage)
    return listaFiltro
}
export function filtroAuto (){
    const ul = document.querySelector('ul')
    const filtro = JSON.parse(localStorage.getItem('fltStorage'))
    if(filtro){
            const filAuto = storage.filter((element)=>element.category== filtro)
            ul.innerHTML =''
            percorrePosts(filAuto)
           localStorage.removeItem('fltStorage')     
    }if (filtro && filtro=='Todos'){
        ul.innerHTML =''
        percorrePosts(listaFiltro)
        localStorage.removeItem('fltStorage')  
    }

}