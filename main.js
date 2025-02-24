const wartosci = document.querySelector('#wartosci');
const elt = document.getElementById('calculator');
const calculator = Desmos.GraphingCalculator(elt, {
    expressions: false,
    settingsMenu: false
});

elt.style.display = 'none'


function values() {
    const a = parseFloat(document.querySelector('#a').value);
    let b = parseFloat(document.querySelector('#b').value);
    let c = parseFloat(document.querySelector('#c').value);

    elt.style.display = 'none'

    if (a === 0 || isNaN(a)) {
        wartosci.innerHTML = '<p><b>a musi być podane i różne od 0</b></p>'

    }
    else {
        if (isNaN(b)) {
            b = 0;
        }
        if (isNaN(c)) {
            c = 0;
        }
        calculations(a, b, c)
    }

}

function calculations(a, b, c) {
    elt.style.display = 'block'
    const delta = b * b - (4 * a * c);
    const p = -b / (2 * a);
    const q = -delta / (4 * a);

    let pIloczynowa
    let x, x1, x2;

    if (delta > 0) {
        x1 = (-b - Math.sqrt(delta)) / (2 * a);
        x2 = (-b + Math.sqrt(delta)) / (2 * a);
        x = `
            Podana funkcja ma 2 miejsca zerowe <br>x<sub>1</sub> = ${x1.toFixed(3)}<br>x<sub>2</sub> = ${x2.toFixed(3)}
            `;
        pIloczynowa = `&#10765;(x) = ${a}(x ${x1 < 0 ? `+ ${Math.abs(x1).toFixed(3)}` : `- ${x1.toFixed(3)}`})(x ${x2 < 0 ? `+ ${Math.abs(x2).toFixed(3)}` : `- ${x2.toFixed(3)}`})</p>`
    }
    else if (delta === 0) {
        x1 = (-b) / (2 * a).toFixed(2);
        x = `Podana funkcja ma 1 miejsca zerowe.<br>x<sub>1</sub> = ${x1.toFixed(2)}`
        pIloczynowa = `&#10765;(x) = ${a}(x ${x1 < 0 ? `+ ${Math.abs(x1).toFixed(3)}` : `- ${x1.toFixed(3)}`})<sup>2</sup></p>`
    }
    else {
        x = `Podana funkcja nie ma miejsc zerowych.`
        pIloczynowa = 'Brak'
    }

    wartosci.innerHTML = `
    <p>&#10765;(x) = ${a}x<sup>2</sup> ${b < 0 ? `- ${Math.abs(b)}` : `+ ${b}`}x ${c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`}</p>
    <p>&Delta; = ${delta.toFixed(2)}</p>
    <p>${x}</p>
    <p>Wierzchołek paraboli to W=(${p.toFixed(3)}, ${q.toFixed(3)})</p>
    <p>Postacie funkcji:</p>
    <p>Postać kanoniczna: <br>
    &#10765;(x) = ${a}(x ${p < 0 ? `+ ${Math.abs(p).toFixed(3)}` : `- ${p.toFixed(3)}`})<sup>2</sup> ${q < 0 ? `- ${Math.abs(q.toFixed(3))}` : `+ ${q.toFixed(3)}`}</p>
    <p>Postać Iloczynowa: <br>${pIloczynowa}</p>`
    draw(a, b, c, p, q)
}


function draw(a, b, c, p, q) {
    let f = `y = ${a}x^2 + ${b}x + ${c}`;
    let zoom = 5
    calculator.setMathBounds({
        left: p - zoom,
        right: p + zoom,
        bottom: q - zoom,
        top: q + zoom
    });

    calculator.setExpression({
        id: 'parabola',
        latex: f,
        color: "#007ACC"
    });

}




document.querySelector('#oblicz')
    .addEventListener('click', values)

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        values()
    }
})