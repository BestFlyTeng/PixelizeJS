# PixelizeJS
处理图片

用法：
    let pix = new PixelizeJS()
    // files 是图片文件数组
    pix.withIsSaveImages(files, (result) => {
        result
            .showImages(dom)
    })
