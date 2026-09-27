document.getElementById("search").addEventListener("input", function () {

        const query = this.value.toLowerCase();

        const sermonItems = document.querySelectorAll(".sermon-list li");

        let visibleCount = 0;



        sermonItems.forEach((item) => {

          const isMatch = item.textContent.toLowerCase().includes(query);

          item.style.display = isMatch ? "" : "none";

          if (isMatch) visibleCount++;

        });



        const noResultsMessage = document.getElementById("no-results");

        noResultsMessage.style.display = visibleCount === 0 && query.length > 0 ? "block" : "none";

      });
