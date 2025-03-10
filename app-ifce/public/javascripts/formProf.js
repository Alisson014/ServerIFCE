// PopUpAdd
const popup = document.querySelector('.formAdd');
var activePopUpAdd = false;
function PopUpAdd(){
    activePopUpAdd = !activePopUpAdd;

    activePopUpAdd ? popup.classList.add('popUpAdd') : popup.classList.remove('popUpAdd');
}

// Remover professor
async function deleteProfesso(id) {
    if (confirm('Deseja realmente removê-lo?')) {
      const response = await fetch('/ifce/professor/remover/' + id, {
        method: 'DELETE'
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Erro na remoção do professor');
      }
    }
  }


// Atualizar Professor
async function updateProfessor(id) {
    const matricula = prompt('Matrícula:');
    const nome = prompt('Nome:');
    const email = prompt('E-mail:');
    const departamento = prompt('Departamento:');
    if (matricula && nome && email && departamento) {
      const response = await fetch('/ifce/professor/atualizar/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matricula, nome, email, departamento })
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Erro durante Atualização de professor');
      }
    }
  }