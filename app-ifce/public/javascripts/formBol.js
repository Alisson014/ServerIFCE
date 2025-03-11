// PopUpAdd
const popup = document.querySelector('.formAdd');
var activePopUpAdd = false;
function PopUpAdd(){
    activePopUpAdd = !activePopUpAdd;

    activePopUpAdd ? popup.classList.add('popUpAdd') : popup.classList.remove('popUpAdd');
}


// Alterar notas
async function updateNotas(id, m) {
    
    const n1 = prompt('N1:');
    const n2 = prompt('N2:');
    const n3 = prompt('N3:');
    const n4 = prompt('N4:');

    console.log(id, typeof(id));
    if ((n1 && n2 && n3 && n4)) {
      const response = await fetch(`/ifce/boletim/alterarnota/:${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ n1, n2, n3, n4, m })
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Erro durante alteração de nota');
      }
    }
  }
