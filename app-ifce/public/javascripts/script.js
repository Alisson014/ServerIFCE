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

//Slider
const imgs = document.querySelectorAll('.ImgHero img');
const maxImgs = imgs.length;
var index = maxImgs - 1;


var slider = setInterval(() => { 

        if(index <= 0){
            index = maxImgs -1;
            imgs.forEach(img => {
                img.classList.remove('hide-img');        
            });       
        }

        imgs[index].classList.add('hide-img');
        index --;
        // console.log(index);
    }
    , 5000);


//Ações dados
var clicked = false;
const listbutton = document.querySelectorAll('.acoes-dados-r');
const acoesButtons = document.querySelectorAll('.acoes-button');

function Opcoes(ind){
    clicked = !clicked;

    if(clicked){
        listbutton[ind].classList.add('appear-mobile-acoes');
        acoesButtons[ind].style.backgroundColor = '#666';
    } else{
        listbutton[ind].classList.remove('appear-mobile-acoes');
        acoesButtons[ind].style.backgroundColor = '#222';
    }
}