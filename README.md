# PixelizeJS
处理图片
## Methods
### withIsSaveImages
        接收两个参数
        第一个参数是文件数组，类型：FileList
        第二个参数是一个回调函数，回调函数接收类的this对象
        pix.withIsSaveImages(files,(result)=>{
            // 现在可以用result链式调用了
            console.log(result)
        })
### showImages
        接收两个参数
        第一个参数是要显示到哪个dom元素，类型：Element
        第二个参数是要显示多少张图片，默认为10，可选，类型：number
        pix.withIsSaveImages(file, (result) => {
        result
            .showImages(dom,10)
        })
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
