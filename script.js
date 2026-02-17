const chatData = {
  design: {
    title: "Design Team",
    status: "6 участников • online",
    messages: [
      { text: "Доброе утро! Финальный макет уже в Figma.", type: "incoming" },
      { text: "Отлично, добавлю анимацию для карточек.", type: "outgoing" },
      { text: "Готовы к демо в 16:00 🚀", type: "incoming" }
    ]
  },
  product: {
    title: "Product",
    status: "12 участников • last seen recently",
    messages: [
      { text: "Обновили roadmap на квартал.", type: "incoming" },
      { text: "Нужно приоритизировать mobile onboarding.", type: "incoming" },
      { text: "Сделаю оценку сегодня к вечеру.", type: "outgoing" }
    ]
  },
  family: {
    title: "Family",
    status: "4 участника • online",
    messages: [
      { text: "Не забудь созвон в субботу ❤️", type: "incoming" },
      { text: "Буду, в 19:00 подходит?", type: "outgoing" }
    ]
  }
};

const chatTitle = document.getElementById("chatTitle");
const chatStatus = document.getElementById("chatStatus");
const messagesContainer = document.getElementById("messages");
const composer = document.getElementById("composer");
const messageInput = document.getElementById("messageInput");
let currentChat = "design";

function renderMessages(chatKey) {
  const chat = chatData[chatKey];
  chatTitle.textContent = chat.title;
  chatStatus.textContent = chat.status;

  messagesContainer.innerHTML = "";

  chat.messages.forEach((message) => {
    const bubble = document.createElement("div");
    bubble.className = `bubble bubble--${message.type}`;
    bubble.textContent = message.text;
    messagesContainer.appendChild(bubble);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

document.querySelectorAll(".chat-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelector(".chat-item--active")
      ?.classList.remove("chat-item--active");
    item.classList.add("chat-item--active");

    currentChat = item.dataset.chat;
    renderMessages(currentChat);
  });
});

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();

  if (!text) {
    return;
  }

  chatData[currentChat].messages.push({ text, type: "outgoing" });
  messageInput.value = "";
  renderMessages(currentChat);
});

renderMessages(currentChat);
