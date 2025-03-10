// Navbar
const menu = document.querySelector(".menu");
var active = false;
const buttons = document.querySelectorAll('.logo button svg');

buttons[1].classList.add('hide-vis');
menu.classList.add('hide');

const showMenu = () => {
    active = !active;
    if (active){
        menu.classList.remove('hide');
        buttons[0].classList.add('hide-vis');
        buttons[1].classList.remove('hide-vis');
    } else{
        menu.classList.add('hide');
        buttons[0].classList.remove('hide-vis');
        buttons[1].classList.add('hide-vis');
    }
}


// Situação
var notas = [];
function situacao(m){
    const mat = document.querySelectorAll(`.s${m}`);
    const sit = document.querySelector(`.situacao${m}`);

    notas.push(parseFloat(mat[0].innerHTML));
    notas.push(parseFloat(mat[1].innerHTML));
    notas.push(parseFloat(mat[2].innerHTML));
    notas.push(parseFloat(mat[3].innerHTML));
    
    var media = (parseFloat(mat[0].innerHTML) + parseFloat(mat[1].innerHTML) *2 + parseFloat(mat[2].innerHTML*3) + parseFloat(mat[3].innerHTML)*4)/10;
    if (media <= 3){
        sit.innerHTML = "Crítica";
    } else if (media <= 6){
        sit.innerHTML = "Ruim";
    } else if (media < 8){
        sit.innerHTML = "Regular";
    } else{
        sit.innerHTML = "Excelente";
    }
}
situacao(1);
situacao(2);
situacao(3);
situacao(4);
situacao(5);
situacao(6);
situacao(7);
situacao(8);
situacao(9);
situacao(10);
situacao(11);
situacao(12);

// Manipulação de notas
const Tagcfr = document.getElementById('cfr');
const Tagmaiornota = document.getElementById('maiornota');
const Tagmenornota = document.getElementById('menornota');

var cfr = 0.0;
var menornota = 0.0;
var maiornota = 0.0;

notas.forEach(n => {
    cfr += n;
    n > maiornota ? maiornota = n : maiornota;
    n < menornota ? menornota = n : menornota;
});
Tagcfr.innerHTML = `<strong>Coeficiente de rendimento: </strong>${cfr}`;
Tagmaiornota.innerHTML = `<strong>Maior Nota: </strong>${maiornota}`;
Tagmenornota.innerHTML = `<strong>Menor Nota: </strong>${menornota}`;


// Gerar Boletim
function GeraBoletim(){
    var doc = new jspdf.jsPDF();
    doc.autoTable({html: '#Boletim'});
    doc.save('Boletim.pdf');
}