import zlib, struct, os, math
from analyze_logo import unfilter_png

def inspect_center(path):
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
    
    # Check pixels in center area dist < 460
    opaque_in_center = []
    for y in range(0, height, 4):
        for x in range(0, width, 4):
            idx = (y * width + x) * 4
            r, g, b, a = raw[idx], raw[idx+1], raw[idx+2], raw[idx+3]
            dist = math.hypot(x - cx, y - cy)
            if a > 100 and dist < 460:
                opaque_in_center.append((x, y, r, g, b, a))

    print(f"Opaque pixels in center (dist < 460): {len(opaque_in_center)}")
    # Find bounding box of center elements
    xs = [p[0] for p in opaque_in_center]
    ys = [p[1] for p in opaque_in_center]
    if xs and ys:
        print(f"Center elements bbox: x={min(xs)}..{max(xs)}, y={min(ys)}..{max(ys)}")

inspect_center(r'c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo.png')
