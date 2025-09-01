document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica del Acordeón ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-header.active');
            if (currentlyActive && currentlyActive !== header) {
                currentlyActive.classList.remove('active');
                currentlyActive.nextElementSibling.classList.remove('active');
                currentlyActive.nextElementSibling.style.maxHeight = 0;
            }
            
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            content.classList.toggle('active');

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío real del formulario

        const recipient = 'usajhoel@gmail.com';
        const subject = document.getElementById('subject').value;
        const body = document.getElementById('body').value;

        // Crear el enlace mailto:
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Abrir el cliente de correo del usuario
        window.location.href = mailtoLink;
    });

});