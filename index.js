

const validateForm = (event) => {
    const elements = event.target.elements

    const elementsArray = [...elements]
    const inputs = elementsArray.filter(element => element.nodeName === 'INPUT')

    inputs.forEach(input => {
        const errorField = document.getElementById(`${input.name}_error`)
        if (!input.checkValidity()){
            errorField.innerText = input.validationMessage
        }
        else {
            errorField.innerText = ''
        }
    })
}


const handleSubmit = (event) => {
    event.preventDefault()

    validateForm(event)
    
    const form = new FormData(event.target)
    const formObject = Object.fromEntries(form)

    console.log(formObject)
}

const handleClear = () => {
    const spans = document.getElementsByTagName('span')
    const spansArray = [...spans]
    spansArray.forEach(span => span.innerText = '')
}