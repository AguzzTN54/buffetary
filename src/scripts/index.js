import 'regenerator-runtime' /* for async await transpile */
import './Components/Appbar'
import './Components/Hero'
import './Components/Resto'

import Data from './Data'

import '../styles/main.scss'

const toTop = () => {
  const t = document.querySelector('.totop').style
  if (window.pageYOffset > 0) {
    t.display = 'flex'
    t.opacity = 1
  } else {
    t.display = 'none'
    t.opacity = 0
  }
}

const Main = () => {
  document.getElementById('root').innerHTML = `
    <a href="#content" class="skip"> Skip To Contents</a>
    <header class="p-relative" id="top">
      <app-bar class="p-absolute"></app-bar>
    </header>
    <hero-content></hero-content>

    <main id="content">
      <resto-list></resto-list>
    </main>

    <footer>
      <a href="#top" class="totop" style="display:none" aria-label="Kembali Ke Atas">
        <i class="bi bi-arrow-up"></i>
      </a>
      Copyright &copy ${new Date().getFullYear()} - <a href="#">Buffetary</a> <br/>
      Made with <i class="bi bi-heart"></i> by AguzzTN54
    </footer>
  `

  Data.getList()
  document.addEventListener('scroll', toTop)
}

document.addEventListener('DOMContentLoaded', Main)
