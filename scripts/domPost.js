export async function estruturaPost(post){
    document.body.insertAdjacentHTML('beforeend',`
    <header class="cabecalho">
    <div>
        <div class="iconeLog" ></div>
        <h2 class="tituloLog" >Living</h2>
    </div>
    <button id='init' class="home" >Home</button>
</header>
<main>
    <section class="infoTema">
        <h1>${post.title}</h1>
        <p>${post.description}</p>
    </section>
    <section class="infoPost" >
        <img src="${post.image}">
        <p>${post.content}</p>
         <nav class="navegacao" >
            <button class='filtro' id="Todos" >Todos</button>
            <button class='filtro' id="Pintura">Pintura</button>
            <button class='filtro' id="Decoração">Decoração</button>
            <button class='filtro' id="Organização">Organização</button>
            <button class='filtro' id="Limpeza">Limpeza</button>
            <button class='filtro' id="Segurança">Segurança</button>
            <button class='filtro' id="Reforma">Reforma</button>
            <button class='filtro' id="Aromas">Aromas</button>
         </nav>   
    </section>
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
    function directionHome(){
        const btn = document.querySelector('.home')
        btn.addEventListener('click',()=>{
            setTimeout(()=>{window.location.replace('../../index.html')},1500)
        })
    }
    directionHome()
    function filtroStorage(){
        const btnFiltro = document.querySelectorAll('.filtro')
        btnFiltro.forEach((element)=>{
            element.addEventListener('click', (event)=>{
                const pesquisa = event.target.id
                const trans=  JSON.stringify(pesquisa)
                localStorage.setItem('fltStorage',trans)
                setTimeout(()=>{window.location.replace('../../index.html')},1500)
            })
        })
    }filtroStorage()
}