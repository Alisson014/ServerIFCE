// PopUpAdd
const popup = document.querySelector('.formAdd');
var activePopUpAdd = false;
function PopUpAdd(){
    activePopUpAdd = !activePopUpAdd;

    activePopUpAdd ? popup.classList.add('popUpAdd') : popup.classList.remove('popUpAdd');
}

// Remover professor
async function deleteEstudante(id) {
    if (confirm('Deseja realmente removê-lo?')) {
      const response = await fetch('/ifce/estudante/remover/' + id, {
        method: 'DELETE'
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Erro na remoção do aluno');
      }
    }
  }


// Atualizar Estudante
async function updateEstudante(id) {
    const matricula = prompt('Matrícula:');
    const nome = prompt('Nome:');
    const idade = prompt('Idade:');
    const email = prompt('E-mail:');
    const turma = prompt('Turma:');
    if (matricula && nome && idade && email && turma) {
      const response = await fetch('/ifce/estudante/atualizar/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matricula, idade, nome, email, turma })
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Erro durante Atualização de aluno');
      }
    }
  }