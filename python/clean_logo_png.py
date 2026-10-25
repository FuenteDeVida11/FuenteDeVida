import zlib, struct, os, math
from analyze_logo import unfilter_png

# Codifica los píxeles RGBA en un PNG usando filas sin filtro.
def pack_png(width, height, raw):
    # Construye los datos PNG usando filas sin filtro.
    raw_with_filter = bytearray()
    stride = width * 4
    for y in range(height):
        raw_with_filter.append(0)  # Tipo de filtro sin transformación.
        raw_with_filter.extend(raw[y * stride : (y + 1) * stride])

    compressed = zlib.compress(raw_with_filter, 9)

    png_data = bytearray(b"\x89PNG\r\n\x1a\n")

    # Encabezado con dimensiones y formato del PNG.
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b"IHDR" + ihdr_data)
    png_data.extend(struct.pack(">I4s", 13, b"IHDR"))
    png_data.extend(ihdr_data)
    png_data.extend(struct.pack(">I", ihdr_crc))

    # Bloque comprimido de píxeles.
    idat_crc = zlib.crc32(b"IDAT" + compressed)
    png_data.extend(struct.pack(">I4s", len(compressed), b"IDAT"))
    png_data.extend(compressed)
    png_data.extend(struct.pack(">I", idat_crc))

    # Marcador de fin del archivo.
    iend_crc = zlib.crc32(b"IEND")
    png_data.extend(struct.pack(">I4s", 0, b"IEND"))
    png_data.extend(struct.pack(">I", iend_crc))

    return png_data

# Elimina píxeles residuales del halo sin alterar el interior del logotipo.
def clean_logo(path_in, path_out):
    with open(path_in, "rb") as f:
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

    cleaned = bytearray(raw)
    cx, cy = width / 2.0, height / 2.0

    removed = 0
    for y in range(height):
        for x in range(width):
            idx = (y * width + x) * 4
            r, g, b, a = raw[idx], raw[idx + 1], raw[idx + 2], raw[idx + 3]
            dist = math.hypot(x - cx, y - cy)

            # Detecta el halo claro del fondo solo cerca del borde exterior.
            if a > 0:
                if dist > 510:
                    # El umbral de color o transparencia identifica el halo.
                    if (r > 150 and g > 190 and b > 220) or a < 200:
                        cleaned[idx + 3] = 0
                        removed += 1
                elif a < 40:
                    cleaned[idx + 3] = 0
                    removed += 1

    print(f"Cleaned {removed} halo pixels.")
    png_bytes = pack_png(width, height, cleaned)
    with open(path_out, "wb") as f:
        f.write(png_bytes)
    print(f"Saved cleaned logo to {path_out}")

clean_logo(
    r"c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo.png",
    r"c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo.png",
)
