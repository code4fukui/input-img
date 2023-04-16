# input-img

画像入力コンポーネント

## Usage

```html
<script type="module" src="https://code4fukui.github.io/input-img/input-img.js"></script>
<input-img id="img">
<button id="btn">送信</button>

<script type="module">
btn.onclick = () => {
  alert(img.value);
}
</script>
```

options
- maxwidth 最大横幅(px) デフォルト 1220
- maxsize 最大サイズ(MB) デフォルト 3MB
- quality JPEG品質 デフォルト 0.9
