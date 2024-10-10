// Function to validate the form
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    let valid = true;

    // Name validation
    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    // Email validation
    if (!email || !validateEmail(email)) {
        document.getElementById('emailError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Password validation
    if (!password) {
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    // DOB validation
    if (!dob || !validateAge(dob)) {
        document.getElementById('dobError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('dobError').style.display = 'none';
    }

    return valid;
}

// Function to validate email
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Function to validate age (between 18 and 55)
function validateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}

// Function to render the table
function renderTable() {
    const entries = JSON.parse(localStorage.getItem('formData')) || [];
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = ''; // Clear existing table rows

    entries.forEach((entry) => {
        const row = document.createElement('tr');

        Object.keys(entry).forEach((key) => {
            const cell = document.createElement('td');
            cell.textContent = entry[key];
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

// Event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

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
