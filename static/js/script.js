// Этот файл отвечает за две вещи на странице:
// 1) открытие/закрытие модального окна с полным текстом материала;
// 2) фейковую отправку формы подписки (без реального сервера).

// ---------- Модальное окно с материалом ----------

const modalOverlay = document.getElementById("modal-overlay");
const modalIcon = document.getElementById("modal-icon");
const modalTag = document.getElementById("modal-tag");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalClose = document.getElementById("modal-close");

// Кнопка "Открыть материал" есть у каждой карточки.
// По data-index узнаём, какую карточку из cardsData показать.
document.querySelectorAll(".btn-card").forEach((button) => {
    button.addEventListener("click", () => {
        const index = Number(button.dataset.index);
        const card = cardsData[index];

        modalIcon.textContent = card.icon;
        modalTag.textContent = card.tag;
        modalTitle.textContent = card.title;
        modalText.textContent = card.full_text;

        openModal();
    });
});

function openModal() {
    modalOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden"; // не даём странице скроллиться под модалкой
}

function closeModal() {
    modalOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

// Закрытие по клику на затемнённый фон (но не по самому окну)
modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

// Закрытие по клавише Esc
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// ---------- Форма подписки ----------

const subscribeForm = document.getElementById("subscribe-form");
const subscribeMessage = document.getElementById("subscribe-message");

subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault(); // не даём странице перезагружаться

    const email = document.getElementById("subscribe-email").value;
    subscribeMessage.textContent = `Готово! Мы отправили подтверждение на ${email}`;
    subscribeForm.reset();
});
