import os
import subprocess
from pathlib import Path
from bs4 import BeautifulSoup


INPUT_DOCS_DIRECTORY = '_build/htmlhelp/'
OUTPUT_DOCS_DIRECTORY = Path('../demo/angular/src/assets/docs/')


os.makedirs(OUTPUT_DOCS_DIRECTORY, exist_ok=True)


def only_body(fp):
    soup = BeautifulSoup(fp, 'html.parser')
    el = soup.select_one('div.body')
    return str(el)


def main():
    subprocess.run("make htmlhelp", shell=True, check=True)
    for file in Path(INPUT_DOCS_DIRECTORY).glob('*.html'):
        with open(str(file), 'rb') as fp:
            html = only_body(fp)
        with open(OUTPUT_DOCS_DIRECTORY / file.name, 'w') as f:
            f.write(html)


if __name__ == '__main__':
    main()
