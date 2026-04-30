document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================
       1. GESTION DU MENU ACTIF AU SCROLL
       ========================================================== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar-nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        // Identifie la section visible à l'écran
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            // Décalage pour activer le menu un peu avant
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        // Met à jour la surbrillance dans le menu de gauche
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    /* ==========================================================
       2. GESTION DU BOUTON "RETOUR EN HAUT"
       ========================================================== */
    const backToTopBtn = document.getElementById("back-to-top");

    // Vérifie si le bouton existe bien dans le HTML
    if (backToTopBtn) {
        
        // Affiche ou cache le bouton selon le défilement
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "flex"; // Affiche le bouton
            } else {
                backToTopBtn.style.display = "none"; // Cache le bouton
            }
        });

        // Action au clic : remonte tout en haut en douceur
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ==========================================================
       3. GESTION DE LA MODAL (Procédures)
       ========================================================== */
    const procCards = document.querySelectorAll(".proc-card");
    const modal = document.getElementById("proc-modal");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalContentArea = document.getElementById("modal-content-area");

    if (modal) {
        // Ouvrir la modal au clic sur une carte
        procCards.forEach(card => {
            card.addEventListener("click", (e) => {
                e.preventDefault();
                const title = card.getAttribute("data-title");
                const pdfSrc = card.getAttribute("data-pdf");

                // Mettre à jour le titre
                modalTitle.textContent = `Procédure - ${title}`;

                // Injecter le PDF via la balise embed
                modalContentArea.innerHTML = `
                    <embed 
                        src="${pdfSrc}#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
                        type="application/pdf" 
                        width="100%" 
                        height="100%">
                `;

                // Afficher la modal
                modal.classList.add("active");
                document.body.style.overflow = "hidden"; // Empêche le scroll de la page en arrière-plan
            });
        });

        // Fonction pour fermer la modal
        const closeModal = () => {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
            // Vider le contenu pour arrêter le chargement du PDF
            setTimeout(() => {
                modalContentArea.innerHTML = "";
            }, 300); // Attendre la fin de la transition CSS
        };

        // Fermer au clic sur le bouton
        btnCloseModal.addEventListener("click", closeModal);

        // Fermer au clic en dehors de la boîte
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Fermer avec la touche Echap
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                closeModal();
            }
        });
    }

});
