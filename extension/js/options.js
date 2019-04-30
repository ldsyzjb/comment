
        // let background = chrome.extension.getBackgroundPage();
        let form = document.querySelector('form');

        let color       = document.querySelector('input.fontColor')
        let fontFamily  = document.querySelector('select');
        let fontSize    = document.querySelector('input.fontSize')
        let maxWidth    = document.querySelector('input.maxWidth');

        let save    = document.querySelector('button.save')
        let reset   = document.querySelector('button.reset');


        color.addEventListener('change', e => {
            color.nextElementSibling.innerText = color.value;
        })

        fontFamily.addEventListener('change', e => {
            fontFamily.nextElementSibling.style.fontFamily = fontFamily.value;
        })
    
        save.addEventListener('click', e => {
            let value = {
                'color': color.value,
                'font-family': fontFamily.value,
                'font-size': fontSize.value + 'px',
                'max-width': maxWidth.value + 'px'
            }
            chrome.storage.local.set({style})
        })


        reset.addEventListener('click', e => {
            let value = {
                'color': '#000000',
                'font-family': 'initial',
                'font-size': 16 + 'px',
                'max-width': 220 + 'px'
            }
            chrome.storage.local.set({style})
        })

