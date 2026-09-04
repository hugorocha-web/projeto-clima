let btn = document.querySelector('button')
async function pegarCord() {
    try{
        let infosCid = document.querySelector('input').value.toLocaleLowerCase().trim()
        let apichamada = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${infosCid},BR&limit=5&appid=ef17f7ce5ce0b6fb1684d90f66417048`)
        console.log(apichamada)
        if(!apichamada.ok){
            throw new Error('NÃO ACHEI A CIDADE')
        }
        let dados = await apichamada.json()
        console.log(dados)
        let latitude = dados[0].lat
        let longitude = dados[0].lon
        return {
            latitude,
            longitude
        }
    }
    catch(error){
        console.log(error)
    }
}
btn.addEventListener('click', async () => {

    let coordenadas = await pegarCord()

    let latitude = coordenadas.latitude
    let longitude = coordenadas.longitude
    console.log('aqui')
    
    try{
        let apicidade = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ef17f7ce5ce0b6fb1684d90f66417048&lang=pt_br`)
        if(!apicidade.ok){
            throw new Error('não achamos a cidade ou não conseguimos resposta do servidor')
        }
        document.querySelector('#infos').style.display ='block'
        let dados = await apicidade.json()
        console.log(dados)
        let cidade = document.querySelector('#cidade')
        cidade.style.display = 'block'
        cidade.textContent = dados.name
        let graus = dados.main.temp -273.15
        console.log(graus)
        let situ = dados.weather[0].description
        let situacao = document.querySelector('#situação')
        situacao.style.display = 'block'
        console.log(situ)
        let infgraus = document.querySelector('#graus')
        infgraus.style.display = 'block'
        infgraus.textContent = Math.round(graus)+'°'
        let icone = dados.weather[0].icon
        let img = document.querySelector('img')
        img.src = `https://openweathermap.org/img/wn/${icone}@2x.png`
        img.style.display='block'
        situacao.textContent = situ
    }
    catch(error){
        console.log(error)
    }


})