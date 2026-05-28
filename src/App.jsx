import './style.css'
import { useEffect, useState } from 'react'

function App() {
  const [textoAtual, setTextoAtual] = useState('')
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(4)
  const [menuAberto, setMenuAberto] = useState(false)
  const [statusContato, setStatusContato] = useState('')

  const asset = (path) => `${import.meta.env.BASE_URL}${path}`

  useEffect(() => {
    const texto = 'Olá, sou Emerson Danillo!'
    let i = 0
    let forward = true
    let timeoutId

    function typeWriter() {
      if (forward) {
        setTextoAtual(texto.substring(0, i + 1))
        i++

        if (i === texto.length) {
          forward = false
          timeoutId = setTimeout(typeWriter, 1500)
          return
        }
      } else {
        i--
        setTextoAtual(texto.substring(0, i))

        if (i === 0) {
          forward = true
        }
      }

      timeoutId = setTimeout(typeWriter, forward ? 100 : 50)
    }

    typeWriter()

    return () => clearTimeout(timeoutId)
  }, [])

  function carregarMaisProjetos() {
    setQuantidadeVisivel(7)
  }

  function alternarMenu() {
    setMenuAberto(!menuAberto)
  }

  async function enviarContato(event) {
  event.preventDefault()

  setStatusContato('Enviando...')

  const formData = new FormData(event.target)

  const dados = {
    name: formData.get('nome'),
    email: formData.get('email'),
    message: formData.get('mensagem')
  }

  try {
      const response = await fetch('https://danillo-portfolio-backend.onrender.com/api/contact', {      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })

    const resultado = await response.json()

    if (!response.ok) {
      setStatusContato(resultado.error || 'Erro ao enviar mensagem.')
      return
    }

    setStatusContato('Mensagem enviada com sucesso!')
    event.target.reset()
  } catch (error) {
    console.error(error)
    setStatusContato('Erro ao conectar com o servidor.')
  }
}

  return (
    <>
      <nav id="nav" role="navigation">
        <button id="btn-mobile" onClick={alternarMenu}>
          ☰
        </button>

        <ul className={menuAberto ? 'show' : ''}>
          <li><a href="#home" aria-label="Ir para a seção home">Home</a></li>
          <li><a href="#sobre" aria-label="Ir para a seção sobre">Sobre</a></li>
          <li><a href="#projetos" aria-label="Ir para a seção projetos">Projetos</a></li>
          <li><a href="#servicos" aria-label="Ir para a seção serviços">Serviços</a></li>
          <li><a href="#contato" aria-label="Ir para a seção contato">Contato</a></li>
        </ul>
      </nav>

      <main>
        <section
          id="home"
          style={{ backgroundImage: `url(${asset('background.jpg')})` }}
        >
          <h2 id="apresentacao">{textoAtual}</h2>
          <h1>Frontend Developer</h1>

          <img
            src={asset('icon.jpeg')}
            alt="Icone de xadrez e cubo mágico"
            className="icon-principal"
            loading="lazy"
          />

          <p>
            Especialidade em <strong>HTML, CSS, JavaScript, React e Python.</strong>{' '}
            Sempre buscando unir desempenho, acessibilidade e design moderno.
          </p>

          <a
            href="https://github.com/E-Danillo"
            target="_blank"
            rel="noopener noreferrer"
            className="botao"
          >
            Confira meus Projetos
          </a>

          <a
            href={asset('Currículo - Emerson Danillo.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="botao"
          >
            Veja meu Currículo!
          </a>
        </section>

        <section id="sobre">
          <div className="div-conteudo">
            <h2>Sobre</h2>

            <p>
              Sou um desenvolvedor frontend que gosta de entender como as coisas funcionam,
              não apenas fazê-las funcionar. Tenho interesse especial em desempenho,
              acessibilidade e organização do código, buscando sempre criar interfaces claras,
              responsivas e intuitivas.
            </p>

            <p>
              Meu gosto por desafios lógicos, como xadrez e cubos mágicos, influencia
              diretamente minha forma de programar: penso em problemas por etapas, analiso
              possibilidades e busco soluções eficientes. Vejo cada bug como parte do
              aprendizado e cada projeto como uma oportunidade de evoluir.
            </p>

            <p>
              Atualmente estudo Ciências da Computação e sigo aprimorando minhas habilidades
              com HTML, CSS, JavaScript, React e Python, desenvolvendo projetos práticos e
              aplicando boas práticas do desenvolvimento frontend.
            </p>

            <div className="box-tecnologias">
              <img src={asset('html.png')} alt="Logo do HTML5" loading="lazy" />
              <img src={asset('css.png')} alt="Logo do CSS" loading="lazy" />
              <img src={asset('javascript.png')} alt="Logo do JavaScript" loading="lazy" />
              <img src={asset('react.png')} alt="Logo do React" loading="lazy" />
              <img src={asset('python.png')} alt="Logo do Python" loading="lazy" />
            </div>
          </div>

          <a href="#nav">
            <img
              src={asset('seta.png')}
              alt="Voltar ao topo"
              className="back-to-top"
              loading="lazy"
            />
          </a>
        </section>

        <section id="projetos">
          <div>
            <h2>Projetos</h2>
            <p>Alguns dos meus projetos mais relevantes:</p>

            <div className="galeria-projetos">
              {/* Dashboard */}
              <div className="card">
                <div className="imagem-card">
                  <img
                    src={asset('dashboard.png')}
                    alt="Imagem do Dashboard Gamificado"
                    loading="lazy"
                  />

                  <div className="overlay">
                    <a
                      href="https://e-danillo.github.io/dashboard-de-tarefas-gamificado-react/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Projeto 🔗
                    </a>

                    <a
                      href="https://github.com/E-Danillo/dashboard-de-tarefas-gamificado-react"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Código 💻
                    </a>
                  </div>
                </div>

                <div className="card-texto">
                  <h3>Dashboard Gamificado</h3>
                  <p>
                    Gerenciador de tarefas desenvolvido em React com sistema de XP,
                    níveis, conquistas e prioridades.
                  </p>
                  <p><strong>Stack:</strong> React, CSS, LocalStorage</p>
                  <p><strong>Desafio:</strong> Criar sistema de progressão gamificada e persistência de dados.</p>
                </div>
              </div>

              {/* Car Explorer */}
              <div className="card">
                <div className="imagem-card">
                  <img
                    src={asset('car-explorer.png')}
                    alt="Imagem do Car Explorer"
                    loading="lazy"
                  />

                  <div className="overlay">
                    <a
                      href="https://e-danillo.github.io/car-explorer-react/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Projeto 🔗
                    </a>

                    <a
                      href="https://github.com/E-Danillo/car-explorer-react"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Código 💻
                    </a>
                  </div>
                </div>

                <div className="card-texto">
                  <h3>Car Explorer</h3>
                  <p>
                    Aplicação que busca modelos de veículos por marca através de API pública
                    em tempo real.
                  </p>
                  <p><strong>Stack:</strong> React, API FIPE, CSS</p>
                  <p><strong>Desafio:</strong> Trabalhar com consumo de API e renderização dinâmica.</p>
                </div>
              </div>

              {/* Projeto culinário */}
              <div className="card">
                <div className="imagem-card">
                  <img
                    src={asset('projeto-ovo.jpeg')}
                    alt="Imagem do projeto culinário"
                    loading="lazy"
                  />

                  <div className="overlay">
                    <a
                      href="https://e-danillo.github.io/quebrando-o-gelo-e-o-ovo/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Projeto 🔗
                    </a>

                    <a
                      href="https://github.com/E-Danillo/quebrando-o-gelo-e-o-ovo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Código 💻
                    </a>
                  </div>
                </div>

                <div className="card-texto">
                  <h3>Quebrando o Gelo e o Ovo</h3>
                  <p>
                    Plataforma que sugere receitas com base nos ingredientes informados pelo usuário.
                  </p>
                  <p><strong>Stack:</strong> JavaScript, HTML, CSS</p>
                  <p><strong>Desafio:</strong> Criar lógica de recomendação baseada nos ingredientes.</p>
                </div>
              </div>

              {/* Nezuma Motors */}
              <div className="card">
                <div className="imagem-card">
                  <img
                    src={asset('nezuma_motors.png')}
                    alt="Imagem do Nezuma Motors"
                    loading="lazy"
                  />

                  <div className="overlay">
                    <a
                      href="https://e-danillo.github.io/nezu-motors/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Projeto 🔗
                    </a>

                    <a
                      href="https://github.com/E-Danillo/nezu-motors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Código 💻
                    </a>
                  </div>
                </div>

                <div className="card-texto">
                  <h3>Nezuma Motors</h3>
                  <p>
                    Site conceitual automotivo premium com foco em design sofisticado e narrativa visual.
                  </p>
                  <p><strong>Stack:</strong> HTML, CSS, JavaScript</p>
                  <p><strong>Desafio:</strong> Criar experiência visual premium e responsiva.</p>
                </div>
              </div>

              {quantidadeVisivel > 4 && (
                <>
                  {/* Relógio */}
                  <div className="card">
                    <div className="imagem-card">
                      <img
                        src={asset('relogiodinamico.png')}
                        alt="Imagem do relógio dinâmico"
                        loading="lazy"
                      />

                      <div className="overlay">
                        <a
                          href="https://e-danillo.github.io/relogio-dinamico/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver Projeto 🔗
                        </a>

                        <a
                          href="https://github.com/E-Danillo/relogio-dinamico"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Código 💻
                        </a>
                      </div>
                    </div>

                    <div className="card-texto">
                      <h3>Relógio Dinâmico</h3>
                      <p>
                        Relógio em React com atualização em tempo real e mudanças visuais conforme o horário.
                      </p>
                      <p><strong>Stack:</strong> React, CSS, JavaScript</p>
                      <p><strong>Desafio:</strong> Manipular tempo real e mudanças dinâmicas de interface.</p>
                    </div>
                  </div>

                  {/* Calculadora */}
                  <div className="card">
                    <div className="imagem-card">
                      <img
                        src={asset('calculadora.png')}
                        alt="Imagem da calculadora"
                        loading="lazy"
                      />

                      <div className="overlay">
                        <a
                          href="https://e-danillo.github.io/calculadora-react/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver Projeto 🔗
                        </a>

                        <a
                          href="https://github.com/E-Danillo/calculadora-react"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Código 💻
                        </a>
                      </div>
                    </div>

                    <div className="card-texto">
                      <h3>Calculadora React</h3>
                      <p>
                        Calculadora funcional com operações matemáticas básicas.
                      </p>
                      <p><strong>Stack:</strong> React, CSS</p>
                      <p><strong>Desafio:</strong> Trabalhar manipulação de estado e eventos.</p>
                    </div>
                  </div>

                  {/* To-do list */}
                  <div className="card">
                    <div className="imagem-card">
                      <img
                        src={asset('todolist.png')}
                        alt="Imagem da To-do List"
                        loading="lazy"
                      />

                      <div className="overlay">
                        <a
                          href="https://e-danillo.github.io/to-do-list/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver Projeto 🔗
                        </a>

                        <a
                          href="https://github.com/E-Danillo/to-do-list"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Código 💻
                        </a>
                      </div>
                    </div>

                    <div className="card-texto">
                      <h3>To-do List</h3>
                      <p>
                        Lista de tarefas com criação, remoção e persistência de dados.
                      </p>
                      <p><strong>Stack:</strong> React, LocalStorage, CSS</p>
                      <p><strong>Desafio:</strong> Gerenciar estado e armazenamento local.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {quantidadeVisivel === 4 && (
            <button id="loadMore" className="botao" onClick={carregarMaisProjetos}>
              Ver mais projetos
            </button>
          )}
        </section>

        <section id="servicos">
          <div className="div-conteudo">
            <h2>Serviços</h2>

            <ul>
              <li>
                <strong>Desenvolvimento de Websites Responsivos</strong>
                <span>
                  Criação de sites modernos e responsivos, adaptados para desktop,
                  tablet e dispositivos móveis, garantindo boa usabilidade e visual profissional.
                </span>
              </li>

              <li>
                <strong>Aplicações Web Interativas</strong>
                <span>
                  Desenvolvimento de interfaces dinâmicas utilizando JavaScript e React,
                  com foco em componentes reutilizáveis, interatividade e desempenho.
                </span>
              </li>

              <li>
                <strong>Manutenção e Otimização de Sites</strong>
                <span>
                  Correção de erros, melhorias contínuas e otimização de performance
                  para garantir estabilidade, velocidade e melhor experiência ao usuário.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section id="contato">
          <h2>Contato</h2>

          <p>
            Se você gostou do meu trabalho e tem um projeto em mente, podemos conversar.
            Estou disponível para novos desafios, seja em freelance, colaboração ou oportunidades profissionais:
          </p>

          <a href="#nav">
            <img
              src={asset('seta.png')}
              alt="Voltar ao topo"
              className="back-to-top"
              loading="lazy"
            />
          </a>

            <form
              onSubmit={enviarContato}
              className="form-contato"
            >
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              placeholder="Digite seu nome ou a organização"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Digite seu email"
            />

            <label htmlFor="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows="5"
              required
              placeholder=". . ."
            ></textarea>

            <div>
              <button type="submit" className="botao">Enviar</button>
              <button type="reset" className="botao">Limpar</button>
            </div>
            {statusContato && <p>{statusContato}</p>}
          </form>

          <div className="redes">
            <p>Ou me encontre em:</p>

            <a
              href="https://github.com/E-Danillo"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            {' | '}

            <a
              href="https://www.linkedin.com/in/emerson-danillo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {' | '}

            <a href="mailto:danilloemerson0@gmail.com">
              Email
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 <strong>Emerson Danillo</strong>. Todos os direitos reservados.</p>
      </footer>
    </>
  )
}

export default App