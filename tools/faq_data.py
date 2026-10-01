# Données de la FAQ (FR / EN / ES) — source unique.
# Le script tools/build_lang.py les utilise pour :
#   1) la section FAQ visible dans index.html, en/index.html, es/index.html
#   2) le bloc JSON-LD FAQPage de chaque page (doit TOUJOURS correspondre au texte visible)
# Pour modifier la FAQ : changer ce fichier puis relancer  python3 tools/build_lang.py

FAQ = [
    {
        "q": {
            "fr": "Où se trouve Bochica?",
            "en": "Where is Bochica located?",
            "es": "¿Dónde está Bochica?",
        },
        "a": {
            "fr": "Au 430 Rue Saint-Vallier Ouest, Québec (Québec) G1K 1K8, dans le quartier Saint-Sauveur, à quelques minutes de Saint-Roch et du Vieux-Québec.",
            "en": "At 430 Rue Saint-Vallier Ouest, Québec City (QC) G1K 1K8, in the Saint-Sauveur neighbourhood, a few minutes from Saint-Roch and Old Québec.",
            "es": "En el 430 Rue Saint-Vallier Ouest, Quebec (QC) G1K 1K8, en el barrio Saint-Sauveur, a pocos minutos de Saint-Roch y del Viejo Quebec.",
        },
    },
    {
        "q": {
            "fr": "Quelles sont les heures d'ouverture?",
            "en": "What are your opening hours?",
            "es": "¿Cuál es el horario?",
        },
        "a": {
            "fr": "Mercredi et jeudi de 17 h à 21 h, vendredi de 12 h à 22 h, samedi de 12 h à 22 h 30 et dimanche de 12 h à 20 h 30. Fermé le lundi et le mardi.",
            "en": "Wednesday and Thursday 5 pm – 9 pm, Friday 12 pm – 10 pm, Saturday 12 pm – 10:30 pm and Sunday 12 pm – 8:30 pm. Closed Monday and Tuesday.",
            "es": "Miércoles y jueves de 17:00 a 21:00, viernes de 12:00 a 22:00, sábado de 12:00 a 22:30 y domingo de 12:00 a 20:30. Cerrado lunes y martes.",
        },
    },
    {
        "q": {
            "fr": "Quel type de cuisine sert Bochica?",
            "en": "What kind of food does Bochica serve?",
            "es": "¿Qué tipo de comida sirve Bochica?",
        },
        "a": {
            "fr": "Une cuisine colombienne et latino authentique : arepas, empanadas, bandeja paisa (notre Bol Medellín), patacones, picadas à partager, churrasco, pollo asado, desserts colombiens, cocktails latinos, aguardiente et notre bière maison Club Bochica.",
            "en": "Authentic Colombian and Latin American food: arepas, empanadas, bandeja paisa (our Medellín bowl), patacones, sharing platters (picadas), churrasco, pollo asado, Colombian desserts, Latin cocktails, aguardiente and our house beer, Club Bochica.",
            "es": "Auténtica comida colombiana y latina: arepas, empanadas, bandeja paisa (nuestro bol Medellín), patacones, picadas para compartir, churrasco, pollo asado, postres colombianos, cócteles latinos, aguardiente y nuestra cerveza de la casa, Club Bochica.",
        },
    },
    {
        "q": {
            "fr": "C'est quoi, une arepa?",
            "en": "What is an arepa?",
            "es": "¿Qué es una arepa?",
        },
        "a": {
            "fr": "Une galette de maïs grillée, emblème de la Colombie. Elle est naturellement sans gluten. Chez Bochica, on la sert au fromage, avec chicharron, chorizo ou morcilla, ou farcie (végétarienne, classique ou mixte).",
            "en": "A grilled corn cake, a staple of Colombian food. It is naturally gluten-free. At Bochica we serve it with cheese, with chicharron, chorizo or morcilla, or stuffed (vegetarian, classic or mixed).",
            "es": "Una torta de maíz asada, símbolo de la cocina colombiana. Es naturalmente sin gluten. En Bochica la servimos con queso, con chicharrón, chorizo o morcilla, o rellena (vegetariana, clásica o mixta).",
        },
    },
    {
        "q": {
            "fr": "Y a-t-il des options végétariennes et sans gluten?",
            "en": "Do you have vegetarian and gluten-free options?",
            "es": "¿Tienen opciones vegetarianas y sin gluten?",
        },
        "a": {
            "fr": "Oui. La plupart de nos plats sont sans gluten (arepas de maïs, bols, grillades) et sont identifiés dans le menu. Tous nos bols et nos arepas farcies existent en version végétarienne. Mentionnez vos allergies en commandant.",
            "en": "Yes. Most of our dishes are gluten-free (corn arepas, bowls, grilled meats) and are marked on the menu. All our bowls and stuffed arepas come in a vegetarian version. Please tell us about any allergies when ordering.",
            "es": "Sí. La mayoría de nuestros platos son sin gluten (arepas de maíz, boles, parrilla) y están indicados en el menú. Todos nuestros boles y arepas rellenas existen en versión vegetariana. Avísanos de tus alergias al pedir.",
        },
    },
    {
        "q": {
            "fr": "Peut-on réserver une table?",
            "en": "Can I book a table?",
            "es": "¿Se puede reservar una mesa?",
        },
        "a": {
            "fr": "Oui, en ligne 24 h sur 24 avec LibroReserve (bouton « Réserver ») ou par téléphone au 367-330-8220.",
            "en": "Yes, online 24/7 through LibroReserve (the “Reserve” button) or by phone at 367-330-8220.",
            "es": "Sí, en línea las 24 horas con LibroReserve (botón «Reservar») o por teléfono al 367-330-8220.",
        },
    },
    {
        "q": {
            "fr": "Offrez-vous la commande pour emporter?",
            "en": "Do you offer takeout?",
            "es": "¿Tienen comida para llevar?",
        },
        "a": {
            "fr": "Oui. Commandez en ligne sur bochica.order-online.ai et passez chercher votre repas au restaurant.",
            "en": "Yes. Order online at bochica.order-online.ai and pick up your meal at the restaurant.",
            "es": "Sí. Pide en línea en bochica.order-online.ai y recoge tu comida en el restaurante.",
        },
    },
    {
        "q": {
            "fr": "Accueillez-vous les groupes et les événements privés?",
            "en": "Do you host groups and private events?",
            "es": "¿Reciben grupos y eventos privados?",
        },
        "a": {
            "fr": "Oui, on accueille les groupes, les fêtes et les événements privés. Écrivez-nous avec le formulaire de contact ou appelez-nous au 367-330-8220.",
            "en": "Yes, we welcome groups, parties and private events. Write to us with the contact form or call 367-330-8220.",
            "es": "Sí, recibimos grupos, fiestas y eventos privados. Escríbenos con el formulario de contacto o llámanos al 367-330-8220.",
        },
    },
    {
        "q": {
            "fr": "Quels modes de paiement acceptez-vous?",
            "en": "Which payment methods do you accept?",
            "es": "¿Qué formas de pago aceptan?",
        },
        "a": {
            "fr": "L'argent comptant, les cartes de crédit et la carte de débit (Interac).",
            "en": "Cash, credit cards and debit (Interac).",
            "es": "Efectivo, tarjetas de crédito y débito (Interac).",
        },
    },
    {
        "q": {
            "fr": "Pourquoi le nom Bochica?",
            "en": "Why the name Bochica?",
            "es": "¿Por qué el nombre Bochica?",
        },
        "a": {
            "fr": "Bochica est une figure légendaire du peuple muisca, dans les Andes colombiennes, qui aurait enseigné l'agriculture et les bonnes valeurs. On a choisi ce nom pour honorer nos racines.",
            "en": "Bochica is a legendary figure of the Muisca people of the Colombian Andes, said to have taught agriculture and good values. We chose the name to honour our roots.",
            "es": "Bochica es una figura legendaria del pueblo muisca, en los Andes colombianos, que según la tradición enseñó la agricultura y los buenos valores. Elegimos este nombre para honrar nuestras raíces.",
        },
    },
]
