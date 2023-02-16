import "./style.css";
import Swal from "sweetalert2";

const buttonEl = document.querySelector("#button");
const inputEl = document.querySelector("#getValue");
const preEl = document.querySelector("#result");

buttonEl.addEventListener("click", async (event) => {
  event.preventDefault();
  const cep = inputEl.value;

  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      preEl.innerText = `CEP: ${data.cep}
      Logradouro: ${data.logradouro}
      Complemento: ${data.complemento},
      Bairro: ${data.bairro},
      Localidade: ${data.localidade},
      UF: ${data.uf},
      IBGE: ${data.ibge},
      DDD: ${data.ddd},
      SIAFI: ${data.siafi}`;

      return data;
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `${error.message}. Por favor, volte mais tarde!`,
        icon: "error",
        confirmButtonText: "Voltar",
      });

      return error.message;
    }
  } else {
    Swal.fire({
      title: "Error!",
      text: "O CEP informado não é válido!",
      icon: "error",
      confirmButtonText: "Voltar",
    });
  }
});
