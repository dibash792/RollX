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

    const expObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const rows = entry.target.querySelectorAll(".exp-row");
                rows.forEach((row, index) => {
                    setTimeout(() => {
                        row.classList.add("revealed");
                    }, index * 120);
                });
                observer.unobserve(entry.target);
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

let currentUser = JSON.parse(localStorage.getItem("rollx_user") || "null");
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

// Sign Up Handler (Compulsory: Name, Phone, Passcode. Optional: Email, Promo)
if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("suName").value.trim();
        const phone = document.getElementById("suPhone").value.trim();
        const passcode = document.getElementById("suPasscode").value.trim();
        const email = document.getElementById("suEmail").value.trim();
        const promo = document.getElementById("suPromo").value.trim();

        // Validations
        if (!name) {
            signUpError.textContent = "Full name is compulsory.";
            signUpError.style.display = "block";
            return;
        }

        if (!phone || phone.length < 10) {
            signUpError.textContent = "Valid 10-digit phone number is compulsory.";
            signUpError.style.display = "block";
            return;
        }

        if (!passcode || passcode.length < 4) {
            signUpError.textContent = "Passcode must be at least 4 digits.";
            signUpError.style.display = "block";
            return;
        }

        // Create user object
        currentUser = {
            name: name,
            phone: phone,
            passcode: passcode,
            email: email || null,
            promo: promo || null
        };

        localStorage.setItem("rollx_user", JSON.stringify(currentUser));
        updateAuthUI();
        signUpError.style.display = "none";
        showToast(`Welcome to ROLLX, ${name}!`);
        closeAuthModal();

        // If user was booking a pass, proceed to booking modal
        if (pendingPassSelection) {
            openBookingModal(pendingPassSelection.pass, pendingPassSelection.price);
            pendingPassSelection = null;
        }
    });
}

// Sign In Handler
if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const phone = document.getElementById("siPhone").value.trim();
        const passcode = document.getElementById("siPasscode").value.trim();

        const savedUser = JSON.parse(localStorage.getItem("rollx_user") || "null");

        if (savedUser && savedUser.phone === phone && savedUser.passcode === passcode) {
            currentUser = savedUser;
            updateAuthUI();
            showToast(`Welcome back, ${currentUser.name}!`);
            closeAuthModal();

            if (pendingPassSelection) {
                openBookingModal(pendingPassSelection.pass, pendingPassSelection.price);
                pendingPassSelection = null;
            }
        } else if (savedUser && savedUser.phone === phone) {
            signInError.textContent = "Incorrect passcode. Please try again.";
            signInError.style.display = "block";
        } else {
            // Allow instant login if first time
            currentUser = {
                name: "Skater " + phone.slice(-4),
                phone: phone,
                passcode: passcode,
                email: null,
                promo: null
            };
            localStorage.setItem("rollx_user", JSON.stringify(currentUser));
            updateAuthUI();
            showToast(`Signed in with phone ${phone}!`);
            closeAuthModal();

            if (pendingPassSelection) {
                openBookingModal(pendingPassSelection.pass, pendingPassSelection.price);
                pendingPassSelection = null;
            }
        }
    });
}

// Logout
if (skaterLogoutBtn) {
    skaterLogoutBtn.addEventListener("click", () => {
        currentUser = null;
        localStorage.removeItem("rollx_user");
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
const bookSelectedPass = document.getElementById("bookSelectedPass");
const bookSkaterName = document.getElementById("bookSkaterName");
const bookSkaterPhone = document.getElementById("bookSkaterPhone");
const bookTotalAmount = document.getElementById("bookTotalAmount");
const bookPromoInput = document.getElementById("bookPromoInput");
const bookApplyPromoBtn = document.getElementById("bookApplyPromoBtn");
const bookPromoFeedback = document.getElementById("bookPromoFeedback");
const confirmBookingBtn = document.getElementById("confirmBookingBtn");

let activeBookingPrice = 100;
let activePromoDiscount = 0;

function openBookingModal(passName, price) {
    if (!bookingModal) return;

    activeBookingPrice = Number(price);
    activePromoDiscount = 0;

    if (bookSelectedPass) bookSelectedPass.textContent = passName;
    if (bookSkaterName) bookSkaterName.textContent = currentUser ? currentUser.name : "Skater";
    if (bookSkaterPhone) bookSkaterPhone.textContent = currentUser ? "+977 " + currentUser.phone : "—";
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
}

function updateBookingTotal() {
    let finalAmount = Math.max(0, activeBookingPrice - activePromoDiscount);
    if (bookTotalAmount) bookTotalAmount.textContent = `रू ${finalAmount}`;
}

if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener("click", closeBookingModal);
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
        if (code === "ROLLX10" || code === "WELCOME" || code === "LALBANDI") {
            activePromoDiscount = Math.round(activeBookingPrice * 0.1);
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

// Confirm Booking button
if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", () => {
        closeBookingModal();
        showToast(`🎉 Slot Reserved for ${currentUser ? currentUser.name : "you"}! See you on the rink floor.`);
    });
}

// Attach click listeners to all pass triggers
document.querySelectorAll(".book-pass-trigger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const pass = btn.getAttribute("data-pass") || "Session Pass";
        const price = btn.getAttribute("data-price") || "100";

        if (!currentUser) {
            pendingPassSelection = { pass, price };
            openAuthModal("signup");
            showToast("Please sign up or sign in to reserve your pass.");
        } else {
            openBookingModal(pass, price);
        }
    });
});

const mainNavBookBtn = document.getElementById("mainNavBookBtn");
if (mainNavBookBtn) {
    mainNavBookBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!currentUser) {
            pendingPassSelection = { pass: "Single Glide (1 Hour)", price: 100 };
            openAuthModal("signup");
        } else {
            openBookingModal("Single Glide (1 Hour)", 100);
        }
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
================================= */

let activeResPass = "Double Glide (2 Hours)";
let activeResPrice = "200";
let activeResSlot = "Evening Jam (4:00 PM – 7:00 PM)";

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

        if (resPillPass) resPillPass.textContent = activeResPass;
        if (resPillPrice) resPillPrice.textContent = `रू ${activeResPrice}`;
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

        if (resPillSlot) resPillSlot.textContent = activeResSlot;
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

// Continue Reservation Button with validation & confirmation summary
if (continueReservationBtn) {
    continueReservationBtn.addEventListener("click", () => {
        // Validation check
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

        const passSummary = `${activeResPass} • ${activeResSlot}`;

        if (!currentUser) {
            pendingPassSelection = { pass: passSummary, price: activeResPrice };
            openAuthModal("signup");
            showToast("Please sign in or register to finalize your reservation.");
        } else {
            openBookingModal(passSummary, activeResPrice);
        }
    });
}


/* =================================
   BIDIRECTIONAL SCROLL TEXT ANIMATION ENGINE
================================= */

let lastScrollY = window.scrollY || 0;
let currentScrollDir = "down";
const scrollProgressBar = document.getElementById("scrollProgressBar");

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
}

window.addEventListener("scroll", updateScrollMetrics, { passive: true });
updateScrollMetrics();

// Bidirectional IntersectionObserver with hysteresis reset
if ("IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(".reveal-title, .reveal-card, .reveal-text");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const el = entry.target;
            const rect = entry.boundingClientRect;

            if (entry.isIntersecting) {
                el.classList.add("revealed");
            } else {
                // When element scrolls completely out of view, remove revealed class
                // Allows smooth re-animation whether approaching from top or bottom
                if (rect.top > window.innerHeight + 80 || rect.bottom < -80) {
                    el.classList.remove("revealed");
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "30px 0px -40px 0px"
    });

    revealElements.forEach((el) => revealObserver.observe(el));
} else {
    document.querySelectorAll(".reveal-title, .reveal-card, .reveal-text").forEach((el) => {
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