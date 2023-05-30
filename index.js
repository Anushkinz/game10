let $game = document.querySelector('#game')
let $start = document.querySelector('#start')
let $time = document.querySelector('#time')
let $time_header = document.querySelector('#time-header')
let $result_header = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $input = document.querySelector("#game-time")
let $loginBtn = document.querySelector('#login')
let $appContent = document.querySelector('.app')
let $loginCowntent = document.querySelector('.login')
let $list = document.querySelector('.list')
let $inLogin = document.querySelector('#inLogin')


let score = 0
let list = []
let user = {}

$start.addEventListener('click', start)


function start() {
    list = getData()
    score = 0
    $start.classList.add('hide')
    $game.style.backgroundColor = "white"
    $time_header.classList.remove('hide')
    $result_header.classList.add('hide')
    $time.textContent = $input.value
    createBox()
    timer()
    $input.setAttribute("disabled", "true")
}


function createBox() {
    $game.innerHTML = ""
    let box = document.createElement('div')

    let size = getRandom(30, 100)
    let left = getRandom(0, 300 - size)
    let top = getRandom(0, 300 - size)

    box.style.backgroundColor = `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)})`
    box.style.width = box.style.height = size + 'px'
    box.style.position = 'absolute'
    box.style.left = left + 'px'
    box.style.top = top + 'px'
    box.setAttribute("data-box", "true")

    $game.insertAdjacentElement('afterbegin', box)
}


function getRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min)
}


$game.addEventListener('click', clickedBox)

function clickedBox(event) {
    if (event.target.dataset.box) {
        createBox()
        score++
    }
}

function timer() {
    let interval = setInterval(function () {
        $time.textContent = ($time.textContent - 0.1).toFixed(1)
        if ($time.textContent == "0.0") {
            clearInterval(interval)
            gameEnd()
        }
    }, 100)

}

function gameEnd() {
    $time_header.classList.add('hide')
    $result_header.classList.remove('hide')
    $game.innerHTML = ""
    $start.classList.remove('hide')
    $game.style.backgroundColor = "#ccc"
    $result.textContent = score
    $input.removeAttribute("disabled")
    user.name = $inLogin.value
    user.score = score
    list.push(user)
    user = {}
    setData(sort(list))
    showUser()
}

$input.addEventListener("input", time)

function time() {
    $time.textContent = $input.value
    $time_header.classList.remove('hide')
    $result_header.classList.add('hide')
}

$loginBtn.addEventListener('click', function () {
    if ($inLogin.value == "") {
        alert("Заполните имя ")
    } else {
        $appContent.classList.remove('hide')
        $loginCowntent.classList.add('hide')
        showUser()
    }
})


function showUser() {
    let list = getData()
    $list.innerHTML = ''
    list.forEach(element => {
        $list.insertAdjacentHTML('beforeend', `
           <li>
            <div class="user">
                <h2>${element.name}</h2>
                <h2>${element.score}</h2>
            </div>
            </li>
        `)
    });
}

function setData(list) {
    localStorage.setItem('list', JSON.stringify(list))
}
function getData(key = 'list') {
    return JSON.parse(localStorage.getItem(key))
}


function sort(list){
    list.sort(compare)
    list.pop()
    return list
}


function compare(a, b) {
    if (a.score < b.score) return 1; // если первое значение больше второго
    if (a.score == b.score) return 0; // если равны
    if (a.score > b.score) return -1; // если первое значение меньше второго
  }