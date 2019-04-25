# HTML转成PDF

## 在客户端还是服务器端生成？

- 在客户端和服务器端都可以生成PDF文件。但是让后端处理它可能更有意义，因为你并不想耗尽用户浏览器可以提供的所有资源。


## 方案1：从 DOM 制作屏幕截图

- 这个方案是最简单的，但它有其自身的局限性。如果你没有特殊需求，例如在 PDF 中选择文本或对文本进行搜索，那么这就是一种简单易用的方法。

### 1. [Html2canvas](https://html2canvas.hertzen.com/)，根据 DOM 生成截图

```js
npm install html2canvas jspdf

import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'
 
function printPDF () {
    const domElement = document.getElementById('your-id')
    html2canvas(domElement, { onclone: (document) => {
      document.getElementById('print-button').style.visibility = 'hidden'
}})
    .then((canvas) => {
        const img = canvas.toDataURL('image/png')
        const pdf = new jsPdf()
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height)
        pdf.save('your-filename.pdf')
})

```

### 2. [jsPdf](https://github.com/MrRio/jsPDF)，一个生成PDF的库


---

## 方案2：只使用 PDF 库

- NPM上有几个库，如 jsPDF（如上所述）或PDFKit。他们的问题是，如果我想使用这些库，我将不得不重新调整页面结构。这肯定会损害可维护性，因为我需要将所有后续更改应用到 PDF 模板和 React 页面中。

- 你需要亲自手动创建 PDF 文档。你需要遍历 DOM 并找出每个元素并将其转换为 PDF 格式，这是一项繁琐的工作。

```js
doc = new PDFDocument
doc.pipe fs.createWriteStream('output.pdf')
doc.font('fonts/PalatinoBold.ttf')
   .fontSize(25)
   .text('Some text with an embedded font!', 100, 100)
 
doc.image('path/to/image.png', {
   fit: [250, 300],
   align: 'center',
   valign: 'center'
});
 
doc.addPage()
   .fontSize(25)
   .text('Here is some vector graphics...', 100, 100)
 
doc.end()

```

- 如果你的目标是直接生成一个 PDF 文件，而不是对一个已经存在的（并且不断变化的）HTML 页面进行转换，它还是很有用的。


## 最终方案3：基于 Node.js 的 Puppeteer 和 Headless Chrome

- [Puppeteer](https://github.com/GoogleChrome/puppeteer)：Puppeteer 是一个 Node 库，它提供了一个高级 API 来控制 DevTools 协议上的 Chrome 或 Chromium。 Puppeteer 默认以 headless 模式运行 Chrome 或 Chromium，但其也可以被配置为完整的（non-headless）模式运行。

- 本质上是一个可以从 Node.js 运行的浏览器。如果你读过它的文档，其中首先提到的就是你可以用 Puppeteer 来生成页面的截图和PDF。

```js
npm i puppeteer( 安装 Puppeteer )

const puppeteer = require('puppeteer')
 
async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://blog.risingstack.com', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4' });
 
  await browser.close();
  return pdf
})

// 一个简单的功能，可导航到 URL 并生成站点的 PD F文件。
```

### 样式控制

- 你可以在生成 PDF 之前插入样式标记，Puppeteer 将生成具有已修改样式的文件。
```css
await page.addStyleTag({ content: '.nav { display: none} .navbar { border: 0px} #print-button {display: none}' })
```

### 将文件发送到客户端并保存

- 如上所述，如果你不把文件保存到磁盘，将会得到一个缓冲区。你只需要把含有适当内容类型的缓冲区发送到前端即可。

```js
printPDF.then(pdf => {
	res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
	res.send(pdf)

```

- 现在，你只需在浏览器向服务器发送请求即可得到生成的 PDF。

```js
function getPDF() {
 return axios.get(`${API_URL}/your-pdf-endpoint`, {
   responseType: 'arraybuffer',
   headers: {
     'Accept': 'application/pdf'
   }
 })
```

- 一旦发送了请求，缓冲区的内容就应该开始下载了。最后一步是将缓冲区数据转换为 PDF 文件。

```js
savePDF = () => {
    this.openModal(‘Loading…’) // open modal
   return getPDF() // API call
     .then((response) => {
       const blob = new Blob([response.data], {type: 'application/pdf'})
       const link = document.createElement('a')
       link.href = window.URL.createObjectURL(blob)
       link.download = `your-file-name.pdf`
       link.click()
       this.closeModal() // close modal
     })
   .catch(err => /** error handling **/)
 }
<button onClick={this.savePDF}>Save as PDF</button>
```


















