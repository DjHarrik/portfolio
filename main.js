//I'm a web designer with extensive experience in creating dynamic and responsive websites. My expertise includes front-end design, UI/UX design, and more.-->


var typed = new Typed(".text", {
    strings: [
      "Full Stack Developer ",
      "Web Developer 🚀",
      "Creative Designer 🎨",
      "UI/UX Innovator 💡"
    ],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1000,
    loop: true,
    cursorChar: "|",
    smartBackspace: true
  });

  var typed = new Typed(".movingText", {
    strings: [
      "Full Stack Developer ",
      "Web Developer 🚀",
      "Creative Designer 🎨",
      "UI/UX Innovator 💡"
    ],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1000,
    loop: true,
    cursorChar: "|",
    smartBackspace: true
  });
  

document.querySelectorAll('.progress-bar').forEach((bar) => {
    const percentage = bar.getAttribute('data-percentage');
  
    const startLoading = () => {
      let count = 0;
  
      // Reset bar and percentage for restart
      bar.style.setProperty('--percentage', `0%`);
      bar.parentElement.querySelector('.percentage').textContent = `0%`;
  
      // Interval to incrementally fill the bar
      const interval = setInterval(() => {
        if (count >= percentage) {
          clearInterval(interval); // Stop at final percentage
          setTimeout(() => startLoading(), 5000); // Pause for 3 seconds, then restart
        } else {
          count++;
          bar.style.width = `${count}%`; // Update the width dynamically
          bar.parentElement.querySelector('.percentage').textContent = `${count}%`;
        }
      }, 10); // Adjust speed for loading
    };
  
    startLoading(); // Initiate the first loading cycle
  });



  document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const menuLinks = document.querySelectorAll(".menu-item");
  
    // Open sidebar
    menuBtn.addEventListener("click", () => {
      sidebar.style.transform = "translateX(0)";
      overlay.classList.remove("hidden");
    });
  
    // Close sidebar
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
  
    // Close sidebar on link click
    menuLinks.forEach((link) => {
      link.addEventListener("click", closeSidebar);
    });
  
    function closeSidebar() {
      sidebar.style.transform = "translateX(-100%)";
      overlay.classList.add("hidden");
    }
  });

  
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const api_backend_URL=process.env.REACT_APP_BACKEND_URL;
  
    console.log("Form Data to Submit:", data); // Verify payload
  
    try {
      const response = await fetch(`${api_backend_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error("Error response:", error);
        alert(error.error || "Failed to submit the form");
        return;
      }
  
      const result = await response.json();
      alert(result.message || "Message sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form. Please try again later.");
    }
  });
   
  const sections = document.querySelectorAll('.animated-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate'); // This resets the animation
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});
