const mapper = {
  id: 123456,
  username: "Paradoxal", 
  avatar_url: "https://a.ppy.sh/124493",
  country_flag_url: "https://osu.ppy.sh/images/flags/US.png",
  country_name: "United States", 
  rankedMaps: 35,
  lovedMaps: 0,
  GdMaps: 0, 
  totalMaps: 106,
};

const reviews = [
  { rating: 5, comment: "Very professional and fast!" },
  { rating: 4, comment: "Good mapping skills, communication ok." },
];

const renderMapper = () => {
  const div = document.getElementById("mappers");
  div.innerHTML = `
    <div class="profile-main-card">
      <img class="profile-avatar-large" src="${mapper.avatar_url}" alt="Mapper Avatar" />
      <div class="mapper-header-info">
        <div class="mapper-name-large">${mapper.username}</div>
        <div class="country-info">
          <img class="country-flag-large" src="${mapper.country_flag_url}" alt="Country Flag" />
          <span>${mapper.country_name}</span>
        </div>
        </div>

      <div class="mapper-stats-grid">
        <div class="stat-item">
          <div class="stat-value">${mapper.rankedMaps}</div>
          <div class="stat-label">Ranked maps</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${mapper.lovedMaps}</div>
          <div class="stat-label">Loved maps</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${mapper.GdMaps}</div>
          <div class="stat-label">Ranked GD Maps</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${mapper.totalMaps}</div>
          <div class="stat-label">Total maps</div>
        </div>
      </div>
    </div>
  `;
};

const renderReviews = () => {
  const div = document.getElementById("reviews");
  div.innerHTML = reviews.map(r => `
    <div class="card">
      <div class="review-content">
        <div class="rating">${"★".repeat(r.rating)}</div>
        <div>${r.comment}</div>
      </div>
    </div>
  `).join("");
};

let selectedRating = 0;

const renderStars = () => {
  const div = document.getElementById("stars");
  div.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const span = document.createElement("span");
    span.className = "star" + (i <= selectedRating ? " filled" : "");
    span.textContent = "★";
    span.onclick = () => {
      selectedRating = i;
      renderStars();
    };
    div.appendChild(span);
  }
};

const submitReview = () => {
  const comment = document.getElementById("comment").value;
  if (selectedRating === 0) return alert("Please select a rating");
  reviews.push({ rating: selectedRating, comment });
  document.getElementById("comment").value = "";
  selectedRating = 0;
  renderReviews();
  renderStars();
};

renderMapper();
renderReviews();
renderStars();