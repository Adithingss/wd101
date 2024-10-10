// Function to render the data in the table
function renderTable() {
    const tableBody = document.querySelector('#dataTable');
    tableBody.innerHTML = '';  // Clear previous content

    // Get data from local storage
    const entries = JSON.parse(localStorage.getItem('formData')) || [];

    // Populate table with data
    entries.forEach(entry => {
        const row = `<tr>
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.termsAccepted ? 'Yes' : 'No'}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Handle form validation
function validateForm() {
    let isValid = true;

    // Get form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;

    // Name validation
    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    // Email validation
    if (!email) {
        document.getElementById('emailError').style.display = 'block';
        document.getElementById('emailFormatError').style.display = 'none';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
        if (!emailRegex.test(email)) {
            document.getElementById('emailFormatError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('emailFormatError').style.display = 'none';
        }
    }

    // Password validation
    if (!password) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    // Date of birth validation
    if (!dob) {
        document.getElementById('dobError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('dobError').style.display = 'none';

        // Calculate age from the date of birth
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        // Age validation
        if (age < 18 || age > 55) {
            alert('You must be between 18 and 55 years old.');
            isValid = false;
        }
    }

    return isValid;
}

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Perform validation
    if (validateForm()) {
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Get existing entries from local storage or initialize an empty array
        const entries = JSON.parse(localStorage.getItem('formData')) || [];

        // Add new entry
        const newEntry = { name, email, password, dob, termsAccepted };
        entries.push(newEntry);

        // Store updated entries in local storage
        localStorage.setItem('formData', JSON.stringify(entries));

        // Render the table with updated data
        renderTable();

        // Clear form fields
        document.getElementById('registrationForm').reset();
    }
});

// Load existing entries on page load
document.addEventListener('DOMContentLoaded', renderTable);
