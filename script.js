let now = new Date();
let day = ["Domingo", 'Segunda-Feira', "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado"];
let mes = ["Janeiro", "Fevereiro", "Março","Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let dayAt = day[now.getDay()];
let mesAt = mes[now.getMonth()];
let dayDomes = now.getDate();

document.querySelector(".busca").addEventListener('submit', async (event) => {
    event.preventDefault();

    let imput = document.querySelector('#searchInput').value;

    if (imput !== "") {
        clearInfo();
        showWarning('Carregando...');

        //let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(imput)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(imput)}&appid=59b3ebf814df63076bc1705b9806a8db&units=metric&lang=pt_br`;
        // encodeURI == é usando para passar uma string para uma url

        let resuts = await fetch(url);
        let json = await resuts.json();

        console.log(url);

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                party: json.weather[0].description,
                sens: json.main.feels_like,
                min: json.main.temp_min,
                max: json.main.temp_max,
                hum: json.main.humidity
            });
        } else {
            clearInfo();
            showWarning('Não encontramos essa localização');
        }
    } else {
        clearInfo();
    }
});

function clearInfo() {
    showWarning('');
    document.querySelector(".resultado").style.display = "none";
}

function showInfo(json) {
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${Math.round(json.temp)} <sup>ºC<sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h<span>`;
    document.querySelector('.dvl img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector(".sensasao-termica").innerHTML = `Sensação tér ${Math.round(json.sens)}º`;
    document.querySelector("#mim").innerHTML = `Min ${Math.round(json.min)}º`;
    document.querySelector("#max").innerHTML = `Max ${Math.round(json.max)}º`;
    document.querySelector(".hu").innerHTML = `${Math.round(json.hum)}%`;
    document.querySelector(".month").innerHTML =`${dayDomes} de ${mesAt}`;
    document.querySelector('.pc').innerHTML = `${json.party}`;
    document.querySelector('.d').innerHTML = dayAt;
    document.querySelector(".resultado").style.display = "block";
};

function showWarning(aviso) {
    document.querySelector('.aviso').innerHTML = aviso;
}