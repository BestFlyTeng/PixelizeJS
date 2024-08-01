# PixelizeJS
处理图片
## Methods
### withIsSaveImages 存取到类中要修改的图片
        接收两个参数
        第一个参数是文件数组，类型：FileList
        第二个参数是一个回调函数，回调函数接收类的this对象
        pix.withIsSaveImages(files,(result)=>{
            // 现在可以用result链式调用了
            console.log(result)
        })
### showImages 显示图片
        接收两个参数
        第一个参数是要显示到哪个dom元素，类型：Element
        第二个参数是要显示多少张图片，默认为10，可选，类型：number
        pix.withIsSaveImages(files, (result) => {
        result
            .showImages(dom,10)
        })
### setLuminance 亮度
        接收两个参数
        第一个参数是亮度值，默认为0，-1最黑，越大越亮
        第二个参数是要给第几个图片设置亮度，默认为 [] ，全部设置，[]里填类里面存的图片的索引
        pix.withIsSaveImages(files, (result) => {
        result
            .setLuminance(0, [0, 1, 2, 5])
            .showImages(dom,10)
        })
### setComparative 对比度
        接收两个参数
        第一个参数是对比度值，默认为1，0-2 
        第二个参数是要给第几个图片设置亮度，默认为 [] ，全部设置，[]里填类里面存的图片的索引
        pix.withIsSaveImages(files, (result) => {
        result
            .setComparative(1.2, [0, 1, 2, 5])
            .showImages(dom,10)
        })
### setSaturate 饱和度
        接收两个参数
        第一个参数是饱和度值，默认为1
        第二个参数是要给第几个图片设置亮度，默认为 [] ，全部设置，[]里填类里面存的图片的索引
        pix.withIsSaveImages(files, (result) => {
        result
            .setSaturate(1.2, [0, 1, 2, 5])
            .showImages(dom,10)
        })
### setBlur 模糊
        接收两个参数
        第一个参数是模糊值，默认为0
        第二个参数是要给第几个图片设置亮度，默认为 [] ，全部设置，[]里填类里面存的图片的索引
        pix.withIsSaveImages(files, (result) => {
        result
            .setBlur(1.2, [0, 1, 2, 5])
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
