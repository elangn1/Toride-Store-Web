/**
 * edit-profile.js
 *
 * Handles:
 *  1. Checking login status (redirect to login if not authenticated)
 *  2. Prefilling the email field
 *  3. Saving updated email/password back into localStorage
 *  4. Deleting the user’s account entirely
 */

import USERS from "./users.js";

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // 1) Check if user is logged in
  const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!loginStatus || !currentUser) {
    // Not logged in → send to login page
    window.location.href = "login.html";
    return;
  }

  // 2) Prefill the email field
  const emailInput = document.getElementById("email");
  emailInput.value = currentUser.email || "";

  // 3) Handle "Save Changes"
  const form = document.getElementById("editProfileForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newEmail = emailInput.value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
    }

    // Load stored users (from localStorage) or fallback to default list
    let storedUsers = JSON.parse(localStorage.getItem("USERS"));
    if (!storedUsers) {
      storedUsers = USERS;
    }

    // Find this user in the array
    const idx = storedUsers.findIndex((u) => u.id === currentUser.id);
    if (idx === -1) {
      alert("User not found in database.");
      return;
    }

    // Update fields
    storedUsers[idx].email = newEmail;
    if (newPassword) {
      storedUsers[idx].password = newPassword;
    }

    // Save back to localStorage
    localStorage.setItem("USERS", JSON.stringify(storedUsers));

    // Update currentUser in localStorage
    const updatedUser = { ...storedUsers[idx] };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    alert("Profile updated successfully.");
    // Optionally: You could redirect or just stay here
    window.location.href = "index.html"
  });

  // 4) Handle "Delete Account"
  const deleteBtn = document.getElementById("deleteAccountBtn");
  deleteBtn.addEventListener("click", () => {
    const confirmDelete = confirm(
        "Are you sure you want to delete your account? This cannot be undone."
    
    );
    
    if (!confirmDelete) return;

    // Remove user from storedUsers
    let storedUsers = JSON.parse(localStorage.getItem("USERS"));
    if (!storedUsers) {
      storedUsers = USERS;
    }
    const filtered = storedUsers.filter((u) => u.id !== currentUser.id);
    localStorage.setItem("USERS", JSON.stringify(filtered));

    // Clear login/session data
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    localStorage.removeItem("namaLengkap");

    alert("Your account has been deleted.");
    // Redirect to register (or index)
    window.location.href = "index.html";
  });
});

// Validate passwords match (only if user typed a new one)
