#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

file_path = r"c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\html\ultimo-sermon.html"

# Leer el archivo original con tolerancia a caracteres rotos
with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Reemplazos de caracteres corruptibles
replacements = [
    ('Biling\ufffd e', 'Bilingüe'),
    ('Biling\ufffdе', 'Bilingüe'),
    ('Biling\ufffd', 'Bilingüe'),
    ('Espa\ufffdol', 'Español'),
    ('Espa\ufffdul', 'Español'),
    ('Espa\ufffd ol', 'Español'),
]

for old, new in replacements:
    content = content.replace(old, new)

# Guardar con UTF-8 correcto
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Archivo reparado correctamente - UTF-8 restaurado")
