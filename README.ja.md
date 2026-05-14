# input-img

ブラウザ上で画像の選択、プレビュー、事前処理を行うための、標準技術に基づいたWebコンポーネント（`<input-img>`）です。クライアントサイドでのリサイズ、圧縮、フォーマット変換を処理します。

## デモ

- [デモ](https://code4fukui.github.io/input-img/)

## 機能

- **クライアントサイド処理**: 画像を設定可能な最大幅にリサイズし、最大ファイルサイズ内に収まるよう処理します。
- **フォーマット変換**: データの一貫性を保つため、選択されたすべての画像を設定可能な画質でJPEGに変換します。
- **HEICサポート**: iOSデバイスで一般的な `.heic` 画像形式をネイティブに処理し、JPEGに変換します。
- **複数アップロード**: 単一および複数画像の選択に対応しています。
- **標準Webコンポーネント**: 依存関係のない純粋なESモジュールであり、標準のHTML要素と同じように動作します。

## 使い方

### 1. コンポーネントのインポート

CDNからモジュールをインポートします。

```html
<script type="module" src="https://code4fukui.github.io/input-img/input-img.js"></script>
```

### 2. HTMLに要素を追加

`<input-img>` タグを使用します。属性を使用して動作を設定できます。

```html
<!-- 基本的な単一画像入力 -->
<input-img id="img-input"></input-img>

<!-- 複数の小さな画像用に設定された入力 -->
<input-img id="multi-img-input" multiple maxwidth="800" maxsize="1MB"></input-img>
```

### 3. JavaScriptでの操作

イベントをリッスンし、`.value` プロパティにアクセスしてBase64エンコードされたJPEGデータを取得します。

```html
<input-img id="img"></input-img>
<button id="btn">Submit</button>
<button id="btnClear">Clear</button>

<script type="module">
  const imgInput = document.getElementById("img");
  
  btn.onclick = () => {
    if (!imgInput.value) {
      alert("Please select an image first.");
      return;
    }
    // 値はBase64エンコードされたJPEG文字列です
    const base64Data = imgInput.value;

    // 結果を表示するための画像要素を作成します
    const image = new Image();
    image.src = "data:image/jpeg;base64," + base64Data;
    document.body.appendChild(image);

    console.log(`Image data length: ${base64Data.length}`);
  };

  btnClear.onclick = () => {
    // 値を空文字列に設定して選択をクリアします
    imgInput.value = "";
  };
</script>
```

## 属性

- `maxwidth`: 画像の最大幅（ピクセル単位）。これを超える画像はリサイズされます。デフォルト: `1220`。
- `maxsize`: 最大ファイルサイズ（例: `3MB`, `500KB`）。これを超えるサイズの画像はリサイズされます。デフォルト: `3MB`。
- `quality`: 出力されるJPEG画像の画質（`0.0` から `1.0`）。デフォルト: `0.9`。
- `multiple`: 真偽値（boolean）属性。指定された場合、ユーザーが複数の画像を選択できるようになります。
- `accept`: ファイル入力用の標準的な `accept` 属性。ファイル選択ダイアログでファイルの種類をフィルタリングするために使用します（例: `image/png, image/jpeg`）。
- `name`: 設定した場合、この名前を持つ隠し要素（`<input>`）が作成されてBase64値を保持するため、標準的なフォーム送信と互換性を持ちます。

## JavaScript API

### プロパティ

- **`.value`**:
  - **Get（取得）**: Base64エンコードされたJPEGデータを文字列として返します。`multiple` が有効な場合、すべての画像データをカンマ区切りの1つの文字列として返します。
  - **Set（設定）**: 空文字列（`""`）を設定することで、現在の選択とプレビューをクリアできます。

### 複数画像の処理

`multiple` 属性を使用する場合、`.value` の文字列をカンマで分割することで、Base64文字列の配列を取得できます。

```javascript
const multiInput = document.querySelector("input-img[multiple]");

multiInput.addEventListener("change", () => {
  if (multiInput.value) {
    const base64Array = multiInput.value.split(',');
    console.log(`Selected ${base64Array.length} images.`);
    
    base64Array.forEach(base64Data => {
      // 各画像を処理します
      const image = new Image();
      image.src = "data:image/jpeg;base64," + base64Data;
      document.body.appendChild(image); // 例: bodyに追加します
    });
  }
});
```

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
