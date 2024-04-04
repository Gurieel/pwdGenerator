const inputEl = document.querySelector("#password");
const passwordLengthEl = document.querySelector("#password-Length");
const copyButtonEl1 = document.querySelector("#copy-1");
const copyButtonEl2 = document.querySelector("#copy-2");
const renewButtonEl = document.querySelector("#renew");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityIndicatorBarEl = document.querySelector(
  "#security-indicator-bar"
);

// Valor inicial de quantidade de digitos
let passwordLength = 10;

function generatePassword() {
  let chars = "abcdefghjkmnpqrstuvwxyz";

  const upperCaseChars = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const numbersChars = "123456789";
  const symbolsChars = "?!@&*()[]";

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars;
  }
  if (numberCheckEl.checked) {
    chars += numbersChars;
  }
  if (symbolCheckEl.checked) {
    chars += symbolsChars;
  }

  let password = "";
  // se o 'i' for menor que o valor da barra 'passwordLength' ele roda

  for (let i = 0; i < passwordLength; i++) {
    // Floor, tira a virgula, apenas numeros inteiros
    const randomNumber = Math.floor(Math.random() * chars.length);
    // substring, recorte da string de chars
    // Escolha um aleatorio, e recorta o proximo digito
    // Caso o randomNumber trave em 'w', o digito recortado será 'x'
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputEl.value = password;
  calculateQuality();
  calculateFontSize();
}

function calculateQuality() {
  const percent = Math.round(
    (passwordLength / 32) * 50 +
      (upperCaseCheckEl.checked ? 10 : 0) +
      (numberCheckEl.checked ? 20 : 0) +
      (symbolCheckEl.checked ? 25 : 0)
  );

  if (percent <= 100) {
    securityIndicatorBarEl.style.width = `${percent}%`;
  } else {
    securityIndicatorBarEl.style.width = `100%`;
  }

  if (percent > 70) {
    //safe
    securityIndicatorBarEl.classList.remove("critical");
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.add("safe");
  } else if (percent > 50) {
    //warning
    securityIndicatorBarEl.classList.remove("critical");
    securityIndicatorBarEl.classList.add("warning");
    securityIndicatorBarEl.classList.remove("safe");
  } else {
    //critical
    securityIndicatorBarEl.classList.add("critical");
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.remove("safe");
  }

  if (percent >= 100) {
    securityIndicatorBarEl.classList.add("completed");
  } else {
    securityIndicatorBarEl.classList.remove("completed");
  }
}

function calculateFontSize() {
  const inputSunEl = document.querySelector(".password .text input");

  if (passwordLength > 25) {
    inputSunEl.style.fontSize = "1rem";
  } else if (passwordLength > 20) {
    inputSunEl.style.fontSize = "1.5rem";
  } else if (passwordLength > 15) {
    inputSunEl.style.fontSize = "2rem";
  } else if (passwordLength > 10) {
    inputSunEl.style.fontSize = "2.5rem";
  } else {
    inputSunEl.style.fontSize = "3rem";
  }
}

//
// Função para copiar e colar o password com a API do navegador
// clipboard para copiar, whriteText escrever o que será copiado
function copy() {
  navigator.clipboard.writeText(inputEl.value);
}

//
// input, evento de arrastar a barra
passwordLengthEl.addEventListener("input", function () {
  // Define o valor do 'passwordLength' de acordo com a posição da barra
  // de acordo com o evento 'passwordLengthEl'
  passwordLength = passwordLengthEl.value;

  document.querySelector("#password-Length-text").innerHTML = passwordLength;
  // Gera um senha após definir o valor da barra
  generatePassword();
});
upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

//
// Criar evento de ao clicar no botão fazer a função de copiar
copyButtonEl1.addEventListener("click", copy);
copyButtonEl2.addEventListener("click", copy);
renewButtonEl.addEventListener("click", generatePassword);

//
// Gera uma senha inicial
generatePassword();
