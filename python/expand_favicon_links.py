"""Añade tamaños estándar de favicon a las páginas HTML.

Solo modifica los enlaces de icono y no toca los logotipos del contenido.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES = list(ROOT.glob("*.html")) + list((ROOT / "html").glob("*.html"))

PATTERN = re.compile(
    r'(?P<indent>[ \t]*)<link rel="icon" href="(?P<prefix>\.{0,2}/?jpg/)logo-sin-fondo2\.png" type="image/png" />'
    r'\s*\n\s*<link rel="apple-touch-icon" href="(?P=prefix)logo-sin-fondo2\.png" />'
)

# Construye el conjunto de enlaces con la ruta e indentación de cada página.
def build_block(indent, prefix):
    lines = [
        f'{indent}<link rel="icon" href="{prefix}logo-sin-fondo2.png" type="image/png" />',
        f'{indent}<link rel="icon" type="image/png" sizes="16x16" href="{prefix}favicon-16x16.png" />',
        f'{indent}<link rel="icon" type="image/png" sizes="32x32" href="{prefix}favicon-32x32.png" />',
        f'{indent}<link rel="icon" type="image/png" sizes="48x48" href="{prefix}favicon-48x48.png" />',
        f'{indent}<link rel="apple-touch-icon" sizes="180x180" href="{prefix}apple-touch-icon-180x180.png" />',
    ]
    return "\n".join(lines)

# Actualiza las páginas que contienen el bloque de favicon esperado.
def main():
    updated = []
    for path in FILES:
        text = path.read_text(encoding="utf-8")
        match = PATTERN.search(text)
        if not match:
            print(f"SKIP (no match): {path}")
            continue
        block = build_block(match.group("indent"), match.group("prefix"))
        new_text = text[: match.start()] + block + text[match.end() :]
        path.write_text(new_text, encoding="utf-8")
        updated.append(path)
        print(f"updated {path}")
    print(f"\nTotal updated: {len(updated)}")

if __name__ == "__main__":
    main()
