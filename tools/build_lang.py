#!/usr/bin/env python3
"""
Génère les versions anglaise (/en/) et espagnole (/es/) du site à partir de index.html (FR).

POURQUOI : Google n'indexe que le texte présent dans le HTML. Le site change de langue
avec JavaScript (attributs data-en / data-es), donc sans ce script Google ne voit que le
français. Ce script écrit de vraies pages en/index.html et es/index.html, déjà traduites.

QUAND LE LANCER : après CHAQUE modification de index.html ou de tools/faq_data.py,
depuis la racine du dossier :   python3 tools/build_lang.py
(Il faut Python 3 + BeautifulSoup :  pip install beautifulsoup4)

CE QU'IL FAIT :
  1. index.html : insère la FAQ visible + le bloc JSON-LD FAQPage (FR) entre les marqueurs
  2. en/index.html et es/index.html : copie de index.html avec
     - tout le texte data-en / data-es appliqué (comme setLang() dans main.js)
     - <title>, description, Open Graph, canonical, lang, JSON-LD traduits
     - prix au format local, bouton de langue actif, etc.
"""
import html, json, pathlib, re, sys
from bs4 import BeautifulSoup

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'tools'))
from faq_data import FAQ  # noqa: E402

SITE = 'https://bochicacafebistro.ca'
LANGS = ['fr', 'en', 'es']
PATHS = {'fr': '/', 'en': '/en/', 'es': '/es/'}
HTML_LANG = {'fr': 'fr-CA', 'en': 'en-CA', 'es': 'es'}
OG_LOCALE = {'fr': 'fr_CA', 'en': 'en_CA', 'es': 'es_ES'}

HEAD = {
    'en': {
        'title': 'Bochica Restaurant Colombien · Colombian & Latin Food, Québec City',
        'description': 'Colombian and Latin restaurant in Québec City: arepas, empanadas, bandeja paisa, cocktails. Saint-Sauveur, 430 Saint-Vallier W. Book or order online.',
        'og_description': 'Travel to Colombia without leaving Québec! Arepas, empanadas, bandeja paisa and Latin cocktails at 430 Rue Saint-Vallier Ouest, Québec City.',
        'og_image_alt': 'Bochica, Colombian restaurant in Québec City — Medellín bowl',
        'ld_description': 'Colombian and Latin restaurant in Québec City (Saint-Sauveur): arepas, empanadas, bandeja paisa, patacones, sharing platters, Latin cocktails and Colombian desserts. Most dishes are gluten-free. Service in French, English and Spanish.',
    },
    'es': {
        'title': 'Bochica Restaurant Colombien · Comida colombiana y latina en Quebec',
        'description': 'Restaurante colombiano y latino en Quebec: arepas, empanadas, bandeja paisa, cócteles. Saint-Sauveur, 430 Saint-Vallier O. Reserva o pide en línea.',
        'og_description': '¡Viaja a Colombia sin salir de Quebec! Arepas, empanadas, bandeja paisa y cócteles latinos en el 430 Rue Saint-Vallier Ouest, Quebec.',
        'og_image_alt': 'Bochica, restaurante colombiano en Quebec — Bol Medellín',
        'ld_description': 'Restaurante colombiano y latino en Quebec (Saint-Sauveur): arepas, empanadas, bandeja paisa, patacones, picadas, cócteles latinos y postres colombianos. La mayoría de los platos son sin gluten. Atención en francés, inglés y español.',
    },
}
FAQ_TITLES = {
    'tag': {'fr': 'Bon à savoir', 'en': 'Good to know', 'es': 'Bueno saber'},
    'h2': {'fr': 'Questions fréquentes', 'en': 'Frequently asked questions', 'es': 'Preguntas frecuentes'},
}


def attrs(d):
    return ' '.join(f'data-{l}="{html.escape(d[l], quote=True)}"' for l in LANGS)


def faq_section_html():
    items = []
    for it in FAQ:
        items.append(
            '      <details class="faq-item">\n'
            f'        <summary class="faq-q" {attrs(it["q"])}>{html.escape(it["q"]["fr"])}</summary>\n'
            f'        <p class="faq-a" {attrs(it["a"])}>{html.escape(it["a"]["fr"])}</p>\n'
            '      </details>'
        )
    return (
        '<!-- FAQ:START -->\n'
        '<section class="faq" id="faq" aria-labelledby="faq-title">\n'
        '  <div class="faq-inner">\n'
        '    <div class="section-center reveal">\n'
        '      <div class="ornament"><div class="ornament-dots"><span></span><span></span><span></span></div></div>\n'
        f'      <span class="section-tag" {attrs(FAQ_TITLES["tag"])}>{FAQ_TITLES["tag"]["fr"]}</span>\n'
        f'      <h2 class="section-title" id="faq-title" {attrs(FAQ_TITLES["h2"])}>{FAQ_TITLES["h2"]["fr"]}</h2>\n'
        '    </div>\n'
        '    <div class="faq-list reveal">\n'
        + '\n'.join(items) + '\n'
        '    </div>\n'
        '  </div>\n'
        '</section>\n'
        '<!-- FAQ:END -->'
    )


def faq_jsonld(lang):
    data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'inLanguage': HTML_LANG[lang],
        'mainEntity': [
            {'@type': 'Question', 'name': it['q'][lang],
             'acceptedAnswer': {'@type': 'Answer', 'text': it['a'][lang]}}
            for it in FAQ
        ],
    }
    body = json.dumps(data, ensure_ascii=False, indent=2)
    return ('<!-- FAQ-JSONLD:START -->\n  <script type="application/ld+json">\n'
            + body + '\n  </script>\n  <!-- FAQ-JSONLD:END -->')


def put_between(src, start, end, content):
    i, j = src.index(start), src.index(end) + len(end)
    return src[:i] + content + src[j:]


def format_price(amount, lang):
    n = float(amount)
    txt = str(int(n)) if n.is_integer() else f'{n:.2f}'
    return '$' + txt if lang == 'en' else txt.replace('.', ',') + ' $'


def set_inner(el, markup):
    el.clear()
    frag = BeautifulSoup(markup, 'html.parser')
    for node in list(frag.contents):
        el.append(node)


def build(lang, fr_html):
    src = put_between(fr_html, '<!-- FAQ-JSONLD:START -->', '<!-- FAQ-JSONLD:END -->', faq_jsonld(lang))
    soup = BeautifulSoup(src, 'html.parser')
    H = HEAD[lang]
    url = SITE + PATHS[lang]

    root = soup.html
    root['lang'] = HTML_LANG[lang]
    root['data-page-lang'] = lang

    # ---- <head> ----
    soup.title.string = H['title']
    soup.find('meta', attrs={'name': 'description'})['content'] = H['description']
    soup.find('link', rel='canonical')['href'] = url
    for prop, val in [('og:url', url), ('og:title', H['title']), ('og:description', H['og_description']),
                      ('og:image:alt', H['og_image_alt']), ('og:locale', OG_LOCALE[lang])]:
        soup.find('meta', attrs={'property': prop})['content'] = val
    alts = soup.find_all('meta', attrs={'property': 'og:locale:alternate'})
    others = [OG_LOCALE[l] for l in LANGS if l != lang]
    for m, v in zip(alts, others):
        m['content'] = v
    for name, val in [('twitter:url', url), ('twitter:title', H['title']), ('twitter:description', H['og_description']),
                      ('twitter:image:alt', H['og_image_alt'])]:
        soup.find('meta', attrs={'name': name})['content'] = val

    # JSON-LD Restaurant : description traduite
    for s in soup.find_all('script', type='application/ld+json'):
        txt = s.string or ''
        if '"@type": "Restaurant"' in txt:
            data = json.loads(txt)
            data['description'] = H['ld_description']
            data['url'] = url
            s.string = '\n  ' + json.dumps(data, ensure_ascii=False, indent=2).replace('\n', '\n  ') + '\n  '

    # ---- <body> ----
    gate = soup.find(id='lang-gate')
    if gate:
        gate.decompose()

    for el in soup.find_all(attrs={f'data-{lang}': True}):
        set_inner(el, el[f'data-{lang}'])
    for key, attr in [('aria', 'aria-label'), ('alt', 'alt'), ('title', 'title')]:
        for el in soup.find_all(attrs={f'data-{key}-{lang}': True}):
            el[attr] = el[f'data-{key}-{lang}']
    for el in soup.find_all(attrs={'data-amount': True}):
        el.string = format_price(el['data-amount'], lang)

    for a in soup.select('a.lang-btn'):
        active = a.get('data-lang') == lang
        classes = [c for c in a.get('class', []) if c != 'active']
        if active:
            classes.append('active')
            a['aria-current'] = 'page'
        elif 'aria-current' in a.attrs:
            del a['aria-current']
        a['class'] = classes

    logo = soup.select_one('a.nav-logo')
    if logo:
        logo['href'] = PATHS[lang]
    inp = soup.find('input', attrs={'name': '_language'})
    if inp:
        inp['value'] = lang

    out = str(soup)
    banner = (f'<!-- ⚠️ FICHIER GÉNÉRÉ par tools/build_lang.py à partir de index.html — NE PAS MODIFIER À LA MAIN.\n'
              f'     Modifier index.html (attributs data-{lang}) puis relancer : python3 tools/build_lang.py -->\n')
    out = out.replace('<!DOCTYPE html>\n', '<!DOCTYPE html>\n' + banner, 1)
    return out


def main():
    index = ROOT / 'index.html'
    fr = index.read_text(encoding='utf-8')
    fr = put_between(fr, '<!-- FAQ:START -->', '<!-- FAQ:END -->', faq_section_html())
    fr = put_between(fr, '<!-- FAQ-JSONLD:START -->', '<!-- FAQ-JSONLD:END -->', faq_jsonld('fr'))
    index.write_text(fr, encoding='utf-8')
    print('index.html  ✓ (FAQ + JSON-LD FR)')
    for lang in ['en', 'es']:
        out = ROOT / lang / 'index.html'
        out.parent.mkdir(exist_ok=True)
        out.write_text(build(lang, fr), encoding='utf-8')
        print(f'{lang}/index.html ✓')


if __name__ == '__main__':
    main()
