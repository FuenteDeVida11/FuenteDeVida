import zlib, struct, os, math
from analyze_logo import unfilter_png

def check_fringe(path):
    with open(path, 'rb') as f:
        data = f.read()
    pos = 8
    width = height = 0
    idat_data = bytearray()
    while pos < len(data):
        length, chunk_type = struct.unpack('>I4s', data[pos:pos+8])
        pos += 8
        if chunk_type == b'IHDR':
            width, height, bit_depth, color_type, compression, filter_method, interlace = struct.unpack('>IIBBBBB', data[pos:pos+13])
        elif chunk_type == b'IDAT':
            idat_data.extend(data[pos:pos+length])
        pos += length + 4
    decompressed = zlib.decompress(idat_data)
    raw = unfilter_png(width, height, decompressed)

    cx, cy = width / 2.0, height / 2.0
    
    outer_visible = []
    for y in range(height):
        for x in range(width):
            idx = (y * width + x) * 4
            r, g, b, a = raw[idx], raw[idx+1], raw[idx+2], raw[idx+3]
            dist = math.hypot(x - cx, y - cy)
            if a > 0 and dist > 480:
                outer_visible.append((x, y, r, g, b, a, round(dist, 1)))

    print(f"Total non-transparent pixels with dist > 480: {len(outer_visible)}")
    outer_visible.sort(key=lambda item: item[6], reverse=True)
    print("Farthest 10 visible pixels:")
    for px in outer_visible[:10]:
        print(f"  x={px[0]}, y={px[1]}, RGB=({px[2]},{px[3]},{px[4]}), A={px[5]}, dist={px[6]}")

check_fringe(r'c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo.png')
