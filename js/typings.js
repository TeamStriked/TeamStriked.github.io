var welcome = new Typed('.typing', {
    strings: ["Welcome devs and gamers!", "Welcome to a new gaming experience!", "Welcome to Striked!"],
    typeSpeed: 40,
    smartBackspace: true,
    backDelay: 1400,
    backSpeed: 40
});


var stefan = new Typed('.stefan', {
    strings: ["Writing a Vulkan port for NodeJS...", "Creating some 3d primtives for our overlay...", "Rendering font vertices for our graphics API...", "Building the electron launcher..."],
    typeSpeed: 40,
    smartBackspace: true,
    backDelay: 4000,
    backSpeed: 40,
    startDelay: 0,
    loop: true,
});


var tristan = new Typed('.tristan', {
    strings: ["Creating next tasks in GitLab...", "Writing some native code...", "Compiling the SDK with gcc...", "Creating an Unreal wrapper...", "Creating an Unity wrapper..."],
    typeSpeed: 40,
    startDelay: 1200,
    smartBackspace: true,
    backDelay: 4000,
    backSpeed: 40,
    loop: true,
});


var kevin = new Typed('.kevin', {
    strings: ["Tryin' to find su some money...", "Creating presentations and pitches...", "Callcenter agent with purpose...", "Let Excel burn..."],
    typeSpeed: 40,
    smartBackspace: true,
    backDelay: 4000,
    startDelay: 2000,

    backSpeed: 40,
    loop: true,
});



let timer = null;

function animateValue(id, start, end, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));

    console.log(stepTime);
    var obj = document.getElementById(id);
    clearInterval(timer);
    timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current + ".000 EUR";
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

let moneyVisible = false;

document.addEventListener('scroll', function(e) {

    var money = document.getElementById('raised');
    var header = document.getElementById('header-nav');
    let value = Math.max(window.innerHeight - window.scrollY, 0);

    if (checkVisible(money)) {
        if (moneyVisible == false) {
            animateValue("money", 0, 130, 2500);
            moneyVisible = true;
        }
    } else {
        moneyVisible = false;
    }

    if (window.scrollY > header.offsetHeight) {
        if (!header.classList.contains("active"))
            header.classList.add("active");
    } else {
        if (header.classList.contains("active"))
            header.classList.remove("active");
    }


});

var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    status.innerHTML = "Thanks for your submission!";
    form.reset()
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)
