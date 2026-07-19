// Đổi bóng header khi cuộn trang
const header = document.getElementById("mainHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
});

// Mega menu: click để mở/đóng trên mobile (thay vì chỉ hover như desktop)
const megaItem = document.getElementById("megaItem");
const megaToggle = document.getElementById("megaToggle");

megaToggle.addEventListener("click", (e) => {
  if (window.innerWidth < 992) {
    e.preventDefault();
    megaItem.classList.toggle("open");
  }
});

// Đóng mega menu mobile khi thu gọn collapse
document
  .getElementById("mainNav")
  .addEventListener("hidden.bs.collapse", () => {
    megaItem.classList.remove("open");
  });
