# PixelizeJS
处理图片

## Examples
        let files = document.querySelector("#files")
        let dom = document.querySelector(".container");
        let pix = new PixelizeJS()
        files.addEventListener("change", () => {
            let file = files.files
            pix.withIsSaveImages(file, (result) => {
                result
                    .setLuminance(0)
                    .setBlur(0)
                    // 更多方法 ...
                    .showImages(dom)
            })
        })
