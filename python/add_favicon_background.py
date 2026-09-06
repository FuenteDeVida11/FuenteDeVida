"""Add a light circular background behind the transparent favicon logo
and generate standard favicon sizes. Only touches jpg/logo-sin-fondo2.png
and derived favicon-*.png files; does not touch logo-sin-fondo.png (nav logo)."""
from pathlib import Path
from PIL import Image, ImageDraw

JPG_DIR = Path(__file__).resolve().parent.parent / "jpg"
SRC = JPG_DIR / "logo-sin-fondo2.png"

BG_COLOR = (255, 255, 255, 255)  # white circle

def build_base_with_background():
    logo = Image.open(SRC).convert("RGBA")
    w, h = logo.size

    bbox = logo.getchannel("A").getbbox()
    diameter = max(bbox[2] - bbox[0], bbox[3] - bbox[1])
    cx = (bbox[0] + bbox[2]) / 2
    cy = (bbox[1] + bbox[3]) / 2

    circle = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(circle)
    r = diameter / 2
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=BG_COLOR)

    combined = Image.alpha_composite(circle, logo)
    return combined

def main():
    combined = build_base_with_background()
    combined.save(SRC)
    print(f"updated {SRC}")

    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,
        "apple-touch-icon-180x180.png": 180,
    }
    for name, size in sizes.items():
        resized = combined.resize((size, size), Image.LANCZOS)
        out_path = JPG_DIR / name
        resized.save(out_path)
        print(f"generated {out_path}")

if __name__ == "__main__":
    main()
