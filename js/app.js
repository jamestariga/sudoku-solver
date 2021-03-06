const puzzleBoard = document.getElementById('puzzle')
const solveBtn = document.getElementById('solve-btn')
const solutionDisplay = document.getElementById('solution')
const box = 81;
let submission = []

// Create inputs and grid layout
for (let i = 0; i < box; i++) {
    const div = document.createElement('div')
    div.classList.add('grid')
    const inputElements = document.createElement('input')
    inputElements.setAttribute('type', 'number')
    inputElements.setAttribute('min', '0')
    inputElements.setAttribute('max', '9')
    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
        inputElements.classList.add('odd-section')
    } else {
        inputElements.classList.add('even-section')
    }

    div.appendChild(inputElements)
    puzzleBoard.appendChild(div)
}

// Combines all value that the user enters
const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })

    console.log(submission)
}

// Populates each input section with the solution
const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i]
        }) 
        solutionDisplay.innerHTML = 'The problem is solvable and here is the solution'
    } else {
        solutionDisplay.innerHTML = 'The problem is not solvable'
    }
}

const solve = () => {

    joinValues()
    const data = { numbers: submission.join('')}
    console.log('data', data)

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }) .then(response => response.json())
    .then(data => {
        console.log(data)
        populateValues(data.solvable, data.solution)
        submission = []
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

solveBtn.addEventListener('click', solve)