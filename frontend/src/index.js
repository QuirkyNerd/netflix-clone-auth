// Accordion functionality for FAQ
let accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
    accordian[i].addEventListener("click", function () {
        // Toggle icons
        if (this.childNodes[1].classList.contains("fa-plus")) {
            this.childNodes[1].classList.remove("fa-plus");
            this.childNodes[1].classList.add("fa-times");
        } else {
            this.childNodes[1].classList.remove("fa-times");
            this.childNodes[1].classList.add("fa-plus");
        }

        // Toggle content
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

// Signup form handling
document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send data to the backend
    try {
        const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Notify the user
            // Optionally, redirect or clear the form
            document.getElementById('signup-form').reset(); // Reset form fields
        } else {
            const errorData = await response.json();
            alert(errorData.message); // Handle errors
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error with the signup. Please try again.');
    }
});
