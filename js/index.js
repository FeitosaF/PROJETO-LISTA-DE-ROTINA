const inputRotina = document.getElementById('inputRotina');
const buttonEnviar = document.getElementById('buttonEnviar');
const listaRotina = document.getElementById('listaRotina');

function criaSoUmaLi(){
    const li = document.createElement('li');
    return li;
}

function criaTarefas(textoInput){
    const li = criaSoUmaLi();
    li.innerText = textoInput;
    listaRotina.appendChild(li);
    limpaInputRotina();
    criaBotaoApagar(li);
}

function limpaInputRotina(){
    inputRotina.value = '';
    inputRotina.focus();
}

inputRotina.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if(!inputRotina.value) return;
        criaTarefas(inputRotina.value);
    }
})

buttonEnviar.addEventListener('click', function(){
    if(!inputRotina.value) return;
    criaTarefas(inputRotina.value);
})

function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

document.addEventListener('click', function(e){
    const elemento = e.target;

    if (elemento.classList.contains('apagar')){
        elemento.parentElement.remove();
        salvarTarefas();
      }
})


function salvarTarefas(){
    const liTarefas = listaRotina.querySelectorAll('li'); 
    const listaDeTarefas = []; 
  
    for (let tarefa of liTarefas){
      let tarefaTexto = tarefa.innerText;
      tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); 
      listaDeTarefas.push(tarefaTexto);
    }
  
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
  }

  function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
  
    for(let tarefa of listaDeTarefas){
      criaTarefas(tarefa);
    }
  }
  adicionaTarefasSalvas();
