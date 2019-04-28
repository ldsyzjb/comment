
        let color = document.querySelector('input[type=color]')
        color.addEventListener('change', e => {
            console.log(color, color.nextElementSibling)
            color.nextElementSibling.innerText = color.value;
        })

        let fontFamily = document.querySelector('select');
        fontFamily.addEventListener('change', e => {
            fontFamily.nextElementSibling.style.fontFamily = fontFamily.value;
        })
    