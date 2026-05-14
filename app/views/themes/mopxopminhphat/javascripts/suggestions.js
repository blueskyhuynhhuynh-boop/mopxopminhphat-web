document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector(".button_search.submit");
  const historyList = document.getElementById("historyList");

  // Hiển thị danh sách lịch sử tìm kiếm
  function renderHistory() {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    historyList.innerHTML = "";

    if (history.length === 0) {
      historyList.innerHTML = "<p>Không có lịch sử tìm kiếm.</p>";
      return;
    }

    history.forEach((keyword) => {
      const item = document.createElement("div");
      item.className = "item-history";
      item.textContent = keyword;
      item.style.cursor = "pointer";

      item.addEventListener("click", function () {
        searchInput.value = keyword;
        searchButton.click(); // Gửi lại tìm kiếm
      });

      historyList.appendChild(item);
    });
  }

  // Lưu từ khóa tìm kiếm
  function saveKeyword(keyword) {
    let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

    // Xóa nếu từ khóa đã tồn tại
    history = history.filter((item) => item !== keyword);

    // Thêm từ khóa mới lên đầu
    history.unshift(keyword);

    // Giới hạn 3 từ
    if (history.length > 3) {
      history = history.slice(0, 3);
    }

    // Lưu lại
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }

  // Sự kiện khi nhấn nút tìm kiếm
  searchButton.addEventListener("click", function () {
    const keyword = searchInput.value.trim();
    if (!keyword) return;

    saveKeyword(keyword);
    renderHistory();
  });

  // Hiển thị lịch sử khi trang load
  renderHistory();
});
