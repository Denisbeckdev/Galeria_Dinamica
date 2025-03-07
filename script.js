const slots = document.querySelectorAll('.slot');
const inputImagem = document.getElementById('input-imagem');
const popup = document.getElementById('popup');
const popupImagem = document.getElementById('popup-imagem');
const popupFechar = document.getElementById('popup-fechar');
const popupRemover = document.getElementById('popup-remover');

let slotId;

slots.forEach(slot => {
    slot.addEventListener("click", () => {
        slotId = slot.id;
        console.log(`Slot Clicado: ${slotId}`);

        const imgExistente = slot.querySelector('img');

        if (!imgExistente) {
            inputImagem.click();
            console.log(`Abrir input de imagem para ${slotId}`);
        } else {
            abrirPopup(imgExistente.src, slotId);
        }
    });
});

inputImagem.addEventListener("change", (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
        const tipoArquivo = arquivo.type;
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif'];

        if (tiposPermitidos.includes(tipoArquivo)) {
            const leitor = new FileReader();

            leitor.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Imagem Carregada';

                const slotSelecionado = document.querySelector(`#${slotId}`);
                console.log(slotSelecionado);

                if (slotSelecionado) {
                    let storedImages = JSON.parse(localStorage.getItem('imagens')) || [];
                    storedImages = storedImages.filter(image => image.slotId !== slotId);

                    slotSelecionado.innerHTML = ''; 
                    slotSelecionado.appendChild(img);
                    slotSelecionado.classList.remove('vazio');

                    console.log('Imagem adicionada ao slot', slotSelecionado.id);

                    storedImages.push({ slotId: slotId, imgSrc: img.src });
                    localStorage.setItem('imagens', JSON.stringify(storedImages));
                }
            };

            leitor.readAsDataURL(arquivo);
        } else {
            alert('Por favor, insira somente arquivos de imagem (JPG, PNG, GIF).');
            console.log('O arquivo não é uma imagem válida:', arquivo.name);
        }
    }
});

function abrirPopup(src, slotIdSelecionado) {
    popupImagem.src = src;
    popup.style.display = "flex";
    popup.dataset.slotId = slotIdSelecionado; 
}

popupFechar.addEventListener("click", () => {
    popup.style.display = "none";
});

popupRemover.addEventListener("click", () => {
    const slotIdParaRemover = popup.dataset.slotId;
    const slot = document.getElementById(slotIdParaRemover);

    if (slot) {
        slot.innerHTML = '';  
        slot.classList.add('vazio'); 

        console.log(`Imagem removida do slot ${slotIdParaRemover}`);

        let storedImages = JSON.parse(localStorage.getItem('imagens')) || [];
        storedImages = storedImages.filter(image => image.slotId !== slotIdParaRemover);
        localStorage.setItem('imagens', JSON.stringify(storedImages));
    }

    popup.style.display = "none"; 
});

window.addEventListener("load", () => {
    let storedImages = JSON.parse(localStorage.getItem('imagens')) || [];

    storedImages.forEach(image => {
        const slot = document.querySelector(`#${image.slotId}`);
        if (slot) {
            const img = document.createElement('img');
            img.src = image.imgSrc;
            img.alt = 'Imagem Carregada';

            slot.innerHTML = ''; 
            slot.appendChild(img);  
            slot.classList.remove('vazio');
        }
    });
});
