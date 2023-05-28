# input-img

画像入力コンポーネント

## Demo

- [demo](https://code4fukui.github.io/input-img/)

## Usage

```html
<script type="module" src="https://code4fukui.github.io/input-img/input-img.js"></script>
<input-img id="img"></input-img>
<button id="btn">送信</button>

<script type="module">
btn.onclick = () => {
  const image = new Image();
  image.src = "data:image/png;base64," + img.value;
  document.body.appendChild(image);

  alert(img.value);
};
</script>
```

options
- maxwidth 最大横幅(px) デフォルト 1220
- maxsize 最大サイズ(MB) デフォルト 3MB
- quality JPEG品質 デフォルト 0.9