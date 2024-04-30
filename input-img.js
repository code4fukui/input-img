import { Base64 } from "https://js.sabae.cc/Base64.js";
//import { imgutil } from "https://code4fukui.github.io/input-image/imgutil.js";
import { imgutil } from "./imgutil.js";

class InputImg extends HTMLElement {
  constructor(opts) {
    super();
    if (opts) {
      for (const name in opts) {
        if (opts[name] != null) {
          this.setAttribute(name, opts[name]);
        }
      }
    }

    const name = this.getAttribute("name");
    const accept = this.getAttribute("accept");
    //console.log(uploadurl, maxwidth, maxsize);
    const multiple = this.getAttribute("multiple") != null;

    const inp = document.createElement("input");
    this.inp = inp;
    this.appendChild(inp);
    inp.type = "file";
    inp.accept = accept;
    if (multiple) {
      inp.multiple = true;
    }

    const inp2 = document.createElement("input");
    this.appendChild(inp2);
    inp2.type = "hidden";
    inp2.name = name;

    /*
    const imgrm = document.createElement("button");
    imgrm.textContent = "削除";
    this.appendChild(imgrm);
    imgrm.onclick = () => {
      inp.value = "";
      inp.onchange();
    };
    */

    const imgc = document.createElement("div");
    this.imgc = imgc;
    this.appendChild(imgc);
    inp.onchange = async (e) => {
      const maxwidth = this.getAttribute("maxwidth") || 1220;
      const maxsize = this.getAttribute("maxsize") || "3MB";
      const quality = this.getAttribute("quality") || 0.9;

      if (!multiple) {
        while (this.imgc.firstElementChild) {
          this.imgc.removeChild(this.imgc.firstElementChild);
        }
      }
      if (!e) {
        return;
      }
      const files = [];
      for (const file of e.target.files) {
        if (file.type.startsWith("image/")) {
          files.push(file);
        }
      }
      files.sort((a, b) => a.lastModified - b.lastModified); // 更新古い順
      //files.sort((a, b) => (a < b ? -1 : ((a > b ? 1 : 0)))); // 名前順
      // console.log(files.map(f => f.name + " " + f.lastModified));
      const ps = [];
      for (const file of files) {
        const type = file.type;
        const p = async () => {
          const img = await imgutil.loadResizedImage(file, maxwidth, maxsize);
          const mimeType = "image/jpeg";
          const bin = await imgutil.getArrayBufferFromImage(img, mimeType, quality);
          const enc = Base64.encode(new Uint8Array(bin));

          // data:[<mediatype>][;base64],<data>
          const src = `data:${mimeType};base64,${enc}`;
          console.log(src);

          const image = new Image();
          image.src = src;
          imgc.appendChild(image);

          /*
          const canvas = document.createElement("canvas");
          const [iw, ih] = [img.orgwidth || img.width, img.orgheight || img.height];
          canvas.width = iw;
          canvas.height = ih;
          const g = canvas.getContext("2d");
          g.fillStyle = "#ffffff";
          g.fillRect(0, 0, iw, ih);
          g.drawImage(img, 0, 0, iw, ih, 0, 0, iw, ih);
          
          canvas.value = Base64.encode(new Uint8Array(bin));
          imgc.appendChild(canvas);
          */
        };
        ps.push(p());
        if (!multiple) {
          break;
        }
      }
      await Promise.all(ps);
      inp2.value = this.value;
    };
  }

  get name() {
    return this.getAttribute("name");
  }

  get value() { // bin or bin array
    const res = [];
    for (let i = 0; i < this.imgc.children.length; i++) {
      res.push(this.imgc.children[i].src.split(",")[1]);
    }

    const multiple = this.getAttribute("multiple") != null;
    if (!multiple) {
      return res[0];
    }
    return res.join(",");
  }

  set value(bin) {
    if (bin == "") {
      this.inp.value = "";
      this.imgc.innerHTML = "";
      return;
    }
    const imgs = bin.split(",");
    // todo multiple
    /*
    for (const img of imgs) {
      const imgup = new ImageUploader(uploadurl);
      imgup.setImage(n);
      this.imgc.appendChild(imgup);
    }
    */
  }
}

customElements.define("input-img", InputImg);

export { InputImg };
