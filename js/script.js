// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').style.display = 'none';
            }
        }
    });
});

// Modal Functionality
const applyNowBtn = document.getElementById('applyNowBtn');
const bottomApplyBtn = document.getElementById('bottomApplyBtn');
const applyJobBtns = document.querySelectorAll('.apply-job-btn');
const applicationModal = document.getElementById('applicationModal');
const successModal = document.getElementById('successModal');
const closeBtns = document.querySelectorAll('.close-btn');
const closeSuccessModalBtn = document.getElementById('closeSuccessModal');
const submitApplicationBtn = document.getElementById('submitApplication');

// Open application modal
function openApplicationModal() {
    applicationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

applyNowBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openApplicationModal();
});

bottomApplyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openApplicationModal();
});

applyJobBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        openApplicationModal();
    });
});

// Close modals
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

closeSuccessModalBtn.addEventListener('click', function() {
    closeModal(successModal);
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === applicationModal) {
        closeModal(applicationModal);
    }
    if (e.target === successModal) {
        closeModal(successModal);
    }
});

// Form Submission
submitApplicationBtn.addEventListener('click', function() {
    const form = document.getElementById('applicationForm');
    if (form.checkValidity()) {
        closeModal(applicationModal);
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        form.reset();
    } else {
        form.reportValidity();
    }
});

// Animate elements when scrolling
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .job-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.feature-card, .job-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
