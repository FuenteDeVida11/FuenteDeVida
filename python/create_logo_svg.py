import base64, os

png_path = r'c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo.png'
svg_path = r'c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo.svg'

with open(png_path, 'rb') as f:
    png_data = f.read()

b64_str = base64.b64encode(png_data).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1082 1082" width="100%" height="100%">
  <image href="data:image/png;base64,{b64_str}" width="1082" height="1082" image-rendering="high-quality" />
</svg>
'''

with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)

print(f"Created SVG logo at {svg_path}")
