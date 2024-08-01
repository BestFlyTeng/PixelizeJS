class PixelizeJS {
    // 存放文件对象
    files = []
    dom = undefined
    showLastIndex = 0

    constructor() {
    }

    /**
     * 判断文件类型
     * @param files - 文件数组
     * @return boolean
     * */
    #isFilesType(files) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("image")[0] === files[i].type) {
                return false
            }
        }
        return true
    }

    /**
     * 加载图片文件用的
     * */
    async #promiseImageLoad(file) {
        return await new Promise((resolve, reject) => {
            let image = new Image()
            image.onload = () => {
                resolve(image)
            }
            image.onerror = reject
            image.src = URL.createObjectURL(file)
        })
    }

    /**
     * 设置canvas
     * */
    #setCanvas(fn, num, index = []) {
        let file = this.files
        if (index.length === 0) {
            for (let i = 0; i < file.length; i++) {
                fn(i, num)
            }
        } else {
            for (let i = 0; i < index.length; i++) {
                if (file[index[i]] !== undefined) {
                    fn(index[i], num)
                }
            }
        }
    }

    /**
     * 设置对比度，饱和度
     * */
    #setImage(type, num, index) {
        this.#setCanvas((i, n) => {
            let file = this.files[i]
            let canvas = file.canvas
            let ctx = canvas.getContext("2d")
            ctx.filter = type === "blur" ? `${type}(${n}px)` : `${type}(${n * 100}%)`
            ctx.drawImage(canvas, 0, 0);
        }, num, index)
    }

    /**
     * 判断类型并将文件存到files里
     * @param files - 文件数组
     * @param callback - 回调函数
     * @return this
     * */
    withIsSaveImages(files, callback) {
        if (!this.#isFilesType(files)) {
            throw new Error("Files containing non-image types.")
        }
        this.files = []
        let promises = []
        for (let i = 0; i < files.length; i++) {
            promises.push(new Promise((resolve, reject) => {
                this.files[i] = {}
                let image = this.#promiseImageLoad(files[i]);
                let canvasElement = document.createElement("canvas");
                let ctx = canvasElement.getContext("2d")
                image.then(result => {
                    canvasElement.width = result.width
                    canvasElement.height = result.height
                    ctx.drawImage(result, 0, 0)
                    resolve({
                        image: result,
                        canvas: canvasElement
                    })
                })
            }))
        }
        Promise.all(promises).then(result => {
            this.files = result
            callback(this)
        })
    }

    /**
     * 显示图片到指定DOM元素,后续重复调用不会重新渲染 , 而会接着上次的渲染
     * @param dom - 要显示到的DOM元素
     * @param size - 要显示多少张图片 , 默认 10
     * @return void
     * */
    showImages(dom = this.dom, size = 10) {
        if (dom === undefined)
            throw new Error("Please pass valid dom elements.")

        let fragment = document.createDocumentFragment()
        let files = this.files
        let lastIndex = this.showLastIndex
        for (let i = 0; i < size; i++) {
            fragment.appendChild(files[lastIndex].canvas)
            if (lastIndex === files.length - 1)
                break
            lastIndex++
        }
        dom.appendChild(fragment)
        this.showLastIndex = lastIndex
        this.dom = dom
    }

    /**
     * 设置图片亮度
     * @param luminance - 正常为 0 , (越大越亮) y > x > -1 (暗到黑)
     * @param index - 要修改的图片的索引，默认全部修改
     * */
    setLuminance(luminance = 0, index = []) {
        this.#setImage("brightness", luminance, index)
        return this
    }

    /**
     * 设置对比度
     * @param comparative - 正常为 1 , [0,2]
     * @param index - 要修改的图片的索引，默认全部修改
     * */
    setComparative(comparative = 1, index = []) {
        this.#setImage("contrast", comparative, index)
        return this
    }

    /**
     * 设置饱和度
     * @param saturate - 正常为 1 , [0]
     * @param index - 要修改的图片的索引，默认全部修改
     * */
    setSaturate(saturate = 1, index = []) {
        this.#setImage("saturate", saturate, index)
        return this
    }

    /**
     * 设置高斯模糊
     * @param blur - 正常为 0
     * @param index - 要修改的图片的索引，默认全部修改
     * */
    setBlur(blur = 0, index = []) {
        this.#setImage("blur", blur, index)
        return this
    }

}

let files = document.querySelector("#files")
let dom = document.querySelector(".container");
let pix = new PixelizeJS()
files.addEventListener("change", () => {
    let file = files.files
    pix.withIsSaveImages(file, (result) => {
        result
            .showImages(dom)
    })
})
