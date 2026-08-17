#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = r"c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\html\ultimo-sermon.html"

# Leer con manejo de errores robusto
with open(file_path, 'rb') as f:
    raw_bytes = f.read()

# Probar diferentes codificaciones
for encoding in ['utf-8', 'utf-16', 'latin-1', 'cp1252']:
    try:
        content = raw_bytes.decode(encoding)
        break
    except:
        continue

# Limpiar todos los caracteres problemáticos
# Reemplazar variaciones de Bilingüe
content = content.replace('BilingÃ¼ee', 'Bilingüe')
content = content.replace('BilingÃ¼e', 'Bilingüe')
content = content.replace('Biling\ufffd e', 'Bilingüe')
content = content.replace('Biling\ufffdе', 'Bilingüe')
content = content.replace('Bilingüee', 'Bilingüe')

# Reemplazar variaciones de Español
content = content.replace('EspaÃ±ol', 'Español')
content = content.replace('Espa\ufffdol', 'Español')

# Guardar con UTF-8 explícitamente
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Archivo completamente reparado")
