# input-img

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A standards-based web component (`<input-img>`) for selecting, previewing, and pre-processing images in the browser. It handles resizing, compression, and format conversion on the client side.

## Demo

- [Demo](https://code4fukui.github.io/input-img/)

## Features

- **Client-Side Processing**: Resizes images to a configurable maximum width and enforces a maximum file size.
- **Format Conversion**: Converts all selected images to JPEG with configurable quality for consistency.
- **HEIC Support**: Natively handles `.heic` image format (common on iOS devices), converting them to JPEG.
- **Multiple Uploads**: Supports both single and multiple image selection.
- **Standard Web Component**: A zero-dependency, pure ES module that works like a standard HTML element.

## Usage

### 1. Import the component

Import the module from a CDN.

```html
<script type="module" src="https://code4fukui.github.io/input-img/input-img.js"></script>
```

### 2. Add the element to your HTML

Use the `<input-img>` tag. You can configure its behavior with attributes.

```html
<!-- Basic single-image input -->
<input-img id="img-input"></input-img>

<!-- Input configured for multiple, smaller images -->
<input-img id="multi-img-input" multiple maxwidth="800" maxsize="1MB"></input-img>
```

### 3. Interact with JavaScript

Listen for events and access the `.value` property to get the Base64-encoded JPEG data.

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
    // The value is a Base64 encoded JPEG string
    const base64Data = imgInput.value;

    // Create an image element to display the result
    const image = new Image();
    image.src = "data:image/jpeg;base64," + base64Data;
    document.body.appendChild(image);

    console.log(`Image data length: ${base64Data.length}`);
  };

  btnClear.onclick = () => {
    // Clear the selection by setting the value to an empty string
    imgInput.value = "";
  };
</script>
```

## Attributes

- `maxwidth`: The maximum width in pixels for an image. Images exceeding this will be resized. Default: `1220`.
- `maxsize`: The maximum file size (e.g., `3MB`, `500KB`). Images are resized if they exceed this size. Default: `3MB`.
- `quality`: The quality of the output JPEG image, from `0.0` to `1.0`. Default: `0.9`.
- `multiple`: A boolean attribute. If present, it allows the user to select multiple images.
- `accept`: The standard `accept` attribute for file inputs, used to filter file types in the selection dialog (e.g., `image/png, image/jpeg`).
- `name`: If set, a hidden `<input>` with this name will be created to hold the Base64 value, making the component compatible with standard form submissions.

## JavaScript API

### Properties

- **`.value`**:
  - **Get**: Returns the Base64-encoded JPEG data as a string. If `multiple` is enabled, it returns a single comma-separated string of all image data.
  - **Set**: Can be set to an empty string (`""`) to clear the current selection and preview.

### Handling Multiple Images

When the `multiple` attribute is used, split the `.value` string by the comma to get an array of Base64 strings.

```javascript
const multiInput = document.querySelector("input-img[multiple]");

multiInput.addEventListener("change", () => {
  if (multiInput.value) {
    const base64Array = multiInput.value.split(',');
    console.log(`Selected ${base64Array.length} images.`);
    
    base64Array.forEach(base64Data => {
      // Process each image
      const image = new Image();
      image.src = "data:image/jpeg;base64," + base64Data;
      document.body.appendChild(image); // Example: append to body
    });
  }
});
```

## License

MIT License — see [LICENSE](LICENSE).