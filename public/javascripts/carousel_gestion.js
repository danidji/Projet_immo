; (function (document, window) {
    const inputUrlImage = document.querySelectorAll(".url_images")


    const carouselWrapper = document.querySelector(".carousel_wrapper")

    inputUrlImage.forEach(img => {
        const li = document.createElement("li")
        li.style.backgroundImage = 'url(' + img.value + ')'
        li.className = "carousel_item"

        carouselWrapper.appendChild(li)
    })

    let currentIndex = 0
    const propWrapperWidth = carouselWrapper.getBoundingClientRect().width

    const rigthButton = document.querySelector(".right")
    const leftButton = document.querySelector(".left")


    const slide = function (dir) {
        return () => {
            currentIndex += dir
            if (currentIndex >= inputUrlImage.length) {
                currentIndex = 0
            } else if (currentIndex < 0) {
                currentIndex = inputUrlImage.length - 1
            }
            const newPosition = -(propWrapperWidth / inputUrlImage.length * currentIndex)
            carouselWrapper.style.left = newPosition + 'px'
        }
    }

    rigthButton.addEventListener('click', slide(1))
    leftButton.addEventListener('click', slide(-1))

}(document, window));





