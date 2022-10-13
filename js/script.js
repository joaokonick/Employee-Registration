const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.querySelector('#m-name')
const sOccupation = document.querySelector('#m-occupation')
const sWage = document.querySelector('#m-wage')
const btnSave = document.querySelector('#btnSave')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sName.value = itens[index].name
    sOccupation.value = itens[index].soccupation
    sWage.value = itens[index].sWage
    id = index
  } else {
    sName.value = ''
    sOccupation.value = ''
    sWage.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.occupation}</td>
    <td>R$ ${item.wage}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sName.value == '' || sOccupation.value == '' || sWage.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].name = sName.value
    itens[id].occupation = sOccupation.value
    itens[id].wage = sWage.value
  } else {
    itens.push({'name': sName.value, 'occupation': sOccupation.value, 'wage': sWage.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()