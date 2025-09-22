const form = document.getElementById("feedbackForm");
const input = document.getElementById("feedbackInput");
const feedbackList = document.getElementById("feedbackList");

// 🔹 Carregar feedbacks salvos
window.addEventListener("load", () => {
  const savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  savedFeedbacks.forEach(text => {
    addFeedback(text, false);
  });
});

// 🔹 Evento de envio
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const feedbackText = input.value;

  if (feedbackText.trim() !== "") {
    addFeedback(feedbackText, true);
    input.value = "";
  }
});

// 🔹 Função para adicionar feedback
function addFeedback(text, save) {
  const newFeedback = document.createElement("div");
  newFeedback.classList.add("feedback-item");

  // texto
  const feedbackContent = document.createElement("span");
  feedbackContent.textContent = text;

  // botão excluir
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Excluir";
  deleteBtn.addEventListener("click", () => {
    newFeedback.remove();
    removeFromStorage(text);
  });

  newFeedback.appendChild(feedbackContent);
  newFeedback.appendChild(deleteBtn);

  feedbackList.prepend(newFeedback);

  // se for novo, salvar no localStorage
  if (save) {
    const savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    savedFeedbacks.unshift(text);
    localStorage.setItem("feedbacks", JSON.stringify(savedFeedbacks));
  }
}

// 🔹 Função para remover do localStorage
function removeFromStorage(text) {
  let savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  savedFeedbacks = savedFeedbacks.filter(item => item !== text);
  localStorage.setItem("feedbacks", JSON.stringify(savedFeedbacks));
}