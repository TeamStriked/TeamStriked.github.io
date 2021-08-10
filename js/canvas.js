


var mouseX2 = 0,
    mouseY2 = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,
    SEPARATION = 200,
    AMOUNTX = 10,
    AMOUNTY = 10,
    camera2,
    scene2,
    renderer2;



var SEPARATION = 100,
    AMOUNTX = 100,
    AMOUNTY = 70;

var container;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 85,
    mouseY = -342;
    var colors = [0x158077, 0x3d1580, 0x153c80, 0x807215, 0x801538];
    var frame = 0;


init();
init2();
animate();



function getColor(x) {

    return 'hsla( hue, 80%, 50%,35% )'.replace(
        'hue', x / window.innerWidth * 360 + frame
    );
}

function init2() {

    container = document.createElement('div');
    var element = document.getElementById('gl');

    var home = document.getElementById('home');
    home.style.height = (window.innerHeight - 100) + "px";
    element.appendChild(container);

    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    particles = new Array();

    var PI2 = Math.PI * 2;


    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            var color = colors[Math.floor(Math.random()*colors.length)];

            var material = new THREE.ParticleCanvasMaterial({
                color: color,
                program: function (context) {

                    context.beginPath();
                    context.rect(0, 0, 1.0, 1.0);
                    context.stroke();
                }
            });

            particle = particles[i++] = new THREE.Particle(material);
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
            scene.add(particle);

        }

    }

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);


    //

    window.addEventListener('resize', onWindowResize, false);

}


function init() {

    var container,
        separation = 100,
        amountX = 50,
        amountY = 50,
        particle;

    var gl = document.getElementById('gl2');
    container = document.createElement('div');


    gl.appendChild(container);

    scene2 = new THREE.Scene();

    renderer2 = new THREE.CanvasRenderer({ alpha: true }); // gradient; this can be swapped for WebGLRenderer
    renderer2.setSize(gl.offsetWidth, gl.offsetWidth / 5);
    container.appendChild(renderer2.domElement);

    camera2 = new THREE.PerspectiveCamera(
        75,
        gl.offsetWidth / (gl.offsetWidth / 5),
        1,
        10000
    );
    camera2.position.z = 100;

    // particles
    var PI2 = Math.PI * 2;
    

    var geometry = new THREE.Geometry();

    for (var i = 0; i < 100; i++) {

        var color = colors[Math.floor(Math.random()*colors.length)];

        var material = new THREE.ParticleCanvasMaterial({
            color: color,
            program: function (context) {
                context.beginPath();
                context.arc(0, 0, 0.5, 0, PI2, true);
                context.fill();
            }
        });
        
        particle = new THREE.Particle(material);
        particle.position.x = Math.random() * 2 - 1;
        particle.position.y = Math.random() * 2 - 1;
        particle.position.z = Math.random() * 2 - 1;
        particle.position.normalize();
        particle.position.multiplyScalar(Math.random() * 10 + 450);
        particle.scale.x = particle.scale.y = 10;
        scene2.add(particle);
        geometry.vertices.push(particle.position);
    }

    // lines
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.1 }));
    scene2.add(line);

    // mousey
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);

} // end init();

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    var gl = document.getElementById('gl2');


    camera2.aspect = gl.offsetWidth / (gl.offsetWidth / 5);
    camera2.updateProjectionMatrix();

    renderer2.setSize(gl.offsetWidth, gl.offsetWidth / 5);



    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    var home = document.getElementById('home');
    home.style.height = (window.innerHeight - 100) + "px";


}

function onDocumentMouseMove(event) {

    mouseX2 = event.clientX - windowHalfX;
    mouseY2 = event.clientY - windowHalfY;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart(event) {

    if (event.touches.length > 1) {

        event.preventDefault();

        mouseX2 = event.touches[0].pageX - windowHalfX;
        mouseY2 = event.touches[0].pageY - windowHalfY;

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onDocumentTouchMove(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseX2 = event.touches[0].pageX - windowHalfX;
        mouseY2 = event.touches[0].pageY - windowHalfY;


        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;

    }
}


function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function animate() {


    var gl = document.getElementById('gl');
    var gl2 = document.getElementById('gl2');

    if (checkVisible(gl2))
        render();

    if (checkVisible(gl))
        render2();

    requestAnimationFrame(animate);
    ++frame;

}

function render2() {

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            particle = particles[i++];
            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

        }

    }

    renderer.render(scene, camera);

    count += 0.1;

}

function render() {

    camera2.position.x += (mouseX2 - camera2.position.x) * .05;
    camera2.position.y += (- mouseY2 + 400 - camera2.position.y) * .05;
    camera2.lookAt(scene2.position);

    renderer2.render(scene2, camera2);

}