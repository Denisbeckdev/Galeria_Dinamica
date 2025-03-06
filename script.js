const slots = document.querySelectorAll('.slot.vazio');
const inputImagem = document.getElementById('input-imagem')

let slotId;

slots.forEach(slot => {
    slot.addEventListener("click", () => {
        slotId = slot.id;
        console.log(`Slot Clicado: ${slotId}`);

        inputImagem.click();
        console.log(`Abrir input de imagem para ${slotId}`)
    })
})

inputImagem.addEventListener("change", (Event) => {
    const arquivo = Event.target.files[0];

    if (arquivo) {
        const tipoArquivo = arquivo.type;
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif']

        if (tiposPermitidos.includes(tipoArquivo)) { 
        const img = document.createElement('img');
        img.src = URL.createObjectURL(arquivo);
        img.alt = 'Imagem Carregada';

        const slotVazio = document.querySelector(`#${slotId}`)
        console.log(slotVazio);

        if(slotVazio) {
            slotVazio.innerHTML = '';
            slotVazio.appendChild(img);

            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';

            slotVazio.classList.remove('vazio');
            console.log('Imagem adicionada ao slot', slotVazio.id);
        } else {
            console.log('Slot não encontrado!')
            }
        } else {
            alert('Por favor, insira somente arquivos de imagem (JPG,PNG, GIF).');
            console.log('O arquivo não é uma imagem válida:', arquivo.name);
        }
    }
})
