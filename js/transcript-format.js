(function () {
  "use strict";

  const sectionHeadings = [
    ["Decíamos que las visitas llevan", "El propósito de una visita"],
    [
      "Así que vayamos a la Palabra de Dios en el libro de Ezequiel",
      "Un mensaje que restaura y da vida",
    ],
    ["Pero ¿cómo iremos a esas personas?", "Llevar el mensaje con amor"],
    [
      "¿Qué hizo nuestro Señor Jesús para que pudiéramos oírle?",
      "Seguir el ejemplo de Jesús",
    ],
    [
      "El apóstol Pablo, en este versículo de Colosenses 4:6",
      "Recibir y servir a otros",
    ],
    [
      "Así que si Dios nos ha visitado con el propósito de que hagamos su voluntad",
      "Responder al propósito de Dios",
    ],
    [
      "Póngase sobre sus pies, iglesia.",
      "Seis maneras de vivir el propósito",
    ],
    ["Llamamiento al altar", "Un llamado a responder"],
    ["Oración de entrega Padre", "Oración final"],
  ];

  const englishSectionHeadings = [
    ["We were saying that visits carry", "The Purpose of a Visit"],
    [
      "In the book of Exodus, chapter 19, verse 9",
      "A Message That Restores and Gives Life",
    ],
    ["But how will we go to those people?", "Taking the Message with Love"],
    [
      "What did our Lord Jesus do so that we could hear Him?",
      "Following Jesus’ Example",
    ],
    [
      "The apostle Paul gives us very important advice",
      "Welcoming and Serving Others",
    ],
    [
      "So if God has visited us so that we may do His will",
      "Responding to God’s Purpose",
    ],
    ["Stand up, church.", "Six Ways to Live Out God’s Purpose"],
    ["Altar call.", "A Call to Respond"],
    ["Prayer of surrender:", "Closing Prayer"],
  ];

  const contactingPowerHeadings = [
    ["Vamos a ponernos de pie a leer una porción bíblica", "Lectura bíblica"],
    ["Amado Dios, gracias por tu Palabra bendita", "Oración"],
    ["Quiero predicarles bajo el título", "El mensaje"],
    ["Y la iglesia está encomendada por Dios", "Llevar el mensaje del evangelio"],
    ["Pero ¿qué es contactar?", "El poder de contactar"],
    ["La Biblia nos habla una historia en el libro de Hechos", "Felipe y el eunuco"],
    ["¿Qué siente alguien que transmite?", "El sentir de quien transmite"],
    ["Una mujer de contacto, de la que ni siquiera conocemos", "La mujer samaritana"],
  ];

  const contactingPowerHeadingsEnglish = [
    ["Let us stand to read a passage of Scripture", "Bible Reading"],
    ["Beloved God, thank You for Your blessed Word", "Prayer"],
    ["I want to preach to you under the title", "The Message"],
    ["God has commissioned the church to carry", "Carrying the Gospel Message"],
    ["But what does it mean to make contact?", "The Power of Making Contact"],
    ["The Bible tells us a story in Acts chapter 8", "Philip and the Ethiopian Official"],
    ["What does someone who carries a message feel?", "The Heart of a Messenger"],
    ["A woman who made contact, whose name we do not even know", "The Samaritan Woman"],
  ];

  const scriptureQuotes = [
    "Allí el ángel del Señor se le apareció",
    "en un fuego ardiente en medio de una zarza. Moisés se quedó mirando, lleno de asombro, porque aunque la zarza estaba envuelta en llamas, no se consumía",
    "Esto es increíble",
    "¿Por qué esta zarza no se consume? Tengo que ir a verla más de cerca",
    "Moisés, Moisés",
    "Aquí estoy",
    "No te acerques más",
    "Quítate las sandalias, porque estás pisando tierra santa",
    "Yo soy el Dios de tu padre, el Dios de Abraham, el Dios de Isaac y el Dios de Jacob",
    "Ciertamente he visto la opresión que sufre mi pueblo en Egipto. He oído sus gritos de angustia a causa de la crueldad de sus capataces, y estoy al tanto de sus sufrimientos",
    "Y Jehová dijo a Moisés: He aquí, yo vengo a ti en una nube espesa, para que el pueblo oiga mientras yo hablo contigo, y también para que te crean para siempre",
    "Y Moisés refirió las palabras del pueblo a Jehová",
    "Y sabréis que yo soy Jehová, cuando abriere vuestros sepulcros y os sacare de vuestras sepulturas, pueblo mío",
    "En cambio, hablaremos la verdad con amor, y así creceremos en todo sentido hasta parecernos más y más a Cristo, quien es la cabeza de su cuerpo, que es la iglesia",
    "Él hace que todo el cuerpo encaje perfectamente, y cada parte, al cumplir su función específica, ayuda a que los demás se desarrollen, y entonces todo el cuerpo crezca y sea sano y lleno de amor",
    "Y aquel Verbo fue hecho carne y habitó",
    "Fue hecho carne y habitó entre nosotros, y vimos su gloria, la gloria del unigénito del Padre, lleno de gracia y de verdad",
    "Que sus conversaciones sean cordiales y agradables, a fin de que tengan la respuesta adecuada para cada persona",
  ];

  const englishScriptureQuotes = [
    "There the angel of the Lord appeared to him",
    "in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up",
    "This is incredible",
    "Why doesn’t this bush burn up? I have to go over and see it more closely",
    "Moses! Moses!",
    "Here I am",
    "Do not come any closer",
    "Take off your sandals, for you are standing on holy ground",
    "I am the God of your father, the God of Abraham, the God of Isaac, and the God of Jacob",
    "I have indeed seen the misery of my people in Egypt. I have heard them crying out because of their slave drivers, and I am concerned about their suffering",
    "I am going to come to you in a dense cloud, so that the people will hear me speaking with you and will always put their trust in you",
    "Then you, my people, will know that I am the Lord, when I open your graves and bring you up from them",
    "speaking the truth in love, we will grow to become in every respect the mature body of Him who is the head, that is, Christ",
    "From Him the whole body, joined and held together by every supporting ligament, grows and builds itself up in love, as each part does its work",
    "The Word became flesh and dwelt among us",
    "The Word became flesh and made His dwelling among us. We have seen His glory, the glory of the one and only Son, who came from the Father, full of grace and truth",
    "Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone",
  ];

  const contactingPowerScriptureQuotes = [
    "Paz a vosotros. Como me envió el Padre, así también yo os envío. Y habiendo dicho esto, sopló en ellos, y les dijo: Recibid el Espíritu Santo",
    "A quienes remitiereis los pecados, les serán remitidos; y a quienes se los retuviereis, les serán retenidos",
    "Y yendo por el camino, llegando a cierta agua, dijo el eunuco: He aquí agua; ¿qué impide que yo sea bautizado?",
    "Venid, ved a un hombre",
    "Y muchos samaritanos de aquella ciudad creyeron en él por la palabra de la mujer, que daba testimonio diciendo: Me ha dicho todo lo que he hecho",
  ];

  const contactingPowerScriptureQuotesEnglish = [
    "Peace to you. As the Father sent Me, I also send you.",
    "Receive the Holy Spirit.",
    "If you forgive anyone’s sins, they are forgiven; if you retain anyone’s sins, they are retained",
    "As they went along the road, they came to some water",
    "What prevents me from being baptized?",
    "Come, see a man",
    "Many of the Samaritans from that town believed in Him because of the woman’s testimony",
    "He told me everything I ever did",
  ];

  function highlightVerses(paragraph, quotes) {
    const text = paragraph.textContent;
    const matches = [];

    quotes.forEach(function (quote) {
      let from = 0;
      let index = text.indexOf(quote, from);
      while (index !== -1) {
        matches.push({ start: index, end: index + quote.length });
        from = index + quote.length;
        index = text.indexOf(quote, from);
      }
    });

    matches.sort(function (a, b) {
      return a.start - b.start || b.end - a.end;
    });

    const nonOverlapping = matches.filter(function (match, index) {
      return index === 0 || match.start >= matches[index - 1].end;
    });

    if (nonOverlapping.length === 0) return;

    const fragment = document.createDocumentFragment();
    let cursor = 0;
    nonOverlapping.forEach(function (match) {
      fragment.appendChild(document.createTextNode(text.slice(cursor, match.start)));
      const verse = document.createElement("mark");
      verse.className = "transcript-verse";
      verse.textContent = text.slice(match.start, match.end);
      fragment.appendChild(verse);
      cursor = match.end;
    });
    fragment.appendChild(document.createTextNode(text.slice(cursor)));
    paragraph.replaceChildren(fragment);
  }

  function formatTranscript(article) {
    if (!article || article.dataset.formatted === "true") return;
    const body = article.querySelector(".transcript-body");
    if (!body) return;
    const language =
      article.dataset.transcriptLanguage || article.lang || "es";
    const isContactingPower =
      article.dataset.transcriptSermon === "contacting-power";
    const headings = isContactingPower
      ? language === "en"
        ? contactingPowerHeadingsEnglish
        : contactingPowerHeadings
      : language === "en"
        ? englishSectionHeadings
        : sectionHeadings;
    const quotes = isContactingPower
      ? language === "en"
        ? contactingPowerScriptureQuotesEnglish
        : contactingPowerScriptureQuotes
      : language === "en"
        ? englishScriptureQuotes
        : scriptureQuotes;

    Array.from(body.children).forEach(function (element) {
      if (element.tagName !== "P") return;
      const text = element.textContent.trim();
      const section = headings.find(function (entry) {
        return text.startsWith(entry[0]);
      });

      if (section) {
        const heading = document.createElement("h3");
        heading.className = "transcript-section-title";
        heading.textContent = section[1];
        body.insertBefore(heading, element);
      }

      highlightVerses(element, quotes);

      if (
        text.startsWith("Póngase sobre sus pies, iglesia.") ||
        text.startsWith("Stand up, church.")
      ) {
        const pointMatches = Array.from(
          text.matchAll(/(?:^|\s)([1-6])\.\s+/g),
        );
        if (pointMatches.length === 6) {
          const lead = document.createElement("p");
          lead.textContent = text.slice(0, pointMatches[0].index).trim();
          const points = document.createElement("ol");
          points.className = "transcript-points";

          pointMatches.forEach(function (match, index) {
            const start = match.index + match[0].length;
            const end =
              index + 1 < pointMatches.length
                ? pointMatches[index + 1].index
                : text.length;
            const point = document.createElement("li");
            point.textContent = text.slice(start, end).trim();
            points.appendChild(point);
          });

          element.replaceWith(lead, points);
        }
      }
    });

    article.dataset.formatted = "true";
  }

  window.FDV_FORMAT_TRANSCRIPT = formatTranscript;

  document.addEventListener("DOMContentLoaded", function () {
    document
      .querySelectorAll(".transcript-page")
      .forEach(formatTranscript);
  });
})();
