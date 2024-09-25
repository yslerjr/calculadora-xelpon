function calcularCapacidade() {
    const numeroCameras = parseInt(document.getElementById('numeroCameras').value);
    const duracaoGravacao = parseInt(document.getElementById('duracaoGravacao').value);
    const horasPorDia = parseInt(document.getElementById('horasPorDia').value);
    const qualidadeVideo = document.getElementById('qualidadeVideo').value;
    const compressaoVideo = document.getElementById('compressaoVideo').value;
    const fps = parseInt(document.getElementById('taxaQuadros').value);
    const resolucao = parseInt(document.getElementById('resolucaoVideo').value);
    const atividadeCena = parseInt(document.getElementById('atividadeCena').value);

    let taxaBits;

    // Definindo a taxa de bits com base na qualidade do vídeo e resolução (em MP)
    switch (qualidadeVideo) {
        case 'baixa':
            taxaBits = calcularTaxaBits(resolucao, 1.88);
            break;
        case 'media':
            taxaBits = calcularTaxaBits(resolucao, 3.1);
            break;
        case 'alta':
            taxaBits = calcularTaxaBits(resolucao, 6.4);
            break;
    }

    // Ajustando a taxa de bits com base na compressão de vídeo
    switch (compressaoVideo) {
        case 'h264':
            // Sem mudança
            break;
        case 'h265':
            taxaBits *= 0.537; // Compressão H.265 é aproximadamente 30% mais eficiente que H.264
            break;
        case 'h265+':
            taxaBits *= 0.3; // Compressão H.265+ é ainda mais eficiente
            break;
    }

    // Ajustando a taxa de bits com base no FPS
    taxaBits *= fps / 30; // Taxa de bits proporcional ao FPS, considerando 30 FPS como base

    // Ajustando a taxa de bits com base na atividade de cena (percentual de 1 a 100)
    taxaBits *= (atividadeCena / 100); // Taxa de bits proporcional à atividade de cena

    // Total de horas de gravação
    const horasTotais = duracaoGravacao * horasPorDia;

    // Capacidade necessária em Megabits
    const capacidadeNecessariaMb = numeroCameras * taxaBits * horasTotais * 3600; // de Mbps para Mb

    // Capacidade necessária em Megabytes (MB)
    const capacidadeNecessariaMB = capacidadeNecessariaMb / 8; // de Mb para MB

    // Capacidade necessária em Gigabytes (GB)
    const capacidadeNecessariaGB = capacidadeNecessariaMB / 1024; // de MB para GB

    // Capacidade necessária em Terabytes (TB)
    const capacidadeNecessariaTB = capacidadeNecessariaGB / 1024; // de GB para TB

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

function calcularTaxaBits(resolucao, baseTaxa) {
    switch (resolucao) {
        case 2:
            return baseTaxa;
        case 3:
            return baseTaxa * 1.5;
        case 4:
            return baseTaxa * 2;
        case 5:
            return baseTaxa * 2.5;
        case 6:
            return baseTaxa * 3;
        case 8:
            return baseTaxa * 4;
        case 12:
            return baseTaxa * 6;
        case 16:
            return baseTaxa * 8;
        default:
            return 0;
    }
}

function updateAtividadeCenaValue(value) {
    document.getElementById('atividadeCenaValue').innerText = `${value}%`;
}