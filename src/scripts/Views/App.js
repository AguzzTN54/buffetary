import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import UrlParser from '../Routes/UrlParser';
import Routes from '../Routes/Routes';
import ToTopButton from '../Utils/Init/ToTopButtonInit';
import AppbarInitiator from '../Utils/Init/AppbarInit';
import SkipToContent from '../Utils/Init/SkipToContentInit';

class App {
  constructor({ header, content, loader }) {
    this._header = header;
    this._content = content;
    this._loader = loader;
    this._initAppShell();
  }

  _initAppShell() {
    AppbarInitiator(this._header);
    SkipToContent.init();
    ToTopButton.init();
  }

  async renderPage() {
    const URL = UrlParser.parseActiveUrlWithCombiner();
    let Page = Routes[URL];
    if (!Page) Page = Routes['/notfound'];
    this._content.innerHTML = '';
    await Page
      .setContainer(this._content)
      .render();
    await this._removePageLoader();
  }

  _removePageLoader() {
    this._loader.style.opacity = 0;
    const delayToRemove = 1500;
    const removeLoader = setTimeout(() => {
      clearTimeout(removeLoader);
      this._loader.remove();
    }, delayToRemove);
  }
}

export default App;
