window.onload = function() {

// WRAP EACH CHARACTER IN A SPAN

let elements = document.querySelectorAll('.effect');

elements.forEach((element) => {

    // Grab the inner text of each element
    let text = element.innerText;

    let spanWrapper = '';


    for (let i = 0; i < text.length; i++) {
        if (element[i] !== ' ') {
            spanWrapper += `<span class="effect--span">${text.charAt(i)}</span>`;
        } else {
            // If it's a space, then don't wrap it in a span and add a space as-is
            spanWrapper += ' ';
        }
    }

    element.innerHTML = spanWrapper;



})

const spanElements = document.querySelectorAll('.effect--span');



// COLOR
let originalTextColor = "var(--black)";

function toggleColorMode(isDarkMode) {

    const color = isDarkMode ? "var(--white)" : "var(--black)";
    const sliders = document.querySelectorAll(".slider");
    const links = document.querySelectorAll("a");
    const codeBlocks = document.querySelectorAll("pre");
    const codeTexts = document.querySelectorAll("pre .text--color-grey");
    const buttons = document.querySelectorAll(".button");


    document.body.style.backgroundColor = isDarkMode ? "var(--black)" : "var(--white)";
    document.body.style.color = color;
    originalTextColor = color;

    links.forEach(link => link.style.color = color);
    document.documentElement.style.setProperty("--border", `1.5px solid ${color}`);
    document.documentElement.style.setProperty("--slider-button-color", isDarkMode ? "var(--black)" : "var(--white)");
    document.documentElement.style.setProperty("--link-arrow-color", isDarkMode ? "var(--white)" : "var(--black)");

    sliders.forEach(slider => slider.style.backgroundColor = color);

    spanElements.forEach(spanElement => spanElement.style.color = originalTextColor);

    codeBlocks.forEach((codeBlock) => {
        codeBlock.style.backgroundColor = isDarkMode ? "var(--off-black)" : "var(--light-grey)"
    });

    codeTexts.forEach((codeText) => {
        codeText.style.color = isDarkMode ? "var(--light--grey)" : "var(--dark-grey)"
    });

    // buttons.forEach((button) => {
    //     button.style.backgroundColor = isDarkMode ? "var(--white)" : "var(--black)";
    // })

    console.log(isDarkMode);
    console.log(color)
}

const colorSwitch = document.getElementById("switch--type-color");
colorSwitch.onchange = () => toggleColorMode(colorSwitch.checked);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    colorSwitch.checked = e.matches;
    toggleColorMode(e.matches);
})

// EFFECTS
const colors = ['#FF4500', '#FFA800', '#00E800', '#00D1FF', '#0056FF', '#FF48FF', '#B56CFF'];
const stars = ['❋', '✦', '✺', '✤'];
const colorArray = ['red', 'orange', 'green', 'aqua', 'blue', 'magenta', 'purple'];
let currentColorIndex = -1;
let currentStarIndex = -1;
let originalTexts = [];

function addEffects() {
    spanElements.forEach((spanElement) => {
        // Save the current characters prior to mouseover effects
        originalTexts.push(spanElement.innerText);
        spanElement.addEventListener('mouseover', changeEffects);
    });

    // assign colors to each css variable
    colorArray.forEach((color, index) => {
        document.documentElement.style.setProperty(`--star-${index + 1}`, `var(--${color})`);
    });

}

function removeEffects() {
    spanElements.forEach((spanElement) => {
        spanElement.removeEventListener('mouseover', changeEffects);
    });

    // remove colors to each css variable
    colorArray.forEach((color, index) => {
        document.documentElement.style.setProperty(`--star-${index + 1}`, `var(--link-arrow-color)`);
    });

    // originalTexts = [];
}

function changeEffects() {
    // 'this' refers to spanElement above
    // Convert nodeList to regular array, and grab the index of each
    let index = Array.from(spanElements).indexOf(this);

    currentStarIndex = (currentStarIndex + 1) % stars.length;
    this.innerText = stars[currentStarIndex];

    currentColorIndex = (currentColorIndex + 1) % colors.length;
    this.style.color = colors[currentColorIndex];

    setTimeout(() => {
        this.innerText = originalTexts[index];
        this.style.color = originalTextColor;
    }, 1000);
}

let effectsSwitch = document.getElementById("switch--type-effects");

effectsSwitch.checked ? addEffects() : removeEffects();

effectsSwitch.onchange = () => {
    effectsSwitch.checked ? addEffects() : removeEffects();
};



// STYLE
let stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

function toggleStyles() {

    stylesheets.forEach((stylesheet) => {

        if (!styleSwitch.checked) {
            stylesheet.setAttribute("disabled", "true");
            colorSwitch.setAttribute("disabled", "true");
        } else {
            stylesheet.removeAttribute("disabled");
            colorSwitch.removeAttribute("disabled");

            // spanElements.forEach((spanElement) => {
            //     spanElement.removeAttribute('style');
            // })
        }
    })

}

let styleSwitch = document.getElementById("switch--type-styles")
styleSwitch.onchange = () => toggleStyles();

}