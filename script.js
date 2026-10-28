/* =================================
   ROLLX HERO JAVASCRIPT
================================= */


/* =================================
   HERO PARALLAX EFFECT
================================= */

const hero = document.querySelector(".hero");
const background = document.querySelector(".hero-bg");


hero.addEventListener("mousemove", function (event) {

    const mouseX = event.clientX / window.innerWidth - 0.5;
    const mouseY = event.clientY / window.innerHeight - 0.5;

    const moveX = mouseX * 12;
    const moveY = mouseY * 12;

    background.style.transform =
        `scale(1.05) translate(${moveX}px, ${moveY}px)`;

});


hero.addEventListener("mouseleave", function () {

    background.style.transform =
        "scale(1.05) translate(0, 0)";

});


/* =================================
   MOBILE MENU
================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("open");

});


/* =================================
   CLOSE MOBILE MENU
   AFTER CLICKING A LINK
================================= */

const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

    });

});


/* =================================
   THE ARENA INTERACTIVITY & EXPERIENCES
================================= */

const expRows = document.querySelectorAll(".exp-row");
const arenaImages = [
    document.getElementById("arenaImg1"), // 01 Smooth floor detail
    document.getElementById("arenaImg2"), // 02 Good vibes neon music
    document.getElementById("arenaImg3"), // 03 Safe space rental hub
    document.getElementById("arenaImg0")  // 04 Come together community arena
];

const capsuleData = [
    { sub: "FLOOR TYPE", val: "High-Traction Polyurethane Maple", sub2: "GLIDE COEF", val2: "Ultra-Low Roll Resistance" },
    { sub: "ATMOSPHERE", val: "Acoustic Tuning & 124 BPM Skater Grooves", sub2: "LIGHTING", val2: "Dynamic Neon Amber & Violet Rhythms" },
    { sub: "SAFETY SPECS", val: "Sanitized Quad Gear & Padded Perimeters", sub2: "STAFF", val2: "Certified On-Rink Floor Marshals" },
    { sub: "COMMUNITY", val: "All Ages & Skill Sets • Open Jam Nights", sub2: "LOCATION", val2: "Lalbandi, Sarlahi, Nepal" }
];

const capsuleItems = document.querySelectorAll(".arena-bottom-capsule .capsule-item");

function setActiveExperience(index) {
    // Update active row
    expRows.forEach((row, i) => {
        if (i === index) {
            row.classList.add("active");
        } else {
            row.classList.remove("active");
        }
    });

    // Update active image with smooth crossfade
    arenaImages.forEach((img, i) => {
        if (img) {
            if (i === index) {
                img.classList.add("active");
            } else {
                img.classList.remove("active");
            }
        }
    });

    // Update bottom capsule info
    if (capsuleItems.length >= 2 && capsuleData[index]) {
        const item1Sub = capsuleItems[0].querySelector(".capsule-sub");
        const item1Val = capsuleItems[0].querySelector(".capsule-val");
        const item2Sub = capsuleItems[1].querySelector(".capsule-sub");
        const item2Val = capsuleItems[1].querySelector(".capsule-val");

        if (item1Sub && item1Val) {
            item1Sub.textContent = capsuleData[index].sub;
            item1Val.textContent = capsuleData[index].val;
        }
        if (item2Sub && item2Val) {
            item2Sub.textContent = capsuleData[index].sub2;
            item2Val.textContent = capsuleData[index].val2;
        }
    }
}

// Bind hover and click events to experience rows
expRows.forEach((row, index) => {
    row.addEventListener("mouseenter", () => {
        setActiveExperience(index);
    });

    row.addEventListener("click", () => {
        setActiveExperience(index);
    });
});


/* =================================
   ARENA SCROLL PARALLAX EFFECT
================================= */

const arenaSection = document.getElementById("arena");
const arenaVisualFrame = document.getElementById("arenaFrame");

let ticking = false;

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (arenaSection && arenaVisualFrame) {
                const rect = arenaSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Only calculate if arena is near viewport
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                    // Subtle translateY parallax (-20px to +20px range)
                    const translateY = (scrollProgress - 0.5) * 40;
                    arenaVisualFrame.style.transform = `translateY(${translateY.toFixed(1)}px)`;
                }
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });


/* =================================
   FEATURE NUMBERS SCROLL ENTRY OBSERVER
================================= */

if ("IntersectionObserver" in window) {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const expObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const rows = entry.target.querySelectorAll(".exp-row");
            if (entry.isIntersecting) {
                rows.forEach((row, index) => {
                    setTimeout(() => {
                        row.classList.add("revealed");
                    }, index * 100);
                });
            } else {
                const rect = entry.boundingClientRect;
                if (rect.top > window.innerHeight || rect.bottom < 0) {
                    rows.forEach((row) => row.classList.remove("revealed"));
                }
            }
        });
    }, observerOptions);

    const expPane = document.querySelector(".arena-experiences-pane");
    if (expPane) {
        expObserver.observe(expPane);
    }
} else {
    // Fallback if IntersectionObserver not available
    expRows.forEach((row) => row.classList.add("revealed"));
}


/* =================================
   PRICING TAB TOGGLE (SESSIONS / SQUADS)
================================= */

const toggleSessions = document.getElementById("toggleSessions");
const toggleMemberships = document.getElementById("toggleMemberships");
const sessionPassesGrid = document.getElementById("sessionPassesGrid");
const membershipPassesGrid = document.getElementById("membershipPassesGrid");

if (toggleSessions && toggleMemberships && sessionPassesGrid && membershipPassesGrid) {
    toggleSessions.addEventListener("click", () => {
        toggleSessions.classList.add("active");
        toggleSessions.setAttribute("aria-selected", "true");
        toggleMemberships.classList.remove("active");
        toggleMemberships.setAttribute("aria-selected", "false");

        sessionPassesGrid.classList.remove("hidden");
        membershipPassesGrid.classList.add("hidden");
    });

    toggleMemberships.addEventListener("click", () => {
        toggleMemberships.classList.add("active");
        toggleMemberships.setAttribute("aria-selected", "true");
        toggleSessions.classList.remove("active");
        toggleSessions.setAttribute("aria-selected", "false");

        membershipPassesGrid.classList.remove("hidden");
        sessionPassesGrid.classList.add("hidden");
    });
}


/* =================================
   TOAST NOTIFICATION HELPER
================================= */

const rollxToast = document.getElementById("rollxToast");
const toastMessage = document.getElementById("toastMessage");
let toastTimeout;

function showToast(message) {
    if (!rollxToast || !toastMessage) return;
    toastMessage.textContent = message;
    rollxToast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        rollxToast.classList.remove("show");
    }, 4000);
}


/* =================================
   SKATER AUTHENTICATION & SESSION
================================= */

let currentUser = JSON.parse(localStorage.getItem("rollx_user_session") || "null");
let pendingPassSelection = null;

const skaterProfileBadge = document.getElementById("skaterProfileBadge");
const skaterNameDisplay = document.getElementById("skaterNameDisplay");
const skaterLogoutBtn = document.getElementById("skaterLogoutBtn");
const openAuthModalBtn = document.getElementById("openAuthModalBtn");

const authModal = document.getElementById("authModal");
const closeAuthModalBtn = document.getElementById("closeAuthModalBtn");
const tabSignUp = document.getElementById("tabSignUp");
const tabSignIn = document.getElementById("tabSignIn");
const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");
const signUpError = document.getElementById("signUpError");
const signUpSuccess = document.getElementById("signUpSuccess");
const signInError = document.getElementById("signInError");

function updateAuthUI() {
    if (currentUser && currentUser.name) {
        if (skaterProfileBadge) skaterProfileBadge.style.display = "inline-flex";
        if (skaterNameDisplay) skaterNameDisplay.textContent = currentUser.name.split(" ")[0];
        if (openAuthModalBtn) openAuthModalBtn.style.display = "none";
    } else {
        if (skaterProfileBadge) skaterProfileBadge.style.display = "none";
        if (openAuthModalBtn) openAuthModalBtn.style.display = "inline-flex";
    }
}

function openAuthModal(defaultTab = "signup") {
    if (!authModal) return;
    authModal.classList.add("open");
    authModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (defaultTab === "signin") {
        showSignInTab();
    } else {
        showSignUpTab();
    }
}

function closeAuthModal() {
    if (!authModal) return;
    authModal.classList.remove("open");
    authModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (signUpError) signUpError.style.display = "none";
    if (signInError) signInError.style.display = "none";
}

function showSignUpTab() {
    if (tabSignUp) {
        tabSignUp.classList.add("active");
        tabSignUp.setAttribute("aria-selected", "true");
    }
    if (tabSignIn) {
        tabSignIn.classList.remove("active");
        tabSignIn.setAttribute("aria-selected", "false");
    }
    if (signUpForm) signUpForm.classList.remove("hidden");
    if (signInForm) signInForm.classList.add("hidden");
}

function showSignInTab() {
    if (tabSignIn) {
        tabSignIn.classList.add("active");
        tabSignIn.setAttribute("aria-selected", "true");
    }
    if (tabSignUp) {
        tabSignUp.classList.remove("active");
        tabSignUp.setAttribute("aria-selected", "false");
    }
    if (signInForm) signInForm.classList.remove("hidden");
    if (signUpForm) signUpForm.classList.add("hidden");
}

if (openAuthModalBtn) {
    openAuthModalBtn.addEventListener("click", () => openAuthModal("signin"));
}

if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener("click", closeAuthModal);
}

if (tabSignUp) tabSignUp.addEventListener("click", showSignUpTab);
if (tabSignIn) tabSignIn.addEventListener("click", showSignInTab);

// Close on backdrop click
if (authModal) {
    authModal.addEventListener("click", (e) => {
        if (e.target === authModal) closeAuthModal();
    });
}

// Sign Up Handler (Secure server-side registration with offline simulation)
if (signUpForm) {
    signUpForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("suName").value.trim();
        const phone = document.getElementById("suPhone").value.trim();
        const passcode = document.getElementById("suPasscode").value.trim();
        const email = document.getElementById("suEmail").value.trim();
        const promo = document.getElementById("suPromo").value.trim();

        // Validations
        if (!name || name.length < 2) {
            signUpError.textContent = "Full name is compulsory (min 2 characters).";
            signUpError.style.display = "block";
            return;
        }

        if (!phone || phone.length < 10) {
            signUpError.textContent = "Valid 10-digit mobile number is compulsory.";
            signUpError.style.display = "block";
            return;
        }

        if (!passcode || passcode.length < 4) {
            signUpError.textContent = "Passcode must be at least 4 digits.";
            signUpError.style.display = "block";
            return;
        }

        let userSession = {
            name: name,
            phone: phone,
            email: email || null,
            promo: promo || null
        };

        // Try API endpoint
        try {
            const res = await fetch("api/auth.php?action=register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ full_name: name, phone: phone, passcode: passcode, email: email, promo_code: promo })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.user) {
                    userSession = data.user;
                }
            }
        } catch (err) {
            // Server offline: continues with safe client session (no plaintext password stored)
        }

        currentUser = userSession;
        localStorage.setItem("rollx_user_session", JSON.stringify(currentUser));
        updateAuthUI();
        signUpError.style.display = "none";
        showToast(`Welcome to ROLLX, ${name}!`);
        closeAuthModal();

        // If user was booking a pass, proceed to booking modal
        if (pendingPassSelection) {
            openBookingModal(pendingPassSelection.pass, pendingPassSelection.price, pendingPassSelection.skaters || 1);
            pendingPassSelection = null;
        }
    });
}

// Sign In Handler (Secure login with offline simulation)
if (signInForm) {
    signInForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const phone = document.getElementById("siPhone").value.trim();
        const passcode = document.getElementById("siPasscode").value.trim();

        if (!phone || !passcode) {
            signInError.textContent = "Phone number and passcode are required.";
            signInError.style.display = "block";
            return;
        }

        let authenticatedUser = null;

        try {
            const res = await fetch("api/auth.php?action=login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: phone, passcode: passcode })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.user) {
                    authenticatedUser = data.user;
                } else if (data.error) {
                    signInError.textContent = data.error;
                    signInError.style.display = "block";
                    return;
                }
            }
        } catch (err) {
            // Local fallback simulation if server is offline
            const localSaved = JSON.parse(localStorage.getItem("rollx_user_session") || "null");
            if (localSaved && localSaved.phone === phone) {
                authenticatedUser = localSaved;
            } else {
                authenticatedUser = {
                    name: "Skater " + phone.slice(-4),
                    phone: phone,
                    email: null,
                    promo: null
                };
            }
        }

        if (authenticatedUser) {
            currentUser = authenticatedUser;
            localStorage.setItem("rollx_user_session", JSON.stringify(currentUser));
            updateAuthUI();
            signInError.style.display = "none";
            showToast(`Welcome back, ${currentUser.name}!`);
            closeAuthModal();

            if (pendingPassSelection) {
                openBookingModal(pendingPassSelection.pass, pendingPassSelection.price, pendingPassSelection.skaters || 1);
                pendingPassSelection = null;
            }
        }
    });
}

// Logout
if (skaterLogoutBtn) {
    skaterLogoutBtn.addEventListener("click", async () => {
        try {
            await fetch("api/auth.php?action=logout", { method: "POST" });
        } catch (e) {}
        currentUser = null;
        localStorage.removeItem("rollx_user_session");
        updateAuthUI();
        showToast("Signed out from ROLLX.");
    });
}

// Initialize Auth state
updateAuthUI();


/* =================================
   BOOKING MODAL & PASS RESERVATION
================================= */

const bookingModal = document.getElementById("bookingModal");
const closeBookingModalBtn = document.getElementById("closeBookingModalBtn");
const bookingFormState = document.getElementById("bookingFormState");
const bookingSuccessState = document.getElementById("bookingSuccessState");
const closeSuccessBookingBtn = document.getElementById("closeSuccessBookingBtn");

const bookSelectedPass = document.getElementById("bookSelectedPass");
const bookSkatersCount = document.getElementById("bookSkatersCount");
const bookDateSlot = document.getElementById("bookDateSlot");
const bookSkaterName = document.getElementById("bookSkaterName");
const bookSkaterPhone = document.getElementById("bookSkaterPhone");
const bookTotalAmount = document.getElementById("bookTotalAmount");
const bookPromoInput = document.getElementById("bookPromoInput");
const bookApplyPromoBtn = document.getElementById("bookApplyPromoBtn");
const bookPromoFeedback = document.getElementById("bookPromoFeedback");
const confirmBookingBtn = document.getElementById("confirmBookingBtn");
const bookingModalError = document.getElementById("bookingModalError");
const guestBookingFields = document.getElementById("guestBookingFields");
const bookGuestName = document.getElementById("bookGuestName");
const bookGuestPhone = document.getElementById("bookGuestPhone");

const confirmedRefCode = document.getElementById("confirmedRefCode");
const confirmedPassName = document.getElementById("confirmedPassName");
const confirmedSchedule = document.getElementById("confirmedSchedule");
const confirmedTotal = document.getElementById("confirmedTotal");

let activeBookingPrice = 100;
let activeBookingSkaters = 1;
let activeBookingDate = new Date().toISOString().split("T")[0];
let activeBookingSlot = "Evening Jam (4:00 PM – 7:00 PM)";
let activeBookingPassName = "Single Glide (1 Hour)";
let activePromoDiscount = 0;

function openBookingModal(passName, unitPrice, skaters = 1, date = null, slot = null) {
    if (!bookingModal) return;

    activeBookingPassName = passName;
    activeBookingPrice = Number(unitPrice);
    activeBookingSkaters = Number(skaters) || 1;
    activeBookingDate = date || (document.getElementById("resBookingDate") ? document.getElementById("resBookingDate").value : new Date().toISOString().split("T")[0]);
    activeBookingSlot = slot || activeResSlot || "Evening Jam (4:00 PM – 7:00 PM)";
    activePromoDiscount = 0;

    // Reset views
    if (bookingFormState) bookingFormState.style.display = "block";
    if (bookingSuccessState) bookingSuccessState.style.display = "none";
    if (bookingModalError) bookingModalError.style.display = "none";

    if (bookSelectedPass) bookSelectedPass.textContent = activeBookingPassName;
    if (bookSkatersCount) bookSkatersCount.textContent = `${activeBookingSkaters} Skater${activeBookingSkaters > 1 ? "s" : ""}`;
    if (bookDateSlot) bookDateSlot.textContent = `${activeBookingDate} • ${activeBookingSlot}`;

    if (currentUser) {
        if (guestBookingFields) guestBookingFields.style.display = "none";
        if (bookSkaterName) bookSkaterName.textContent = currentUser.name;
        if (bookSkaterPhone) bookSkaterPhone.textContent = "+977 " + currentUser.phone;
    } else {
        if (guestBookingFields) guestBookingFields.style.display = "block";
        if (bookSkaterName) bookSkaterName.textContent = "Guest Skater";
        if (bookSkaterPhone) bookSkaterPhone.textContent = "Provide below";
    }

    if (bookPromoInput) bookPromoInput.value = (currentUser && currentUser.promo) ? currentUser.promo : "";
    if (bookPromoFeedback) bookPromoFeedback.textContent = "";

    updateBookingTotal();

    bookingModal.classList.add("open");
    bookingModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove("open");
    bookingModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (bookingModalError) bookingModalError.style.display = "none";
}

function updateBookingTotal() {
    const isSquad = activeBookingPassName.includes("Squad") || activeBookingPassName.includes("Party");
    const baseTotal = isSquad ? activeBookingPrice : (activeBookingPrice * activeBookingSkaters);
    const finalAmount = Math.max(0, baseTotal - activePromoDiscount);
    if (bookTotalAmount) bookTotalAmount.textContent = `रू ${finalAmount}`;
    return finalAmount;
}

if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener("click", closeBookingModal);
}

if (closeSuccessBookingBtn) {
    closeSuccessBookingBtn.addEventListener("click", closeBookingModal);
}

if (bookingModal) {
    bookingModal.addEventListener("click", (e) => {
        if (e.target === bookingModal) closeBookingModal();
    });
}

// Apply Promo in Booking Modal
if (bookApplyPromoBtn && bookPromoInput) {
    bookApplyPromoBtn.addEventListener("click", () => {
        const code = bookPromoInput.value.trim().toUpperCase();
        const isSquad = activeBookingPassName.includes("Squad") || activeBookingPassName.includes("Party");
        const baseTotal = isSquad ? activeBookingPrice : (activeBookingPrice * activeBookingSkaters);

        if (code === "ROLLX10" || code === "WELCOME" || code === "LALBANDI") {
            activePromoDiscount = Math.round(baseTotal * 0.1);
            bookPromoFeedback.textContent = `✓ Promo applied! 10% discount (रू ${activePromoDiscount} off)`;
            bookPromoFeedback.style.color = "#10b981";
        } else if (code.length > 0) {
            activePromoDiscount = 0;
            bookPromoFeedback.textContent = "Invalid promo code. Try: ROLLX10";
            bookPromoFeedback.style.color = "#ef4444";
        }
        updateBookingTotal();
    });
}

// Confirm Booking button with real API submission & offline fallback
if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", async () => {
        let name = currentUser ? currentUser.name : (bookGuestName ? bookGuestName.value.trim() : "");
        let phone = currentUser ? currentUser.phone : (bookGuestPhone ? bookGuestPhone.value.trim() : "");

        if (!name || name.length < 2) {
            if (bookingModalError) {
                bookingModalError.textContent = "Please provide your full name.";
                bookingModalError.style.display = "block";
            }
            return;
        }

        if (!phone || phone.length < 10) {
            if (bookingModalError) {
                bookingModalError.textContent = "Please provide a valid 10-digit mobile number.";
                bookingModalError.style.display = "block";
            }
            return;
        }

        if (bookingModalError) bookingModalError.style.display = "none";
        confirmBookingBtn.disabled = true;
        confirmBookingBtn.innerHTML = "<span>RECORDING RESERVATION...</span>";

        const promo = bookPromoInput ? bookPromoInput.value.trim().toUpperCase() : "";
        const finalTotal = updateBookingTotal();

        const bookingPayload = {
            customer_name: name,
            customer_phone: phone,
            pass_name: activeBookingPassName,
            skaters_count: activeBookingSkaters,
            booking_date: activeBookingDate,
            time_slot: activeBookingSlot,
            unit_price: activeBookingPrice,
            promo_code: promo || null
        };

        let bookingResult = null;

        try {
            const res = await fetch("api/bookings.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingPayload)
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success && data.booking) {
                    bookingResult = data.booking;
                }
            }
        } catch (e) {
            // Local simulation if PHP server is offline
        }

        if (!bookingResult) {
            const datePart = activeBookingDate.replace(/-/g, "").slice(2, 6);
            const randPart = Math.random().toString(36).substring(2, 6).toUpperCase();
            bookingResult = {
                reference_code: `RLX-${datePart}-${randPart}`,
                customer_name: name,
                customer_phone: phone,
                pass_name: activeBookingPassName,
                skaters_count: activeBookingSkaters,
                booking_date: activeBookingDate,
                time_slot: activeBookingSlot,
                total_amount: finalTotal,
                payment_status: "unpaid_at_counter",
                created_at: new Date().toISOString()
            };

            // Mirror to local storage so admin preview reflects it
            try {
                const existing = JSON.parse(localStorage.getItem("rollx_local_bookings") || "[]");
                existing.unshift(bookingResult);
                localStorage.setItem("rollx_local_bookings", JSON.stringify(existing.slice(0, 50)));
            } catch (err) {}
        }

        // Show confirmation success view
        if (confirmedRefCode) confirmedRefCode.textContent = bookingResult.reference_code;
        if (confirmedPassName) confirmedPassName.textContent = bookingResult.pass_name;
        if (confirmedSchedule) confirmedSchedule.textContent = `${bookingResult.skaters_count} Skater(s) • ${bookingResult.booking_date} (${bookingResult.time_slot})`;
        if (confirmedTotal) confirmedTotal.textContent = `रू ${bookingResult.total_amount}`;

        if (bookingFormState) bookingFormState.style.display = "none";
        if (bookingSuccessState) bookingSuccessState.style.display = "block";

        confirmBookingBtn.disabled = false;
        confirmBookingBtn.innerHTML = "<span>CONFIRM MY SLOT NOW</span><span class=\"btn-arrow\">✓</span>";

        showToast(`🎉 Slot Reserved! Reference Code: ${bookingResult.reference_code}`);
    });
}

// Attach click listeners to all pass triggers
document.querySelectorAll(".book-pass-trigger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const pass = btn.getAttribute("data-pass") || "Single Glide (1 Hour)";
        const price = btn.getAttribute("data-price") || "100";
        openBookingModal(pass, price, 1);
    });
});

const mainNavBookBtn = document.getElementById("mainNavBookBtn");
if (mainNavBookBtn) {
    mainNavBookBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const dateInput = document.getElementById("resBookingDate");
        const date = dateInput ? dateInput.value : null;
        openBookingModal(activeResPass || "Single Glide (1 Hour)", activeResPrice || 100, activeResSkaters || 1, date, activeResSlot);
    });
}


/* =================================
   PACKAGE OFFERING PORTAL FILTERS
================================= */

const portalFilterBtns = document.querySelectorAll(".portal-filter-btn");
const packageCards = document.querySelectorAll(".packages-grid .package-card");

portalFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        portalFilterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        packageCards.forEach((card) => {
            const category = card.getAttribute("data-category");
            if (filter === "all" || category === filter) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});


/* =================================
   CUSTOM PACKAGE BUILDER CALCULATOR
================================= */

const calcSkaters = document.getElementById("calcSkaters");
const calcSkatersDisplay = document.getElementById("calcSkatersDisplay");
const hourBtns = document.querySelectorAll(".hours-selector .hour-btn");
const calcPromo = document.getElementById("calcPromo");
const applyPromoBtn = document.getElementById("applyPromoBtn");
const calcPromoFeedback = document.getElementById("calcPromoFeedback");
const calcBasePrice = document.getElementById("calcBasePrice");
const calcDiscountLine = document.getElementById("calcDiscountLine");
const calcDiscountLabel = document.getElementById("calcDiscountLabel");
const calcDiscountAmount = document.getElementById("calcDiscountAmount");
const calcFinalTotal = document.getElementById("calcFinalTotal");
const calcProceedBtn = document.getElementById("calcProceedBtn");

let currentHours = 1;
let promoDiscountPercent = 0;

function calculateCustomPackage() {
    if (!calcSkaters || !calcFinalTotal) return;

    const skaters = Number(calcSkaters.value);
    if (calcSkatersDisplay) {
        calcSkatersDisplay.textContent = `${skaters} ${skaters === 1 ? "Skater" : "Skaters"}`;
    }

    const pricePerHourPerSkater = 100;
    const baseTotal = skaters * currentHours * pricePerHourPerSkater;
    if (calcBasePrice) calcBasePrice.textContent = `रू ${baseTotal}`;

    // Squad discount for 4 or more skaters: 20%
    let crewDiscount = 0;
    let discountLabelText = "";

    if (skaters >= 4) {
        crewDiscount = baseTotal * 0.20;
        discountLabelText = `Squad Crew Perk (-20%):`;
    }

    // Additional promo discount
    let promoDiscount = 0;
    if (promoDiscountPercent > 0) {
        promoDiscount = (baseTotal - crewDiscount) * promoDiscountPercent;
        discountLabelText = discountLabelText ? `Squad (-20%) + Promo (-10%):` : `Promo Code (-10%):`;
    }

    const totalDiscount = Math.round(crewDiscount + promoDiscount);
    const finalTotal = Math.max(0, baseTotal - totalDiscount);

    if (totalDiscount > 0) {
        if (calcDiscountLine) calcDiscountLine.style.display = "flex";
        if (calcDiscountLabel) calcDiscountLabel.textContent = discountLabelText;
        if (calcDiscountAmount) calcDiscountAmount.textContent = `- रू ${totalDiscount}`;
    } else {
        if (calcDiscountLine) calcDiscountLine.style.display = "none";
    }

    if (calcFinalTotal) calcFinalTotal.textContent = `रू ${finalTotal}`;
}

if (calcSkaters) {
    calcSkaters.addEventListener("input", calculateCustomPackage);
}

hourBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        hourBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentHours = Number(btn.getAttribute("data-hours")) || 1;
        calculateCustomPackage();
    });
});

if (applyPromoBtn && calcPromo) {
    applyPromoBtn.addEventListener("click", () => {
        const code = calcPromo.value.trim().toUpperCase();
        if (code === "ROLLX10" || code === "WELCOME" || code === "LALBANDI") {
            promoDiscountPercent = 0.10;
            calcPromoFeedback.textContent = "✓ 10% promo discount applied!";
            calcPromoFeedback.className = "promo-feedback";
        } else if (code.length > 0) {
            promoDiscountPercent = 0;
            calcPromoFeedback.textContent = "Invalid code. Try: ROLLX10";
            calcPromoFeedback.className = "promo-feedback error";
        } else {
            promoDiscountPercent = 0;
            calcPromoFeedback.textContent = "";
        }
        calculateCustomPackage();
    });
}

if (calcProceedBtn) {
    calcProceedBtn.addEventListener("click", () => {
        const skaters = calcSkaters ? calcSkaters.value : 4;
        const passName = `Custom Crew (${skaters} Skaters, ${currentHours} Hr)`;
        const finalPrice = calcFinalTotal ? calcFinalTotal.textContent.replace("रू", "").trim() : "320";

        if (!currentUser) {
            pendingPassSelection = { pass: passName, price: finalPrice };
            openAuthModal("signup");
            showToast("Sign up to confirm your custom crew package!");
        } else {
            openBookingModal(passName, finalPrice);
        }
    });
}

// Initial calculation
calculateCustomPackage();

/* =================================
   EVENTS FILTER CONTROLS
================================= */

const eventFilterBtns = document.querySelectorAll(".event-filter-btn");
const eventCards = document.querySelectorAll("#eventsGrid .event-card");

if (eventFilterBtns.length && eventCards.length) {
    eventFilterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            eventFilterBtns.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            const filter = btn.getAttribute("data-filter");

            eventCards.forEach((card) => {
                const categories = (card.getAttribute("data-category") || "").split(" ");
                if (filter === "all" || categories.includes(filter)) {
                    card.style.display = "flex";
                    // Trigger reflow for smooth entrance
                    card.style.animation = "none";
                    card.offsetHeight;
                    card.style.animation = "fadeInDown 0.3s ease";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}


/* =================================
   COMMUNITY MODAL & REGISTRATION
================================= */

const communityModal = document.getElementById("communityModal");
const closeCommunityModalBtn = document.getElementById("closeCommunityModalBtn");
const communityJoinForm = document.getElementById("communityJoinForm");
const communityFormError = document.getElementById("communityFormError");
const communityFormSuccess = document.getElementById("communityFormSuccess");
const cmActivitySelect = document.getElementById("cmActivity");

function openCommunityModal(defaultActivity = null) {
    if (!communityModal) return;
    if (defaultActivity && cmActivitySelect) {
        for (let opt of cmActivitySelect.options) {
            if (opt.value.toLowerCase().includes(defaultActivity.toLowerCase())) {
                cmActivitySelect.value = opt.value;
                break;
            }
        }
    }
    if (communityFormError) communityFormError.style.display = "none";
    if (communityFormSuccess) communityFormSuccess.style.display = "none";
    communityModal.classList.add("open");
    communityModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeCommunityModal() {
    if (!communityModal) return;
    communityModal.classList.remove("open");
    communityModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Bind triggers for Community Modal
document.querySelectorAll(".open-community-modal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const activity = btn.getAttribute("data-activity") || null;
        openCommunityModal(activity);
    });
});

if (closeCommunityModalBtn) {
    closeCommunityModalBtn.addEventListener("click", closeCommunityModal);
}

if (communityModal) {
    communityModal.addEventListener("click", (e) => {
        if (e.target === communityModal) closeCommunityModal();
    });
}

if (communityJoinForm) {
    communityJoinForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("cmName").value.trim();
        const ageGroup = document.getElementById("cmAgeGroup").value;
        const contact = document.getElementById("cmContact").value.trim();
        const activity = document.getElementById("cmActivity").value;

        if (!name || !contact || !ageGroup || !activity) {
            if (communityFormError) {
                communityFormError.textContent = "Please fill in all required fields.";
                communityFormError.style.display = "block";
            }
            return;
        }

        if (communityFormError) communityFormError.style.display = "none";
        if (communityFormSuccess) {
            communityFormSuccess.innerHTML = `🎉 <strong>Welcome to ROLLX Fam, ${name}!</strong><br>You are registered for <em>${activity}</em>. We'll connect with you soon.`;
            communityFormSuccess.style.display = "block";
        }

        communityJoinForm.reset();
        showToast(`🎉 Welcome to ROLLX Community, ${name}!`);

        setTimeout(() => {
            closeCommunityModal();
            if (communityFormSuccess) communityFormSuccess.style.display = "none";
        }, 3200);
    });
}


/* =================================
   INTERACTIVE RESERVATION SECTION CONTROLLER
/* =================================
   INTERACTIVE RESERVATION SECTION CONTROLLER
================================= */

let activeResPass = "Double Glide (2 Hours)";
let activeResPrice = "200";
let activeResSlot = "Evening Jam (4:00 PM – 7:00 PM)";
let activeResSkaters = 1;

// Date picker default setup
const resBookingDate = document.getElementById("resBookingDate");
if (resBookingDate) {
    const today = new Date().toISOString().split("T")[0];
    resBookingDate.min = today;
    resBookingDate.value = today;
}

// Stepper controls
const stepperMinusBtn = document.getElementById("stepperMinusBtn");
const stepperPlusBtn = document.getElementById("stepperPlusBtn");
const stepperCountDisplay = document.getElementById("stepperCountDisplay");

function updateReservationSummary() {
    if (resPillPass) resPillPass.textContent = activeResPass;
    if (resPillSlot) resPillSlot.textContent = `${activeResSkaters} Skater${activeResSkaters > 1 ? "s" : ""} • ${activeResSlot}`;
    
    const isSquad = activeResPass.includes("Squad") || activeResPass.includes("Party");
    const total = isSquad ? Number(activeResPrice) : (Number(activeResPrice) * activeResSkaters);
    if (resPillPrice) resPillPrice.textContent = `रू ${total}`;
}

if (stepperMinusBtn && stepperPlusBtn && stepperCountDisplay) {
    stepperMinusBtn.addEventListener("click", () => {
        if (activeResSkaters > 1) {
            activeResSkaters--;
            stepperCountDisplay.textContent = activeResSkaters;
            updateReservationSummary();
        }
    });

    stepperPlusBtn.addEventListener("click", () => {
        if (activeResSkaters < 20) {
            activeResSkaters++;
            stepperCountDisplay.textContent = activeResSkaters;
            updateReservationSummary();
        }
    });
}

const passCards = document.querySelectorAll(".pass-option-card");
const slotCards = document.querySelectorAll(".slot-option-card");
const resPillPass = document.getElementById("resPillPass");
const resPillSlot = document.getElementById("resPillSlot");
const resPillPrice = document.getElementById("resPillPrice");
const resValidationMsg = document.getElementById("resValidationMsg");
const continueReservationBtn = document.getElementById("continueReservationBtn");

// Session Pass Selection
passCards.forEach((card) => {
    function selectPass() {
        passCards.forEach((c) => {
            c.classList.remove("selected");
            c.setAttribute("aria-checked", "false");
        });
        card.classList.add("selected");
        card.setAttribute("aria-checked", "true");

        activeResPass = card.getAttribute("data-pass");
        activeResPrice = card.getAttribute("data-price");

        updateReservationSummary();
        if (resValidationMsg) resValidationMsg.style.display = "none";
    }

    card.addEventListener("click", selectPass);
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectPass();
        }
    });
});

// Time Slot Selection
slotCards.forEach((card) => {
    function selectSlot() {
        slotCards.forEach((c) => {
            c.classList.remove("selected");
            c.setAttribute("aria-checked", "false");
        });
        card.classList.add("selected");
        card.setAttribute("aria-checked", "true");

        activeResSlot = card.getAttribute("data-slot");
        updateReservationSummary();
        if (resValidationMsg) resValidationMsg.style.display = "none";
    }

    card.addEventListener("click", selectSlot);
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectSlot();
        }
    });
});

// Continue Reservation Button
if (continueReservationBtn) {
    continueReservationBtn.addEventListener("click", () => {
        if (!activeResPass) {
            if (resValidationMsg) {
                resValidationMsg.textContent = "Please select a session pass above.";
                resValidationMsg.style.display = "block";
            }
            return;
        }

        if (!activeResSlot) {
            if (resValidationMsg) {
                resValidationMsg.textContent = "Please select a preferred time slot above.";
                resValidationMsg.style.display = "block";
            }
            return;
        }

        if (resValidationMsg) resValidationMsg.style.display = "none";

        const selectedDate = resBookingDate ? resBookingDate.value : new Date().toISOString().split("T")[0];
        openBookingModal(activeResPass, activeResPrice, activeResSkaters, selectedDate, activeResSlot);
    });
}


/* =================================
   FAQ ACCORDION INTERACTION
================================= */

document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        if (!item) return;
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item").forEach((el) => {
            el.classList.remove("open");
        });

        if (!isOpen) {
            item.classList.add("open");
        }
    });
});


/* =================================
   CONTACT INQUIRY FORM HANDLER
================================= */

const contactInquiryForm = document.getElementById("contactInquiryForm");
const contactSuccessMsg = document.getElementById("contactSuccessMsg");
const contactErrorMsg = document.getElementById("contactErrorMsg");

if (contactInquiryForm) {
    contactInquiryForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("ciName").value.trim();
        const contact = document.getElementById("ciContact").value.trim();
        const subject = document.getElementById("ciSubject").value.trim() || "General Arena Inquiry";
        const message = document.getElementById("ciMessage").value.trim();

        if (!name || !contact || !message) {
            if (contactErrorMsg) {
                contactErrorMsg.textContent = "Please fill in your name, contact info, and message.";
                contactErrorMsg.style.display = "block";
            }
            return;
        }

        if (contactErrorMsg) contactErrorMsg.style.display = "none";

        try {
            await fetch("api/contact.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ full_name: name, contact: contact, subject: subject, message: message })
            });
        } catch (err) {}

        if (contactSuccessMsg) {
            contactSuccessMsg.innerHTML = `✓ Thank you, ${name}! Your inquiry has been received. Our team in Lalbandi will get back to you shortly.`;
            contactSuccessMsg.style.display = "block";
        }

        contactInquiryForm.reset();
        showToast(`Message sent! Thanks for contacting ROLLX.`);

        setTimeout(() => {
            if (contactSuccessMsg) contactSuccessMsg.style.display = "none";
        }, 5000);
    });
}


/* =================================
   BIDIRECTIONAL SCROLL TEXT & SECTION ANIMATION ENGINE
================================= */

let lastScrollY = window.scrollY || 0;
let currentScrollDir = "down";
const scrollProgressBar = document.getElementById("scrollProgressBar");
const mainNavbar = document.querySelector(".navbar");

function updateScrollMetrics() {
    const currentY = window.scrollY || 0;
    const delta = currentY - lastScrollY;

    if (Math.abs(delta) >= 3) {
        currentScrollDir = delta > 0 ? "down" : "up";
        document.documentElement.setAttribute("data-scroll-dir", currentScrollDir);
    }
    lastScrollY = currentY;

    // Update top progress bar
    if (scrollProgressBar) {
        const winHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = winHeight > 0 ? (currentY / winHeight) * 100 : 0;
        scrollProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    // Subtle navbar elevation transition on scroll
    if (mainNavbar) {
        if (currentY > 30) {
            mainNavbar.classList.add("is-scrolled");
        } else {
            mainNavbar.classList.remove("is-scrolled");
        }
    }
}

window.addEventListener("scroll", updateScrollMetrics, { passive: true });
updateScrollMetrics();

// Respect accessibility preference for reduced motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// High-Performance Bidirectional IntersectionObserver for Scroll Reveals
if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealElements = document.querySelectorAll(
        ".reveal-title, .reveal-card, .reveal-text"
    );

    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const el = entry.target;
            const rect = entry.boundingClientRect;

            if (entry.isIntersecting) {
                // Element enters reveal zone -> animate into place
                el.classList.add("revealed");
            } else {
                // Element exits reveal zone -> reset only if completely outside the viewport
                if (rect.top > window.innerHeight || rect.bottom < 0) {
                    el.classList.remove("revealed");
                }
            }
        });
    }, observerOptions);

    revealElements.forEach((el) => revealObserver.observe(el));
} else {
    // Graceful fallback for reduced motion or legacy browsers
    document.querySelectorAll(
        ".reveal-title, .reveal-card, .reveal-text"
    ).forEach((el) => {
        el.classList.add("revealed");
    });
}


/* =================================
   GLOBAL ESCAPE KEY MODAL HANDLER
================================= */

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeAuthModal();
        closeBookingModal();
        closeCommunityModal();
    }
});