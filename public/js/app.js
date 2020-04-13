//colleghiamo il form con il recupero dei dati dal app.get('weather'..)
const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault() //"e" è il nostro evento. Il metodo preventDefault evita che si comporti in maniera default, ovvero evita che si ricarichi la pagina appena cliccato il bottone
    
    const location=search.value //value estrae il valore della costante

    messageOne.textContent=''
    messageTwo.textContent='Loading...'

    //Fetch è l'analogo di request per il back-end
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageTwo.textContent='Errore: '+data.error
        } else {            
            messageOne.textContent='Location: '+data.location
            messageTwo.textContent='Forecast: '+data.forecast
        }
    })
})
})