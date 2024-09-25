function calcularCapacidade() {
    const numeroCameras = parseInt(document.getElementById('numeroCameras').value);
    const duracaoGravacao = parseInt(document.getElementById('duracaoGravacao').value);
    const horasPorDia = parseInt(document.getElementById('horasPorDia').value);
    const resolucao = parseInt(document.getElementById('resolucaoVideo').value);

    if (isNaN(numeroCameras) || isNaN(duracaoGravacao) || isNaN(horasPorDia) || isNaN(resolucao)) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    let taxaBits;
    switch (resolucao) {
        case 2:
            taxaBits = 1;
            break;
        case 3:
            taxaBits = 1.5;
            break;
        case 4:
            taxaBits = 2;
            break;
        case 5:
            taxaBits = 2.5;
            break;
        case 6:
            taxaBits = 3;
            break;
        case 8:
            taxaBits = 4;
            break;
        case 12:
            taxaBits = 6;
            break;
        case 16:
            taxaBits = 8;
            break;
        default:
            taxaBits = 0;
    }

    // Considerando 15 fps, compressão h.264 e qualidade de vídeo média
    const fps = 15;
    const compressao = 'h264';
    const qualidade = 'media';
    let multiplicadorQualidade = 1.55;  // Padrão para qualidade média

    switch (qualidade) {
        case 'media':
            multiplicadorQualidade = 1.55;
            break;
    }

    taxaBits *= multiplicadorQualidade;

    switch (compressao) {
        case 'h264':
            break;
    }

    const horasTotais = duracaoGravacao * horasPorDia;
    const capacidadeNecessariaMb = numeroCameras * taxaBits * horasTotais * 3600;
    const capacidadeNecessariaMB = capacidadeNecessariaMb / 8;
    const capacidadeNecessariaGB = capacidadeNecessariaMB / 1024;
    const capacidadeNecessariaTB = capacidadeNecessariaGB / 1024;

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'block';

    if (capacidadeNecessariaTB >= 1) {
        resultadoDiv.innerHTML = `Capacidade de armazenamento necessária≅ ${capacidadeNecessariaTB.toFixed(2)} TB`;
    } else if (capacidadeNecessariaGB >= 1) {
        resultadoDiv.innerHTML = `Capacidade de armazenamento necessária≅ ${capacidadeNecessariaGB.toFixed(2)} GB`;
    } else {
        resultadoDiv.innerHTML = `Capacidade de armazenamento necessária≅ ${capacidadeNecessariaMB.toFixed(2)} MB`;
    }
}