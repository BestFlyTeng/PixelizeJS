# PixelizeJS
处理图片
## Methods
### withIsSaveImages
        接收两个参数
        第一个参数是文件数组
        第二个参数是一个回调函数，回调函数接收类的this对象
## Examples
        let files = document.querySelector("#files")
        // 显示到 .container
        let dom = document.querySelector(".container");
        files.addEventListener("change", () => {
            // 获取files文件数组
            let file = files.files
            // 创建 PixelizeJS 实例
            let pix = new PixelizeJS()
            pix.withIsSaveImages(file, (result) => {
                result
                    .setLuminance(0)
                    .setBlur(0)
                    // 更多方法 ...
                    .showImages(dom)
            })
        })
