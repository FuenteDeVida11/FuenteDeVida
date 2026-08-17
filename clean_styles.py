#!/usr/bin/env python3
import os

file_path = r"c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\html\ultimo-sermon.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remover los estilos inline conflictivos
content = content.replace(' background-size:cover; background-position:center;', '')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Limpieza completada - Se removieron todos los estilos inline conflictivos")
