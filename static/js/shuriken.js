
var shurikenCountEl;
var shurikenImageEl;
var count;

function onLoad() {
  // Called when the page is loaded
  shurikenCountEl = document.getElementById('shuriken-count');
  shurikenImageEl = document.getElementById('shuriken-image')
  getCount()
}

const baseUrl = 'https://qyw2xwnf7c.execute-api.us-east-1.amazonaws.com/dev/'
const apiPrefix = 'shuriken/'

function hello() {
  // This is the test end-point of the API
  const xhr = new XMLHttpRequest();
  xhr.open("GET", baseUrl + apiPrefix + 'hello', true);
  xhr.send();
  xhr.onreadystatechange=(e)=>{
    console.log(xhr.responseText)
  }
}

function getCount() {
  const xhr = new XMLHttpRequest();

  // Remove all parts of the URL after the last slash (this includes any ? or #xxx for
  // anchors), otherwise they will count as different shuriken counts in the database
  lastSlash = window.location.href.lastIndexOf('/')
  var href = window.location.href.substring(0, lastSlash + 1)
  const prefix = 'get?url=' + href
  url = baseUrl + apiPrefix + prefix
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = (e) => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText)
      count = data.count
      updateShuriken(data.count)
    }
  }
}

function add() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", baseUrl + apiPrefix + 'add', true);
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

  // To retrigger the animation we have to
  // remove the animate class and add it back at a later
  // time (1 ms in the future is good enough) 
  shurikenImageEl.classList.remove("animate");
  setTimeout(function(){
       shurikenImageEl.classList.add("animate");
    }, 1)
}

function updateShuriken(count) {
  shurikenCountEl.innerHTML = '<div>' + count + '</div>';
}

window.onload = onLoad;