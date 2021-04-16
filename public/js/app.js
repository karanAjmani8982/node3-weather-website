console.log('Client side JavaScript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input') //element name
const messageOne = document.querySelector('#message-1') //id name
const messageTwo = document.querySelector('#message-2') //id name


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    // if(location.length > 0){
        const url = 'http://localhost:3000/weather?address=' + location 
        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                    console.log(data.error)
                } else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                    // console.log(data)
                }
            })
        })
    // } else {
    //     console.log("Enter Location!")
    // }

    // console.log(location)
})