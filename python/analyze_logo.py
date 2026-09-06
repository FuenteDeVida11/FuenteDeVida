import zlib, struct, os

def unfilter_png(width, height, decompressed, bpp=4):
    stride = width * bpp
    raw = bytearray(height * stride)
    src_idx = 0
    dst_idx = 0
    for y in range(height):
        filter_type = decompressed[src_idx]
        src_idx += 1
        line = decompressed[src_idx:src_idx+stride]
        src_idx += stride
        
        if filter_type == 0: # None
            for x in range(stride):
                raw[dst_idx + x] = line[x]
        elif filter_type == 1: # Sub
            for x in range(stride):
                left = raw[dst_idx + x - bpp] if x >= bpp else 0
                raw[dst_idx + x] = (line[x] + left) & 0xff
        elif filter_type == 2: # Up
            for x in range(stride):
                up = raw[dst_idx - stride + x] if y > 0 else 0
                raw[dst_idx + x] = (line[x] + up) & 0xff
        elif filter_type == 3: # Average
            for x in range(stride):
                left = raw[dst_idx + x - bpp] if x >= bpp else 0
                up = raw[dst_idx - stride + x] if y > 0 else 0
                raw[dst_idx + x] = (line[x] + (left + up) // 2) & 0xff
        elif filter_type == 4: # Paeth
            for x in range(stride):
                left = raw[dst_idx + x - bpp] if x >= bpp else 0
                up = raw[dst_idx - stride + x] if y > 0 else 0
                up_left = raw[dst_idx - stride + x - bpp] if (y > 0 and x >= bpp) else 0
                p = left + up - up_left
                pa = abs(p - left)
                pb = abs(p - up)
                pc = abs(p - up_left)
                if pa <= pb and pa <= pc:
                    pr = left
                elif pb <= pc:
                    pr = up
                else:
                    pr = up_left
                raw[dst_idx + x] = (line[x] + pr) & 0xff
        dst_idx += stride
    return raw

def inspect_colors(path):
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
    
    dist_max_opaque = 0
    colors_by_dist = {}
    
    for y in range(0, height, 4):
        for x in range(0, width, 4):
            idx = (y * width + x) * 4
            r, g, b, a = raw[idx], raw[idx+1], raw[idx+2], raw[idx+3]
            dist = ((x - cx)**2 + (y - cy)**2)**0.5
            if a > 128:
                if dist > dist_max_opaque:
                    dist_max_opaque = dist
            bucket = int(dist // 50) * 50
            if bucket not in colors_by_dist:
                colors_by_dist[bucket] = []
            if a > 0:
                colors_by_dist[bucket].append((r, g, b, a))

    print(f"File {os.path.basename(path)} max opaque radius: {dist_max_opaque:.1f}px out of {width/2:.1f}px")

inspect_colors(r'c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo.png')
inspect_colors(r'c:\Users\jymoy\OneDrive\Escritorio\Documentos\Igelsia\Html - etc\church website\jpg\logo-sin-fondo2.png')



