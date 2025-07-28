document.addEventListener("DOMContentLoaded", function () {
    // ✅ Progress Bar Animation with Scroll (Fixed Reset)
    const progressBars = document.querySelectorAll(".progress");

    const animateProgressBars = (entries) => {
        entries.forEach((entry) => {
            const bar = entry.target;
            const width = bar.getAttribute("data-width");

            if (entry.isIntersecting) {
                bar.style.width = width; // Animate when in view

                let percentageText = bar.previousElementSibling;
                if (percentageText && percentageText.classList.contains("progress-text")) {
                    percentageText.textContent = width;
                }
            } else {
                bar.style.width = "0"; // Reset when out of view
            }
        });
    };

    const progressObserver = new IntersectionObserver(animateProgressBars, { threshold: 0.5 });
    progressBars.forEach((bar) => progressObserver.observe(bar));

    // ✅ Fade-in Gallery on Scroll
    const galleryContainer = document.querySelector(".gallery-container");
    if (galleryContainer) {
        function revealGallery(entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    galleryContainer.classList.add("visible");
                    observer.unobserve(galleryContainer);
                }
            });
        }
        const galleryObserver = new IntersectionObserver(revealGallery, { threshold: 0.3 });
        galleryObserver.observe(galleryContainer);
    }

    // ✅ Smooth Scroll for Navigation Links with Debounce
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute("href"));

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        });
    });

    // ✅ Highlight Navbar Buttons Based on Scroll Position
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-btn");
    
        const observerOptions = {
            root: null,
            threshold: 0.8, // 80% of the section must be visible
        };
    
        function handleIntersect(entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute("id");
    
                    navLinks.forEach((link) => link.classList.remove("active"));
    
                    let activeLink = document.querySelector(`.nav-btn[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add("active");
                }
            });
        }
    
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
        sections.forEach((section) => observer.observe(section));
    });

// Stars Effect
document.addEventListener("DOMContentLoaded", function() {
    const starContainer = document.createElement("div");
    starContainer.classList.add("stars-container");
    document.body.appendChild(starContainer);

    const numStars = 100; // Number of stars

    for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.classList.add("star");

        let x = Math.random() * window.innerWidth; // Random X position
        let y = Math.random() * window.innerHeight; // Random Y position
        let size = Math.random() * 3 + 1; // Random size between 1px to 4px
        let duration = Math.random() * 3 + 2; // Random animation duration

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        starContainer.appendChild(star);
    }
});


// Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple validation
    if (!name || !email || !message) {
        document.getElementById("form-status").textContent = "All fields are required.";
        return;
    }

    // Get current date and time in ISO format
    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" });

    const formData = { name, email, message, timestamp };

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbyhL6wroOwVWdPhSha8TSAy_SFTPUlaqtdErRQH0ChvNgRYtEE5wpxbFL5cbqwNBa80/exec", {
            method: "POST",
            mode: "no-cors", // Change to "no-cors" to prevent CORS issues
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", // Change JSON to form-urlencoded
            },
            body: new URLSearchParams(formData).toString(),
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById("form-status").textContent = "Message sent successfully!";
            document.getElementById("form-status").style.color = "light-green";
            document.getElementById("contact-form").reset();
        } else {
            document.getElementById("form-status").textContent = "Error: " + result.error;
        }
    } catch (error) {
        document.getElementById("form-status").textContent = "Network error. Try again later.";
        document.getElementById("form-status").style.color = "light-red";
    }
});

//loader
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let submitBtn = document.getElementById("submit-btn");
    let loader = document.getElementById("loader");
    let formStatus = document.getElementById("form-status");

    // Disable button & show loader
    submitBtn.disabled = true;
    loader.style.display = "inline-block";
    formStatus.innerText = "Sending...";

    // Simulating form submission (Replace with actual API request)
    setTimeout(() => {
        // Hide loader & enable button after submission
        loader.style.display = "none";
        submitBtn.disabled = false;
        formStatus.innerText = "Message sent successfully!";
    }, 2000); // Replace with actual form submission logic
});

//Profile View Counter
let count = localStorage.getItem("profileViews");

    if (!count) {
        count = 1; // First visit
    } else {
        count = parseInt(count) + 1; // Increment count
    }

    localStorage.setItem("profileViews", count);
    document.getElementById("view-count").textContent = count;
