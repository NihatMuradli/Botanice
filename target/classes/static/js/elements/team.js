const cards = document.querySelectorAll(".team-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        let ownClasses = card.classList;
        if(!ownClasses.contains("active")){
            cards.forEach(removeableCard => {
                let removeableCardClasses = removeableCard.classList;
                if (removeableCardClasses.contains("active")) {
                    removeableCard.classList.remove("active");
                    removeableCard.classList.add("remove");
                    setTimeout(() => {
                        removeableCard.classList.remove("remove");
                    }, 1000);
                }
            });
            card.classList.add("active");
        }
    });
});
