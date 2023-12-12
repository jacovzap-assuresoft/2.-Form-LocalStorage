const validateForm = (event) => {
    let errors = 0
    const elements = event.target.elements

    const elementsArray = [...elements]
    const inputs = elementsArray.filter(element => element.nodeName === 'INPUT')

    inputs.forEach(input => {
        const errorField = document.getElementById(`${input.name}_error`)
        if (!input.checkValidity()){
            errorField.innerText = input.validationMessage
            errors++
        }
        else {
            errorField.innerText = ''
        }
    })
    return errors === 0
}

const setToLocalStorage = (formData) => {
    const dataArray = JSON.parse(localStorage.getItem("data")) || [];
    dataArray.push(formData)
    localStorage.setItem('data', JSON.stringify(dataArray))

    handleClear()
    alert('Successfully saved to local storage')
}

const handleSubmit = (event) => {
    event.preventDefault()
    const validated = validateForm(event)

    if (!validated) {
        return
    }

    const form = new FormData(event.target)
    const formObject = Object.fromEntries(form)
    const formData = { id:  Math.random() * 10000, ...formObject}
    setToLocalStorage(formData)
}

const handleClear = () => {
    const spans = document.getElementsByTagName('span')
    const spansArray = [...spans]
    spansArray.forEach(span => span.innerText = '')
    document.getElementById('form').reset()
}

const handleRemove = (element) => {
    const row = element.parentNode.parentNode
    const id = row.getAttribute('id')
    const dataArray = JSON.parse(localStorage.getItem("data"))
    const filteredData = dataArray.filter(data => data.id !== Number(id))
    localStorage.setItem('data', JSON.stringify(filteredData))

    alert('Successfully removed')
}

const onLoadView = () => {
    const dataArray = localStorage.getItem('data')

    if (!dataArray) {
        alert('No data found')
        return
    }

    const parsedData = JSON.parse(dataArray)

    parsedData.forEach(data => {

        const row = document.createElement('tr')
        row.setAttribute('id', data.id)

        const arrivalDate = document.createElement('td')
        const nights = document.createElement('td')
        const adults = document.createElement('td')
        const children = document.createElement('td')
        const roomType = document.createElement('td')
        const bedType = document.createElement('td')
        const smoking = document.createElement('td')
        const name = document.createElement('td')
        const email = document.createElement('td')
        const phone = document.createElement('td')
        const remove = document.createElement('td')

        arrivalDate.innerText = data.arrival_date
        nights.innerText = data.nights
        adults.innerText = data.adults
        children.innerText = data.children
        roomType.innerText = data.roomType
        bedType.innerText = data.bedType
        name.innerText = data.name
        email.innerText = data.email
        phone.innerText = data.phone
        if (data.smoking === 'on') {
            smoking.innerHTML =  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cigarette"><path d="M18 12H2v4h16"/><path d="M22 12v4"/><path d="M7 12v4"/><path d="M18 8c0-2.5-2-2.5-2-5"/><path d="M22 8c0-2.5-2-2.5-2-5"/></svg>'
        }
        else {
            smoking.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cigarette-off"><line x1="2" x2="22" y1="2" y2="22"/><path d="M12 12H2v4h14"/><path d="M22 12v4"/><path d="M18 12h-.5"/><path d="M7 12v4"/><path d="M18 8c0-2.5-2-2.5-2-5"/><path d="M22 8c0-2.5-2-2.5-2-5"/></svg>'
        }
        remove.innerHTML = '<button onclick="handleRemove(this)">Remove</button>'

        row.appendChild(arrivalDate)
        row.appendChild(nights)
        row.appendChild(adults)
        row.appendChild(children)
        row.appendChild(roomType)
        row.appendChild(bedType)
        row.appendChild(smoking)
        row.appendChild(name)
        row.appendChild(email)
        row.appendChild(phone)
        row.appendChild(remove)

        document.getElementById('view_table').appendChild(row)
    })
}