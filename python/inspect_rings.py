import zlib, struct, os, math
from analyze_logo import unfilter_png

def inspect_rings(path):
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
    
    # Measure average alpha and color profile per radius r from 0 to 540
    r_bins = {}
    for y in range(0, height, 2):
        for x in range(0, width, 2):
            idx = (y * width + x) * 4
            r, g, b, a = raw[idx], raw[idx+1], raw[idx+2], raw[idx+3]
            dist = int(round(math.hypot(x - cx, y - cy)))
            if dist not in r_bins:
                r_bins[dist] = {'a_sum': 0, 'count': 0, 'r_sum': 0, 'g_sum': 0, 'b_sum': 0}
            r_bins[dist]['a_sum'] += a
            r_bins[dist]['r_sum'] += r
            r_bins[dist]['g_sum'] += g
            r_bins[dist]['b_sum'] += b
            r_bins[dist]['count'] += 1

    print(f"--- Radius profile for {os.path.basename(path)} ---")
    for r in range(400, 541, 10):
        if r in r_bins and r_bins[r]['count'] > 0:
            c = r_bins[r]['count']
            avg_a = r_bins[r]['a_sum'] / c
            avg_r = r_bins[r]['r_sum'] / c
            avg_g = r_bins[r]['g_sum'] / c
            avg_b = r_bins[r]['b_sum'] / c
            print(f"Radius {r}px: Avg A={avg_a:.1f}, RGB=({avg_r:.0f}, {avg_g:.0f}, {avg_b:.0f})")

inspect_rings(r'c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo.png')
