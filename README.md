# input-img

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

An image input component.

## Demo
- [demo](https://code4fukui.github.io/input-img/)

## Features
- Resizes image to a maximum width
- Enforces a maximum file size
- Configures JPEG quality
- Supports multiple image uploads

## Usage
```html
<script type="module" src="https://code4fukui.github.io/input-img/input-img.js"></script>
<input-img id="img"></input-img>
<button id="btn">Submit</button>

<script type="module">
btn.onclick = () => {
  const image = new Image();
  image.src = "data:image/png;base64," + img.value;
  document.body.appendChild(image);

  alert(img.value);
};
</script>
```

Options:
- `maxwidth`: Maximum width (px), default 1220
- `maxsize`: Maximum size (MB), default 3MB
- `quality`: JPEG quality, default 0.9

## License
MIT License — see [LICENSE](LICENSE).