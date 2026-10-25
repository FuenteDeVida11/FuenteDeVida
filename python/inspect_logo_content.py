import zlib, struct, os
from analyze_logo import unfilter_png

# Resume los colores dominantes de los píxeles visibles del logotipo.
def inspect_content(path):
    with open(path, "rb") as f:
        data = f.read()
    pos = 8
    width = height = 0
    idat_data = bytearray()
    while pos < len(data):
        length, chunk_type = struct.unpack(">I4s", data[pos : pos + 8])
        pos += 8
        if chunk_type == b"IHDR":
            (
                width,
                height,
                bit_depth,
                color_type,
                compression,
                filter_method,
                interlace,
            ) = struct.unpack(">IIBBBBB", data[pos : pos + 13])
        elif chunk_type == b"IDAT":
            idat_data.extend(data[pos : pos + length])
        pos += length + 4
    decompressed = zlib.decompress(idat_data)
    raw = unfilter_png(width, height, decompressed)

    # Muestrea los píxeles con suficiente opacidad.
    color_map = {}
    for y in range(0, height, 2):
        for x in range(0, width, 2):
            idx = (y * width + x) * 4
            r, g, b, a = raw[idx], raw[idx + 1], raw[idx + 2], raw[idx + 3]
            if a > 50:
                # Agrupa tonos cercanos para reducir el número de colores.
                key = (r // 16 * 16, g // 16 * 16, b // 16 * 16)
                color_map[key] = color_map.get(key, 0) + 1

    sorted_colors = sorted(color_map.items(), key=lambda x: x[1], reverse=True)
    print(f"Top colors in {os.path.basename(path)}:")
    for col, cnt in sorted_colors[:15]:
        print(f"  RGB{col}: {cnt} pixels")

inspect_content(
    r"c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo.png"
)
