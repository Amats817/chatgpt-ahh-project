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
  {
    rating: 5,
    comment: "Very professional and fast!",
    reviewerName: "ReviewerOne",
    reviewerAvatar: "https://a.ppy.sh/8675309"
  },
  {
    rating: 4,
    comment: "Good mapping skills, communication ok.",
    reviewerName: "ReviewerTwo",
    reviewerAvatar: "https://a.ppy.sh/4452992"
  },
  {
    rating: 3,
    comment: "Solid work, but took a bit long.",
    reviewerName: "ReviewerThree",
    reviewerAvatar: "https://a.ppy.sh/11223344"
  }
];

// New function to calculate average rating
const calculateAverageRating = () => {
  if (reviews.length === 0) {
    return 0;
  }
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1); // ToFixed to one decimal place
};

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
          <div class="stat-label">Ranked Maps</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${mapper.lovedMaps}</div>
          <div class="stat-label">Loved Maps</div>
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
  // After rendering the mapper, update the average rating section
  updateAverageRatingDisplay();
};

const renderReviews = () => {
  const div = document.getElementById("reviews");
  div.innerHTML = reviews.map(r => `
    <div class="card review-card">
      <div class="reviewer-info">
        <img class="reviewer-avatar" src="${r.reviewerAvatar}" alt="${r.reviewerName}'s Avatar" />
        <span class="reviewer-name">${r.reviewerName}</span>
      </div>
      <div class="review-content">
        <div class="rating">${"★".repeat(r.rating)}</div>
        <div>${r.comment}</div>
      </div>
    </div>
  `).join("");
};

// New function to update the average rating display
const updateAverageRatingDisplay = () => {
  const averageRating = parseFloat(calculateAverageRating());
  const averageRatingValueSpan = document.getElementById("average-rating-value");
  const averageRatingStarsDiv = document.getElementById("average-rating-stars");

  if (averageRatingValueSpan) {
    averageRatingValueSpan.textContent = averageRating.toFixed(1);
  }

  if (averageRatingStarsDiv) {
    let starsHtml = '';
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<span class="star filled">★</span>';
    }
    if (hasHalfStar) {
      starsHtml += '<span class="star half-filled">★</span>'; // Use a half-filled star class if you want
    }
    for (let i = 0; i < (5 - fullStars - (hasHalfStar ? 1 : 0)); i++) {
      starsHtml += '<span class="star">★</span>';
    }
    averageRatingStarsDiv.innerHTML = starsHtml;
  }
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
  const comment = document.getElementById("review-comment").value;
  if (selectedRating === 0) {
    alert("Please select a rating!");
    return;
  }
  if (!comment.trim()) {
    alert("Please enter a comment!");
    return;
  }

  // For demonstration, adding a placeholder reviewer. In a real app, this would come from user data.
  reviews.push({
    rating: selectedRating,
    comment: comment,
    reviewerName: "NewReviewer",
    reviewerAvatar: "https://a.ppy.sh/randomuser"
  });
  renderReviews();
  updateAverageRatingDisplay(); // Update average rating after new review
  document.getElementById("review-comment").value = "";
  selectedRating = 0;
  renderStars();
};

// Initial renders
document.addEventListener("DOMContentLoaded", () => {
  renderMapper();
  renderReviews();
  renderStars();

  // Attach event listener for the submit button
  document.getElementById("submit-review-button").addEventListener("click", submitReview);

});