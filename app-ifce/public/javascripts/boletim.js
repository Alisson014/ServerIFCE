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


// Boletim
function GeraBoletim(){
    var doc = new jspdf.jsPDF();
    doc.autoTable({html: '#Boletim'});
    doc.save('Boletim.pdf');
}