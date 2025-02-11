let jogador, computador;
const pontosTotal = 150;

function atualizarPontosRestantes() {
    const vida = parseInt(document.getElementById('vida').value) || 0;
    const agilidade = parseInt(document.getElementById('agilidade').value) || 0;
    const poder = parseInt(document.getElementById('poder').value) || 0;
    const pontosRestantes = pontosTotal - (vida + agilidade + poder);
    document.getElementById('pontos-restantes').textContent = `Pontos restantes: ${pontosRestantes}`;
}

document.getElementById('vida').addEventListener('input', atualizarPontosRestantes);
document.getElementById('agilidade').addEventListener('input', atualizarPontosRestantes);
document.getElementById('poder').addEventListener('input', atualizarPontosRestantes);

function criarPersonagem() {
    const nome = document.getElementById('nome').value;
    const classe = document.getElementById('classe').value;
    const vida = parseInt(document.getElementById('vida').value);
    const agilidade = parseInt(document.getElementById('agilidade').value);
    const poder = parseInt(document.getElementById('poder').value);

    if (!nome || vida + agilidade + poder !== pontosTotal) {
        alert('Por favor, preencha todos os campos e distribua exatamente 150 pontos.');
        return;
    }

    jogador = {nome, classe, vida, agilidade, poder};
    computador = gerarOponente();

    document.getElementById('criacao-personagem').style.display = 'none';
    document.getElementById('duelo').style.display = 'block';
}

function gerarOponente() {
    const classes = ['Guerreiro', 'Mago', 'Ladino'];
    const classe = classes[Math.floor(Math.random() * classes.length)];
    const nome = `Oponente ${classe}`;
    const vida = Math.floor(Math.random() * 70) + 30;
    const agilidade = Math.floor(Math.random() * 70) + 30;
    const poder = pontosTotal - vida - agilidade;
    return {nome, classe, vida, agilidade, poder};
}

function duelo(lutador1, lutador2) {
    let turno = 0;
    while (lutador1.vida > 0 && lutador2.vida > 0) {
        let atacante = turno % 2 === 0 ? lutador1 : lutador2;
        let defensor = turno % 2 === 0 ? lutador2 : lutador1;
        
        let dano = calcularDano(atacante, defensor);
        defensor.vida = Math.max(0, defensor.vida - dano);
        
        alert(`${atacante.nome} ataca ${defensor.nome} causando ${dano} de dano!\n${defensor.nome} agora tem ${defensor.vida} de vida.`);
        
        turno++;
    }
    
    return lutador1.vida > 0 ? lutador1.nome : lutador2.nome;
}

function calcularDano(atacante, defensor) {
    let dano = atacante.poder;

    // Chance de desvio do Ladino
    if (defensor.classe === 'Ladino' && defensor.agilidade >= 60 && Math.random() < 0.2) {
        return 0;
    }

    // Resistência do Guerreiro
    if (defensor.classe === 'Guerreiro' && defensor.vida >= 60) {
        dano *= 0.95;
    }

    // Acerto crítico do Mago
    if (atacante.classe === 'Mago' && atacante.poder >= 60 && Math.random() < 0.03) {
        dano *= 2;
    }

    return Math.floor(dano);
}

function iniciarDuelo() {
    alert(`Seu personagem: ${jogador.nome} (${jogador.classe})\nVida: ${jogador.vida}, Agilidade: ${jogador.agilidade}, Poder: ${jogador.poder}`);
    alert(`Oponente: ${computador.nome} (${computador.classe})\nVida: ${computador.vida}, Agilidade: ${computador.agilidade}, Poder: ${computador.poder}`);
    
    const vencedor = duelo(jogador, computador);
    
    alert(`O vencedor é: ${vencedor} 🏆`);
}
