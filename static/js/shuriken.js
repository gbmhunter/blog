
var shuriken;
var count;

function onLoad() {
  // Called when the page is loaded
    getCount()
    shuriken = document.getElementById('shuriken-count');
    shuriken.onclick = onclick;
}

const baseUrl = 'https://m5rhluaw6e.execute-api.us-east-1.amazonaws.com/dev/'
const apiPrefix = 'plus-ones/'

function hello() {
  // This is the test end-point of the API
  const xhr = new XMLHttpRequest();
  const addOnePrefix = 'hello'
  xhr.open("GET", baseUrl + apiPrefix + addOnePrefix, true);
  xhr.send();
  xhr.onreadystatechange=(e)=>{
    console.log(xhr.responseText)
  }
}

function getCount() {
  const xhr = new XMLHttpRequest();
  const addOnePrefix = 'get?url=' + window.location.href
  url = baseUrl + apiPrefix + addOnePrefix
  xhr.open("GET", url, true);
  console.log('Calling get with URL = ' + url)
  xhr.send();
  xhr.onreadystatechange = (e) => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      console.log('respone text = ' + xhr.responseText)
      var data = JSON.parse(xhr.responseText)
      console.log('data =')
      console.log(data.count)

      count = data.count
      updateShuriken(data.count)
    }
  }
}

function add() {
  const xhr = new XMLHttpRequest();
  const addOnePrefix = 'add'
  xhr.open("POST", baseUrl + apiPrefix + addOnePrefix, true);
  // Http.setRequestHeader('Content-Type', 'text/xml');
  console.log('Adding one...')
  xhr.send(JSON.stringify({ "url": window.location.href }));
  xhr.onreadystatechange=(e)=>{
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      // Don't actually update the count from the return value, as it gives noticeable lag. Instead,
      // the count is updated as soon as the shuriken is clicked
      // console.log(Http.responseText)
      var data = JSON.parse(xhr.responseText)
      // updateShuriken(data.count)
    }
  }
  count += 1
  updateShuriken(count)

  // To retrigger the animation we have to remove the HTML element from the DOM,
  // and add it back in again.
  const shurikenImage = document.getElementById('shuriken-image')
  var newShurikenImage = shurikenImage.cloneNode(true);
  shurikenImage.parentNode.replaceChild(newShurikenImage, shurikenImage);
  document.getElementById('shuriken-image').classList.add('animate');
}

function updateShuriken(count) {
  shuriken.innerHTML = '<div>' + count + '</div>';
}

window.onload = onLoad;