
var shuriken;

function onLoad() {

    getOnes()

    shuriken = document.getElementById('shuriken-count');

    shuriken.onclick = onclick;
}

function onclick() {
    console.log('Clicked')
}

const baseUrl = 'https://m5rhluaw6e.execute-api.us-east-1.amazonaws.com/dev/'

function hello() {
  const Http = new XMLHttpRequest();
  const apiPrefix = 'plus-ones/';
  const addOnePrefix = 'hello'
  Http.open("GET", baseUrl + apiPrefix + addOnePrefix, true);
  console.log('Getting +1s...')
  Http.send();
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
  }
}

function getOnes() {
  const Http = new XMLHttpRequest();
  const apiPrefix = 'plus-ones/';
  const addOnePrefix = 'get?url=' + window.location.href
  url = baseUrl + apiPrefix + addOnePrefix
  Http.open("GET", url, true);
  console.log('Calling get with URL = ' + url)
  Http.send();
  Http.onreadystatechange=(e)=>{
    if (Http.readyState == XMLHttpRequest.DONE && Http.status == 200) {
      console.log('respone text = ' + Http.responseText)
      var data = JSON.parse(Http.responseText)
      console.log('data =')
      console.log(data.count)

      updateShuriken(data.count)
    }
  }
}

function add() {
  const Http = new XMLHttpRequest();
  const apiPrefix = 'plus-ones/';
  const addOnePrefix = 'add'
  Http.open("POST", baseUrl + apiPrefix + addOnePrefix, true);
  // Http.setRequestHeader('Content-Type', 'text/xml');
  console.log('Adding one...')
  Http.send(JSON.stringify({ "url": window.location.href }));
  Http.onreadystatechange=(e)=>{
    if (Http.readyState == XMLHttpRequest.DONE && Http.status == 200) {
      console.log(Http.responseText)
      var data = JSON.parse(Http.responseText)
      updateShuriken(data.count)
    }
  }
}

function updateShuriken(count) {
  shuriken.innerHTML = '<div>' + count + '</div>';
}

window.onload = onLoad;