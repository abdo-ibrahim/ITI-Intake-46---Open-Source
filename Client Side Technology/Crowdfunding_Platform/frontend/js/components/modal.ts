export function initModal(modalId: string, openBtnId: string): void {
  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = modal ? modal.querySelector(".modal-close") : null;

  if (!modal || !openBtn) return;

  openBtn.addEventListener("click", function(): void {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function(): void {
      modal.classList.remove("active");
      document.body.style.overflow = "visible";
    });
  }

  modal.addEventListener("click", function(e: Event): void {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "visible";
    }
  });
}
