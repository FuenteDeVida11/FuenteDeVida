#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = r"c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\html\ultimo-sermon.html"

# Leer el archivo
with open(file_path, 'rb') as f:
    content_bytes = f.read()

# Decodificar y reparar
content = content_bytes.decode('utf-8', errors='replace')

# Realizar reemplazos de caracteres corruptibles
content = content.replace('Espa\ufffdol', 'Español')
content = content.replace('Espa\ufffdul', 'Español')
content = content.replace('Bling\ufffde', 'Bilingüe')
content = content.replace('Bling\ufffd e', 'Bilingüe')

# Guardar con codificación UTF-8 correcta
with open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("✓ Archivo reparado correctamente")
