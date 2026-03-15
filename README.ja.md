# input-img

画像入力コンポーネント

## デモ

- [デモ](https://code4fukui.github.io/input-img/)

## 機能

- 画像ファイルを入力できる
- 最大サイズと品質を設定できる
- 複数の画像を選択できる

## 使い方

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

オプション:
- `maxwidth`: 最大横幅(px)、デフォルト 1220
- `maxsize`: 最大サイズ(MB)、デフォルト 3MB 
- `quality`: JPEG品質、デフォルト 0.9

## ライセンス

MIT License