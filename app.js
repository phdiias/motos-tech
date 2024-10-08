const pesquisar = () => {
  // Obtém o valor do campo de pesquisa
  const termoPesquisa = document
    .getElementById("campo-pesquisa")
    .value.toLowerCase()

  // Obtém a seção onde os resultados serão exibidos
  let section = document.getElementById("resultados-pesquisa")
  let erro = document.getElementById("mensagem-erro")

  // Inicializa uma string para armazenar os resultados formatados e limpa as seções
  let resultados = ""

  // Função para ocultar uma seção com animação
  const ocultarSeccao = (elemento) => {
    elemento.classList.remove("show")
    elemento.style.opacity = "0" // Começa a transição de opacidade
    setTimeout(() => {
      elemento.style.display = "none" // Remove a seção do layout após a animação
    }, 500) // Tempo igual ao da transição
  }

  // Função para mostrar uma seção com animação
  const mostrarSeccao = (elemento) => {
    elemento.style.display = "block" // Adiciona a seção ao layout
    setTimeout(() => {
      elemento.style.opacity = "1" // Torna o elemento visível
      elemento.classList.add("show") // Adiciona a classe show para a animação
    }, 10) // Pequeno atraso para garantir que a transição seja aplicada
  }

  // Limpa qualquer mensagem de erro ou resultados anteriores
  ocultarSeccao(section)
  ocultarSeccao(erro)

  // Usa setTimeout para garantir que a ocultação seja concluída antes de exibir o novo conteúdo
  setTimeout(() => {
    // Verifica se o campo de pesquisa está vazio
    if (termoPesquisa === "") {
      erro.innerHTML = "<p>Por favor, digite um termo de pesquisa.</p>"
      mostrarSeccao(erro)
      return // Sai da função sem fazer mais nada
    }

    // Filtra os dados com base no termo de pesquisa
    const dadosFiltrados = dados.filter((dado) => {
      const texto =
        `${dado.titulo} ${dado.descricao} ${dado.marca} ${dado.tags}`.toLowerCase()
      return texto.includes(termoPesquisa)
    })

    // Itera sobre os dados filtrados e adiciona o HTML formatado à string de resultados
    if (dadosFiltrados.length > 0) {
      dadosFiltrados.forEach((dado) => {
        resultados += `
          <div class="item-resultado">
            <div class="titulo-thumbnail">
              <h2>
                <a href="#">${dado.titulo}</a>
              </h2>
              <img
                class="thumbnail"
                src="${dado.thumbnail.image}"
                alt="${dado.thumbnail.alt}"
              />
            </div>
            <p class="descricao-meta">${dado.descricao}</p>
            <a href="${dado.link}" target="_blank" class="mais-informacoes">Mais informações</a>
          </div>
        `
      })

      // Atribui o HTML gerado à seção de resultados
      section.innerHTML = resultados
      mostrarSeccao(section)
    } else {
      erro.innerHTML =
        "<p>Nenhum resultado encontrado para o termo de pesquisa fornecido.</p>"
      mostrarSeccao(erro)
    }
  }, 500) // Tempo igual ao da transição de ocultação
}

// Adiciona o evento de clique no botão
document.querySelector("section button").addEventListener("click", pesquisar)

// Adiciona o evento de teclado no campo de pesquisa
document
  .getElementById("campo-pesquisa")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      pesquisar()
    }
  })
